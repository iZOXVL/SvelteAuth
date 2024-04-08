import { error, json } from '@sveltejs/kit';
import { db } from '$lib/database';

export async function POST({ request }: { request: any }) {
    const { userId, role: roleName, twoFactorEnabled } = await request.json();
    const role = await db.roles.findUnique({
        where: { name: roleName },
    });

    if (!role) {
        throw error(404, 'Role not found');
    }

    await db.user.update({
        where: { id: userId },
        data: {
            role: {
                connect: { id: role.id },
            },
            twoFactorEnabled: twoFactorEnabled,
        },
    });

    return json({ success: true });
};
