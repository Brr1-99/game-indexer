<!--
  @component
  ## ModalGame
  used to display a game inside a modal
-->
<script lang="ts">
    import type { GameDto } from '$lib/types'
    import { modalGameContext } from '$lib/context/general'

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
    let game: GameDto
    $: modalGameContext.subscribe(val => {
        game = val.game

        // Skip re-render if the value is the same
        if (val.isModalOpen === isModalOpen) return

        // Update the memo and run the logic
        isModalOpen = val.isModalOpen
        val.isModalOpen ? modal.open() : modal.close()
    })
</script>

<dialog data-modal-game class="relative rounded bg-zinc-900 p-2 text-white shadow-lg shadow-zinc-700">
    <div class="relative flex justify-between bg-zinc-900 p-1">
        <h2 class="text-lg font-bold">title</h2>
        <button
            class="h-6 w-6 border border-zinc-500 bg-zinc-700 text-white hover:border-red-500 hover:bg-red-500"
            on:click={() =>
                modalGameContext.update(val => ({
                    ...val,
                    isModalOpen: false,
                }))}
        >
            <i class="bi bi-x-lg" />
        </button>
    </div>
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
