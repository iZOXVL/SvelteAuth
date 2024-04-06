<script lang="ts">
    import { page } from "$app/stores";
    import { enhance } from "$app/forms";
    import "../app.pcss";
</script>

<svelte:head>
    <title>Auth</title>
</svelte:head>

<body class="flex flex-col">
    <nav>
        <div class="navbar bg-base-100">
            <div class="flex-1">
                <a href="/" class="btn btn-ghost text-xl">Auttth</a>
            </div>
            <div class="flex-none">
                {#if !$page.data.user}
                    <ul class="menu menu-horizontal px-1">
                        <li>
                            <details>
                                <summary>Iniciar sesión / Registrarse</summary>
                                <ul class="p-2 bg-base-100 rounded-t-none">
                                    <li><a href="/login">Iniciar sesión</a></li>
                                    <li><a href="/register">Registrarse</a></li>
                                </ul>
                            </details>
                        </li>
                    </ul>
                {/if}
                {#if $page.data.user}
                    <ul class="menu menu-horizontal px-1">
                        <li><a href="/admin">Admin dashboard</a></li>
                        <li>
                            <details>
                                <summary> Configuración </summary>
                                <ul class="p-2 bg-base-100 rounded-t-none">
                                    <li>
                                        <form
                                            action="/logout"
                                            method="POST"
                                            use:enhance
                                        >
                                            <button type="submit"
                                                >Cerrar sesión</button
                                            >
                                        </form>
                                    </li>
                                </ul>
                            </details>
                        </li>
                    </ul>
                {/if}
            </div>
        </div>
    </nav>
    <main class="flex-1 overflow-hidden">
        <slot />
    </main>
</body>
