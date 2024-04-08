import { error, json, fail } from '@sveltejs/kit';
import speakeasy from 'speakeasy';
import { db } from '$lib/database';

export async function POST({ request }: { request: any }) {

    const { userId, token } = await request.json();

    const user = await db.user.findUnique({
        where: { id: userId },
        select: { twoFactorSecret: true, twoFactorEnabled: true }
    });

    if (!user || !user.twoFactorSecret) {
        return fail(400, { invalid2fa: true })
    }


    const verified = speakeasy.totp.verify({
        secret: user.twoFactorSecret,
        encoding: 'ascii',
        token: token
    });

    console.log('verified', verified);

    if (verified) {
        // El token de 2FA es correcto
        return json({ success: true });
    } else {
        // El token de 2FA no es válido
        return fail(400, { invalid2fa: true })
    }
}
