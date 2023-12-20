<script lang="ts">
    export let tv: { poster_path: string; id: number; name: string };
    let error = false;
    function handleError() {
        error = true;
    }
</script>

<div class="w-[500px]">
    {#if error}
        <div style="width: 500px; height: 500px; background-color: gray;">
            error
        </div>
    {:else}
        <a href="/tv/{tv.id}">
            <img
                src="https://image.tmdb.org/t/p/w500{tv.poster_path}"
                on:error={handleError}
                alt=""
            />
        </a>
    {/if}

    <div class="flex flex-row justify-between">
        {tv.name}
        <a href="/more/{tv.id}?type=tv" target="_self">more like this</a>
    </div>
</div>
