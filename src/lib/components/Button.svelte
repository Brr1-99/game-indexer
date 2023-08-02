<script lang="ts">
    export let onClick: () => void
    export let isLoading = false
    export let title = ''
</script>

<button {title} on:click={onClick} class="mt-2 block rounded bg-indigo-500 px-2 text-white hover:bg-indigo-600">
    {#if isLoading}
        <i class="bi bi-arrow-clockwise animate block animate-spin" />
    {:else}
        <slot />
    {/if}
</button>
