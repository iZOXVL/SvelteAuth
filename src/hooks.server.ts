import type { Handle } from '@sveltejs/kit'
import { db } from '$lib/database'

export const handle: Handle = async ({ event, resolve }) => {
    //obtener la cookie de sesión
    const session = event.cookies.get('session')

    if (!session) {
        // si no hay sesión, continuamos como si nada
        return await resolve(event)
    }

    //buscar el usuario en la base de datos
    const user = await db.user.findUnique({
        where: { userAuthToken: session },
        select: { username: true, role: true, id: true, twoFactorEnabled: true },
    })

    //si el usuario existe, lo guardamos en locals
    if (user) {
        event.locals.user = {
            name: user.username,
            role: user.role.name,
            id: user.id,
            twoFactorEnabled: user.twoFactorEnabled
        }

    }

    // load page as normal
    return await resolve(event)
}
