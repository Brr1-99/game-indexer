<script lang="ts">
    import type { GameDto } from "$lib/types"

    export let game: GameDto
</script>

<div class="rounded bg-zinc-700 p-2 grid">
    <p>{game.name}</p>
    <p><i class="bi bi-clock-fill"></i> {game.gameDuration} mins</p>
    <p><i class="bi bi-people-fill"></i> {game.minPlayers} - {game.maxPlayers}</p>
</div>
