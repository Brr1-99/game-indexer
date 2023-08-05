<script lang="ts">
    import { page } from '$app/stores'
    import { gamesContext, ownersContext } from '$lib/context/general'
    import '../app.css'

    // ------------------ Data ------------------
    export let data
    ownersContext.set(data.owners)
    gamesContext.set(data.games)
    
    const links = [
        ['/', 'Play'],
        ['/edit', 'Edit']
    ]
</script>

<div class="bg-zinc-900 min-h-screen text-white">
    <nav class="p-2 gap-8 flex items-center justify-center">
        {#each links as link}
            <a class="py-2 px-4 bg-zinc-800 hover:bg-zinc-700 {$page.url.pathname === link[0] ? 'border-b' : ''}" href={link[0]}>{link[1]}</a>
        {/each}
    </nav>
    
    <main class="p-2 lg:py-4">
        <slot />
    </main>
</div>

