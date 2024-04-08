<script lang="ts">
    import { page } from "$app/stores";

    let userId = "";

    let token: string[] = Array(6).fill("");

    function moveFocus(event: KeyboardEvent) {
        const target = event.target as HTMLInputElement;
        const position = parseInt(target.dataset.position || "");
        if (position < 5) {
            const nextInput = document.getElementById(`input-${position + 1}`);
            if (nextInput) {
                (nextInput as HTMLInputElement).focus();
            }
        }
    }

    $: {
        userId = $page.url.searchParams.get("user") ?? "";
    }

    async function verifyToken() {
        const fullToken = token.join("");
        const response = await fetch(`/verify-2fa`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: fullToken, userId }),
        });

        if (response.ok) {
            window.location.href = "/admin";
        } else {
        }
    }
</script>

<main class="hero bg-center bg-cover bg-no-repeat bg-opacity-50">
    <div class="hero-overlay bg-opacity-60"></div>
    <div class="card w-96 bg-base-100 shadow-xl">
        <div class="dropdown mt-2 ml-2">
            <div
                tabindex="0"
                role="button"
                class="btn btn-circle btn-ghost btn-md text-info"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    class="w-4 h-4 stroke-current"
                    ><path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path></svg
                >
            </div>
            <div
                class="card compact dropdown-content z-[1] shadow bg-base-100 rounded-box w-64"
            >
                <div class="card-body">
                    <h2 class="card-title">Cómo Ingresar tu Código 2FA 🛡️</h2>
                    <br />
                    <p>
                        <span
                            >📱 <strong>Dirígete a tu dispositivo móvil</strong>
                            y abre la aplicación de autenticación que utilizas, como
                            Google Authenticator o Microsoft Authenticator.</span
                        ><br /><br />
                        <span
                            >🔢 <strong>Busca el código</strong> de seguridad temporal
                            que se muestra en la aplicación.</span
                        ><br /><br />
                        <span
                            >🖊️ <strong>Ingresa el código</strong> en el campo correspondiente
                            en la pantalla de verificación de tu aplicación o sitio
                            web.</span
                        ><br /><br />
                        <span
                            >✅ <strong>Pulsa 'Verificar'</strong> para completar
                            el proceso de autenticación.</span
                        >
                    </p>
                </div>
            </div>
        </div>
        <div class="card-body items-center text-center p-3 pb-12">
            <h1 class="card-title">Ingrese el código 2FA</h1>
            <form on:submit|preventDefault={verifyToken}>
                <div class="input-group">
                    {#each token as _, i (i)}
                        <input
                            type="text"
                            maxlength="1"
                            bind:value={token[i]}
                            on:input={moveFocus}
                            class="box-input"
                            id={`input-${i}`}
                            data-position={i}
                        />
                    {/each}
                </div>

                <br />
                <button class="btn btn-primary w-56">Validar código</button>
            </form>
        </div>
    </div>
</main>

<style>
    .hero {
        height: 89.1vh;
        background-image: url(https://rare-gallery.com/uploads/posts/1215469-macos-big-sur.jpg);
    }

    .input-group {
        display: flex;
        justify-content: center;
    }

    .box-input {
        margin-inline: 0 8px;
        color: black;
        text-align: center;
        line-height: 35px;
        font-size: 16px;
        width: 30px;
        height: 40px;
        border-radius: 8px;
        background-color: #eff0f5;
        box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
        transition:
            border-color 0.3s,
            box-shadow 0.3s;
    }

    .box-input:focus {
        outline: none;
        border-color: #6366f1;
        box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.5);
    }
</style>
