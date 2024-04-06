<script lang="ts">
    import type { ActionData } from "./$types";
    import { enhance } from "$app/forms";
    export let form: ActionData;
</script>

<main
    class="hero h-[89.1vh] bg-center bg-cover bg-no-repeat bg-opacity-50"
    style="background-image: url(https://rare-gallery.com/uploads/posts/1215469-macos-big-sur.jpg);"
>
    <div class="hero-overlay bg-opacity-60"></div>
    <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form class="card-body" action="?/login" method="POST" use:enhance>
            <h1 class="text-2xl font-bold items-center">Iniciar sesión</h1>
            <div class="form-control">
                <!-- svelte-ignore a11y-label-has-associated-control -->
                <label for="username" class="label">
                    <span class="label-text">Nombre de usurio</span>
                </label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    class="input input-bordered"
                />
            </div>
            <div class="form-control">
                <!-- svelte-ignore a11y-label-has-associated-control -->
                <label for="password" class="label">
                    <span class="label-text">Contraseña</span>
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    class="input input-bordered"
                />
                <!-- svelte-ignore a11y-label-has-associated-control -->
                <label class="label">
                    <a href="/" class="label-text-alt link link-hover"
                        >Olvidaste tu contraseña?</a
                    >
                </label>
            </div>
            {#if form?.invalid}
                <div class="badge badge-error gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        class="inline-block w-4 h-4 stroke-current"
                        ><path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                        ></path></svg
                    >
                    <p class="error">Los campos son requeridos</p>
                </div>
            {/if}

            {#if form?.credentials}
                <div class="badge badge-error gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        class="inline-block w-4 h-4 stroke-current"
                        ><path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                        ></path></svg
                    >
                    <p class="error">Credenciales incorrectas</p>
                </div>
            {/if}
            <div class="form-control mt-6">
                <button class="btn btn-primary" type="submit">Entrar</button>
            </div>
        </form>
    </div>
</main>
