// src/routes/api/verify-2fa/+server.ts

import { error, json, fail } from '@sveltejs/kit';
import speakeasy from 'speakeasy';
import { db } from '$lib/database';
import crypto from 'crypto';

export async function POST({ request }: { request: any }) {
    const { userId, token } = await request.json();
    console.log('userId', userId);
    console.log('token', token);

    const user = await db.user.findUnique({
        where: { id: userId },
        select: { twoFactorSecret: true, twoFactorEnabled: true }
    });
    console.log('user', user);

    if (!user || !user.twoFactorSecret || !user.twoFactorEnabled) {
        throw error(404, 'User not found or 2FA not setup or not enabled');
    }

    const verified = speakeasy.totp.verify({
        secret: user.twoFactorSecret,
        encoding: 'ascii',
        token: token,
    });

    console.log('2FA verified:', verified);

    if (verified) {
        // Generar un nuevo token de usuario y actualizar en la base de datos
        const newAuthToken = crypto.randomUUID();
        await db.user.update({
            where: { id: userId },
            data: { userAuthToken: newAuthToken },
        });

        // Establecer la cookie de sesión
        return json({ success: true }, {
            headers: {
                'Set-Cookie': `session=${newAuthToken}; Path=/; HttpOnly; SameSite=Strict; ${process.env.NODE_ENV === 'production' ? 'Secure;' : ''} Max-Age=${60 * 60 * 24 * 7}`
            }
        }

        );
    } else {
        return fail(400, { invalid2fa: true })
    }
}
