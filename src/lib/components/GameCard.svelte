<script lang="ts">
    import type { GameDto } from "$lib/types"

    export let game: GameDto
</script>

<div class="rounded bg-zinc-700 p-2">
    <p class="pb-4">
        <i class="bi bi-person-fill" />
        {game.name}
    </p>
</div>
