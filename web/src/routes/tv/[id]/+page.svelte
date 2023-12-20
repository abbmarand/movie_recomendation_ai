<script lang="ts">
    import axios from "axios";
    import { onMount } from "svelte";
    let data: boolean = false;
    let movie: { id: any; poster_path: any; name: any };
    onMount(async () => {
        const id: string = window.location.href.split("/")[4];
        const moviedata = await axios.get(
            `http://localhost:4000/view?id=${id}`,
        );
        console.log(moviedata.data);
        movie = moviedata.data.selected;
        data = true;
    });
    let error = false;
    function handleError() {
        error = true;
    }
</script>

<main class="text-white">
    <a href="/">home</a>
    {#if data}
        {#if error}
            <div
                style="width: 500px; height: 500px; background-color: gray;"
            ></div>
        {:else}
            <img
                src="https://image.tmdb.org/t/p/w500{movie.poster_path}"
                on:error={handleError}
                alt=""
            />
        {/if}

        <div class="flex flex-row justify-between">
            <p>{movie.name}</p>
            <p>{movie.overview}</p>
            <a href="/more/{movie.id}?type=tv" target="_self">more like this</a>
        </div>
    {/if}
</main>

<style lang="postcss">
    :global(html) {
        background-color: theme(colors.zinc.800);
    }
</style>
