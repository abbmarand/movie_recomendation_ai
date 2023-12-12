<script>
    // TVShow.svelte
    export let tv;
</script>

<div class="h-full w-full">
    {#if tv.poster_path === null}
        <div class="h-4/5 w-full bg-zinc-950">error</div>
    {:else}
        <img
            class="h-4/5 w-full"
            src="https://image.tmdb.org/t/p/w500{tv.poster_path}"
            alt=""
        />
    {/if}

    <div class="h-1/5">
        {tv.name}
    </div>
</div>
