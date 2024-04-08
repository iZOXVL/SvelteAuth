import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
    //  Redirigir al usuaruio a la página de inicio de sesión si no está autenticado
    if (!locals.user) {
        redirect(302, '/login')
    }
}
