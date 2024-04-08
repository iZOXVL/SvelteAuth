import { fail, redirect } from '@sveltejs/kit'
import type { Action, Actions, PageServerLoad } from './$types'
import bcrypt from 'bcrypt'
import speakeasy from 'speakeasy'

import { db } from '$lib/database'

enum Roles {
    Administrador = 'Administrador',
    General = 'General',
}

export const load: PageServerLoad = async ({ locals }) => {
    if (locals.user) {
        redirect(302, '/')
    }
}

const register: Action = async ({ request }: { request: Request }) => {
    const data = await request.formData()
    const username = data.get('username')
    const password = data.get('password')
    console.log('username', username)

    if (
        typeof username !== 'string' ||
        typeof password !== 'string' ||
        !username ||
        !password
    ) {
        return fail(400, { invalid: true })
    }

    const user = await db.user.findUnique({
        where: { username },
    })

    if (user) {
        return fail(400, { user: true })
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const twoFactorSecret = speakeasy.generateSecret().base32;

    const newUser = await db.user.create({
        data: {
            username,
            passwordHash: hashedPassword,
            twoFactorSecret,
            twoFactorEnabled: false,
            role: { connect: { name: Roles.General } },
        },
    });

    throw redirect(303, `/setup-2fa?user=${newUser.id}`);
}

export const actions: Actions = { register }
