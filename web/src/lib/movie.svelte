<script lang="ts">
    export let movie: {
        original_title: string;
        id: number;
        poster_path: string;
    };
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
        <a href="/movie/{movie.id}">
            <img
                src="https://image.tmdb.org/t/p/w500{movie.poster_path}"
                on:error={handleError}
                alt=""
            />
        </a>
    {/if}

    <div class="flex flex-row justify-between">
        <p>{movie.original_title}</p>
        <a href="/more/{movie.id}?type=movie" target="_self">more like this</a>
    </div>
</div>
