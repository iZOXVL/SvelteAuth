import { redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
    redirect(302, '/')
}

export const actions: Actions = {
    default({ cookies }) {
        // Nos comemos la cookie (destruir la sesión)
        cookies.set('session', '', {
            path: '/',
            expires: new Date(0),
        })
        // Redirigir al usuario a la página de inicio de sesión
        redirect(302, '/login')
    },
}
