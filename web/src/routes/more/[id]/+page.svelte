<script lang="ts">
    import axios from "axios";
    import { onMount } from "svelte";
    import Movie from "$lib/movie.svelte";
    import TVShow from "$lib/tv.svelte";
    let movieid: any;
    let recomendation: { movies: Array<{}>; tv: Array<{}> };
    onMount(async () => {
        movieid = window.location.href.split("/")[4];
        const more = await axios.post("http://localhost:4000/getbyid", {
            id: parseInt(movieid),
            limit: 5,
        });
        console.log(more.data);
        recomendation = more.data;
    });
</script>

<main class="text-white">
    <a href="/">home</a>
    <div class="flex flex-row">
        {#if recomendation}
            <div class="flex flex-col">
                movies
                {#each recomendation.movies as movie}
                    <div>
                        <Movie {movie} />
                    </div>
                {/each}
            </div>
            <div class="flex flex-col">
                series
                {#each recomendation.tv as tv}
                    <div>
                        <TVShow {tv} />
                    </div>
                {/each}
            </div>
        {/if}
    </div>
</main>

<style lang="postcss">
    :global(html) {
        background-color: theme(colors.zinc.800);
    }
</style>
