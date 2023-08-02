<script lang="ts">
    import { modalContext, modalTypeContext } from '$lib/context/general'
    import { GameForm, LinkGamesForm, OwnerForm } from '..'

    const modal = {
        // Element.showModal() is still not noted in TS lib definitions
        open: () => {
            if (!document?.querySelector('[data-modal-game]')) return
            ;(document?.querySelector('[data-modal-game]') as any).showModal()
        },
        close: () => {
            if (!document?.querySelector('[data-modal-game]')) return
            ;(document?.querySelector('[data-modal-game]') as any).close()
        },
    }

    // This memo the state to prevent multiple calls
    let isModalOpen = false
    $: modalContext.subscribe(val => {
        // Skip re-render if the value is the same
        if (val === isModalOpen) return

        // Update the memo and run the logic
        isModalOpen = val
        val ? modal.open() : modal.close()
    })
</script>

<dialog data-modal-game class="relative bg-zinc-900 p-4 text-white shadow-lg shadow-zinc-700">
    {#if $modalTypeContext === 'game'}
        <GameForm />
    {:else if $modalTypeContext === 'owner'}
        <OwnerForm />
    {:else if $modalTypeContext === 'link-games'}
        <LinkGamesForm />
    {/if}

    <button
        class="absolute top-4 right-4 h-6 w-6 border border-zinc-500 bg-zinc-700 text-white hover:border-red-500 hover:bg-red-500"
        on:click={() => modalContext.set(false)}
    >
        <i class="bi bi-x-lg" />
    </button>
</dialog>

<style>
    dialog::backdrop {
        background-color: rgba(12, 12, 12, 0.5);
        /* From https://css.glass */
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(8.7px);
        -webkit-backdrop-filter: blur(8.7px);
        border: 1px solid rgba(255, 255, 255, 0.3);
    }
</style>
