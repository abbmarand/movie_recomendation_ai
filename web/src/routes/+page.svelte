<script>
    // @ts-nocheck
    import axios from "axios";
    import Movie from "$lib/movie.svelte";
    import TVShow from "$lib/tv.svelte";
    import { onMount } from "svelte";
    let newsrecomendations = [];
    let recomendation = false;
    let desc = "";
    let newsgotten = false;
    async function send() {
        console.log(desc);
        if (desc !== "") {
            const rec = await axios.post(
                "http://localhost:4000/generateandget",
                {
                    desc,
                },
            );
            console.log(rec.data);
            recomendation = rec.data.rec;
            desc = "";
        }
    }
    onMount(async () => {
        const news = await axios.post("http://localhost:4000/news", {
            country: "us",
        });
        for (const n of news.data.articles) {
            const title = n.title;
            const rec = await axios.post(
                "http://localhost:4000/generateandget",
                {
                    desc: title,
                },
            );
            const ne = { new: n, rec };
            newsrecomendations.push(ne);
        }
        newsgotten = true;
        console.log(newsrecomendations);
    });
    const onKeyPress = (e) => {
        if (e.charCode === 13) send();
    };
</script>

<main class="w-screen h-screen flex">
    <h1 class="text-3xl font-bold underline">Movie Recommender</h1>
    <textarea
        bind:value={desc}
        on:keypress={onKeyPress}
        name=""
        class="w-1/5 h-40"
    ></textarea>
    <div class="flex flex-row h-screen">
        {#if recomendation}
            <div class="flex flex-col">
                movies
                {#each recomendation.mov as movie}
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
        {#if newsgotten}
            {#each newsrecomendations as ne}
                <div>
                    {ne}
                </div>
            {/each}
        {/if}
    </div>
</main>

<style lang="postcss">
    :global(html) {
        background-color: theme(colors.gray.100);
    }
</style>
