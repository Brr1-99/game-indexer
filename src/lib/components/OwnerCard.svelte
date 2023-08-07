<script lang="ts">
    import { modalContext, modalTypeContext, selectedOwnerContext } from '$lib/context/general'
    import type { OwnerDto } from '$lib/types'
    import { Image } from '.'

    export let owner: OwnerDto
</script>

<a href="/owners/{owner.name}" class="relative flex items-center gap-2 rounded bg-zinc-800 p-2 hover:bg-zinc-600">
    <div class="h-20 w-20">
        <Image src={owner.imageUrl} />
    </div>
    <div class="flex flex-col items-start">
        <span class="text-xl">{owner.name}</span>
        <span><i class="bi bi-joystick" /> {owner.gamesOwned.length}</span>
    </div>
    <div class="absolute bottom-1 right-1">
        <!-- <Button onClick={linkGames} title="Edit owner">
            <i class="bi bi-pencil-square" />
        </Button> -->
    </div>
</a>
