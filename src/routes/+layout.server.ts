import type { LayoutServerLoad } from './$types'

// obtenemos los datos del usuario de los locales gracias al hook de sesión
export const load: LayoutServerLoad = async ({ locals }) => {
    return {
        user: locals.user,
    }
}
