<script>
    // Movie.svelte
    export let movie;

    let error = false;

    function handleError() {
        error = true;
    }
</script>

{#if error}
    <div style="width: 500px; height: 500px; background-color: gray;">
        error
    </div>
{:else}
    <img
        src="https://image.tmdb.org/t/p/w500{movie.poster_path}"
        on:error={handleError}
        alt=""
    />
{/if}

<div>
    {movie.original_title}
</div>
