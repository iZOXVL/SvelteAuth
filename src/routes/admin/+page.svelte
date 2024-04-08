<script lang="ts">
    import { page } from "$app/stores";
    let showModal = false;
    import { IconX } from "@tabler/icons-svelte";
    import MultiStepLoader from "../../lib/components/ui/MultiStepLoader/MultiStepLoader.svelte";

    let loading = false;
    const loadingStates = [
        { text: "Preparando la solicitud..." },
        { text: "Verificando permisos..." },
        { text: "Enviando paquetes..." },
        { text: "Esperando respuesta..." },
        { text: "Recibiendo paquetes..." },
        { text: "Casi listo..." },
        { text: "Response status: 200 (OK)" },
    ];

    function startFakeRequest() {
        loading = true;
    }

    let userRole = $page.data.user.role;
    let twoFactorEnabled = $page.data.user.twoFactorEnabled;

    async function updateUserSettings() {
        const response = await fetch(`/update-user-settings`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: $page.data.user.id,
                role: userRole,
                twoFactorEnabled: twoFactorEnabled,
            }),
        });

        if (response.ok) {
            showModal = true;
        } else {
        }
    }

    function closeModal() {
        showModal = false;
    }
</script>

<div
    class="hero h-[89.1vh] bg-center bg-cover bg-no-repeat bg-opacity-50"
    style="background-image: url(https://rare-gallery.com/uploads/posts/1215469-macos-big-sur.jpg);"
>
    <div class="hero-overlay bg-opacity-60"></div>
    <div role="tablist" class="tabs tabs-lifted">
        <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            class="tab"
            aria-label="Información"
            checked
        />
        <div
            role="tabpanel"
            class="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
            <div class="card w-96 bg-base-100">
                <div class="card-body">
                    {#if $page.data.user}
                        <h2 class="card-title">Admin dashboard</h2>
                        <div class="divider"></div>
                        <h2 class="card-title">
                            Id:
                            <div class="badge h-auto badge-accent">
                                {$page.data.user.id}
                            </div>
                        </h2>
                        <br />
                        <h2 class="card-title">
                            Usuario:
                            <div class="badge badge-secondary">
                                {$page.data.user.name}
                            </div>
                        </h2>
                        <br />

                        <h2 class="card-title">
                            Rol del usuario:
                            <div class="badge badge-primary">
                                {$page.data.user.role}
                            </div>
                        </h2>
                        <br />
                        {#if $page.data.user.twoFactorEnabled == false}
                            <h2 class="card-title">
                                Autenticación 2F:
                                <div class="badge badge-error">Desactivada</div>
                            </h2>
                        {/if}
                        {#if $page.data.user.twoFactorEnabled == true}
                            <h2 class="card-title">
                                Autenticación 2F:
                                <div class="badge badge-success">Activada</div>
                            </h2>
                        {/if}
                    {/if}
                </div>
            </div>
        </div>

        <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            class="tab"
            aria-label="Admin"
        />
        <div
            role="tabpanel"
            class="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
            <div class="card w-96 bg-base-100">
                <div class="card-body">
                    {#if $page.data.user.role === "Administrador"}
                        <h2 class="card-title">Acciones de administrador</h2>
                        <div class="divider"></div>

                        <button class="btn" on:click={startFakeRequest}
                            >Realizar petición al servidor</button
                        >
                        <MultiStepLoader
                            {loadingStates}
                            bind:loading
                            duration={1000}
                        />
                    {/if}
                    {#if loading}
                        <button
                            class="fixed right-4 top-4 z-[120] text-black dark:text-white"
                            on:click={() => (loading = false)}
                        >
                            <IconX class="h-10 w-10" />
                        </button>
                    {/if}
                    {#if $page.data.user.role === "General"}
                        <h2 class="card-title">Acciones de administrador</h2>
                        <div class="divider"></div>
                        <button class="btn" onclick="my_modal_1.showModal()"
                            >Realizar petición al servidor</button
                        >
                        <dialog id="my_modal_1" class="modal">
                            <div class="modal-box">
                                <h3 class="font-bold text-lg">Lo sentimos!</h3>
                                <p class="py-4">
                                    Solo usuarios con rol de <strong
                                        >Administrador</strong
                                    > pueden realizar esta petición.
                                </p>
                                <div class="modal-action">
                                    <form method="dialog">
                                        <button class="btn">Entendido</button>
                                    </form>
                                </div>
                            </div>
                        </dialog>
                        <br />
                        <h2 class="card-title">Respuesta del servidor:</h2>
                        <br />
                        <div class="skeleton h-8 w-full"></div>
                    {/if}
                </div>
            </div>
        </div>

        <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            class="tab"
            aria-label="Cuenta"
        />
        <div
            role="tabpanel"
            class="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
            <div class="card w-96 bg-base-100">
                <div class="card-body">
                    {#if $page.data.user}
                        <h2 class="card-title">Configuración de la cuenta</h2>
                        <div class="divider"></div>
                        <h2 class="card-title">
                            Rol:
                            <select
                                bind:value={userRole}
                                class="select w-full max-w-xs"
                            >
                                <option value="Administrador"
                                    >Administrador</option
                                >
                                <option value="General">General</option>
                            </select>
                        </h2>
                        <br />
                        <br />

                        <h2 class="card-title">
                            Autenticación 2F:
                            <input
                                type="checkbox"
                                class="toggle toggle-success"
                                bind:checked={twoFactorEnabled}
                            />
                        </h2>

                        <button
                            class="btn btn-accent mt-8"
                            on:click={updateUserSettings}
                            >Guardar cambios</button
                        >
                        {#if showModal}
                            <dialog open class="modal">
                                <div class="modal-box">
                                    <form method="dialog">
                                        <button
                                            class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                            on:click={closeModal}>✕</button
                                        >
                                    </form>
                                    <h3 class="font-bold text-lg">¡Éxito!</h3>
                                    <p class="py-4">
                                        La configuración del usuario se ha
                                        actualizado correctamente.
                                    </p>
                                </div>
                            </dialog>
                        {/if}
                    {/if}
                </div>
            </div>
        </div>
    </div>
</div>
