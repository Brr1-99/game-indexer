<script lang="ts">
    import type { OwnerDto } from '$lib/types'

    export let owner: OwnerDto
</script>

<div class="rounded bg-zinc-700 p-2">
    <p class="mb-2 text-center text-xl flex gap-2">
        <img class="rounded" src={owner.imageUrl} alt="avatar {owner.name}" width="48px" />
        <span>{owner.name}</span>
    </p>

    <p class="text-center">games: {owner.games.length}</p>
</div>
