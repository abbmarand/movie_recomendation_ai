<script>
    export let tv;

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
        <img
            src="https://image.tmdb.org/t/p/w500{tv.poster_path}"
            on:error={handleError}
            alt=""
        />
    {/if}

    <div class="flex flex-row justify-between">
        {tv.name}
        <a href="/more/{tv.id} " target="_self">more like this</a>
    </div>
</div>
