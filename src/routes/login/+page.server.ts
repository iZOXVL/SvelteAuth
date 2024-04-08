// src/routes/login/+page.server.ts

import { error, redirect, fail } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import type { Actions } from './$types';
import { db } from '$lib/database';

export const actions: Actions = {
    login: async ({ request, cookies }) => {
        const formData = await request.formData();
        const username = formData.get('username');
        const password = formData.get('password');

        if (
            typeof username !== 'string' ||
            typeof password !== 'string' ||
            !username ||
            !password
        ) {
            return fail(400, { invalid: true })
        }

        // Verifica que el usuario exista
        const user = await db.user.findUnique({
            where: { username },
        });

        if (!user) {
            return fail(400, { credentials: true })
        }

        // Verifica que la contraseña sea correcta
        const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordCorrect) {
            return fail(400, { credentials: true })
        }

        // Si el usuario tiene habilitado 2FA, redirigir a la página de verificación de 2FA
        if (user.twoFactorEnabled) {
            return redirect(303, `/verify-2fa?user=${user.id}`);
        }

        // Si 2FA no está habilitado, generar token de sesión y redirigir al /admin
        const newUserToken = `AuthToken-${Math.random()}`; // Considera usar algo más seguro como crypto.randomUUID()
        await db.user.update({
            where: { username },
            data: { userAuthToken: newUserToken },
        });

        cookies.set('session', newUserToken, {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production', // Asegúrate de usar solo en producción
            maxAge: 60 * 60 * 24 * 7, // Duración de la cookie en segundos, ej: 7 días
        });

        throw redirect(303, '/admin');
    },
};
