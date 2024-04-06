<script lang="ts">
    import { page } from "$app/stores";
    import { enhance } from "$app/forms";
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
                        <h2 class="card-title">
                            2FA:
                            <div class="badge badge-error">Desactivada</div>
                        </h2>
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
                    {#if $page.data.user.role === "ADMIN"}
                        <h2 class="card-title">Acciones de administrador</h2>
                        <div class="divider"></div>

                        <button class="btn"
                            >Realizar petición al servidor</button
                        >
                        <br />
                        <h2 class="card-title">Respuesta del servidor:</h2>
                        <br />
                        <div class="skeleton h-8 w-full"></div>
                    {/if}
                    {#if $page.data.user.role === "USER"}
                        <h2 class="card-title">Acciones de administrador</h2>
                        <div class="divider"></div>

                        <!-- Open the modal using ID.showModal() method -->
                        <button class="btn" onclick="my_modal_1.showModal()"
                            >Realizar petición al servidor</button
                        >
                        <dialog id="my_modal_1" class="modal">
                            <div class="modal-box">
                                <h3 class="font-bold text-lg">Lo sentimos!</h3>
                                <p class="py-4">
                                    Solo usuarios con rol de <strong
                                        >ADMIN</strong
                                    > pueden realizar esta petición.
                                </p>
                                <div class="modal-action">
                                    <form method="dialog">
                                        <!-- if there is a button in form, it will close the modal -->
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
                            Activar 2FA:
                            <input type="checkbox" class="toggle" />
                        </h2>
                        <br />
                        <h2 class="card-title">
                            Cerrar sesión:
                            <form action="/logout" method="POST" use:enhance>
                                <button
                                    type="submit"
                                    class="btn btn-sm btn-outline btn-error"
                                    >Cerrar</button
                                >
                            </form>
                        </h2>
                        <br />
                    {/if}
                </div>
            </div>
        </div>
    </div>
</div>
