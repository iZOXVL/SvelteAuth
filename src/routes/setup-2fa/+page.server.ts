import { error } from '@sveltejs/kit';
import QRCode from 'qrcode';
import speakeasy from 'speakeasy';
import type { PageServerLoad } from './$types';
import { db } from '$lib/database';

export const load: PageServerLoad = async ({ url }) => {
    const userId = url.searchParams.get('user');

    if (!userId) {
        throw error(400, 'User ID is required');
    }

    const user = await db.user.findUnique({
        where: { id: userId },
        select: { twoFactorSecret: true, username: true }
    });

    if (!user || !user.twoFactorSecret) {
        throw error(404, 'User not found');
    }

    const otpauthUrl = speakeasy.otpauthURL({
        secret: user.twoFactorSecret,
        label: `${user.username}`,
        issuer: 'Auttth'
    });

    const qrCodeUrl = await QRCode.toDataURL(otpauthUrl);


    return { qrCodeUrl, userId };

};
