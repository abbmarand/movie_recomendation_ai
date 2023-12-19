<script>
    // @ts-nocheck
    import axios from "axios";
    import Movie from "$lib/movie.svelte";
    import TVShow from "$lib/tv.svelte";
    import { onMount } from "svelte";
    import New from "$lib/new.svelte";
    let selectedCountryCode = "in";
    let oldcode = "";
    const countryCodes = ["se", "gb", "us", "de", "in"]; // Add more country codes as needed
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
                    limit: 5,
                },
            );
            console.log(rec.data);
            recomendation = rec.data.rec;
            desc = "";
        }
    }
    const onKeyPress = (e) => {
        if (e.charCode === 13) send();
    };
    async function updatenews() {
        oldcode = selectedCountryCode;
        newsgotten = false;
        newsrecomendations = [];
        const news = await axios.post("http://localhost:4000/news", {
            country: selectedCountryCode,
        });
        for (let i = 0; i < news.data.articles.length; i++) {
            const n = news.data.articles[i];
            const title = n.title;
            const rec = await axios.post(
                "http://localhost:4000/generateandget",
                {
                    desc: title,
                    limit: 1,
                },
            );
            const ne = { new: n, rec };
            newsrecomendations.push(ne);
        }
        newsgotten = true;
    }
    $: if (selectedCountryCode) {
        if (selectedCountryCode !== oldcode) {
            updatenews();
        }
    }
</script>

<main class="w-screen h-screen flex flex flex-col overflow-x-hidden">
    <form class="flex items-center w-4/5">
        <label for="simple-search" class="sr-only">Search</label>
        <div class="relative w-full">
            <div
                class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
            >
                <svg
                    class="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 20"
                >
                    <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
                    />
                </svg>
            </div>
            <input
                bind:value={desc}
                on:keypress={onKeyPress}
                type="text"
                id="simple-search"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="search for movies"
                required
            />
        </div>
        <button
            type="submit"
            class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
            <svg
                class="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
            >
                <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
            </svg>
            <span class="sr-only">Search</span>
        </button>
    </form>

    <div class="flex flex-row h-max">
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
        <div>
            <label for="countryCode">Select a country code:</label>
            <select id="countryCode" bind:value={selectedCountryCode}>
                {#each countryCodes as code}
                    <option>{code}</option>
                {/each}
            </select>
        </div>
        {#if newsgotten}
            <div class="flex flex-col">
                based on news

                {#each newsrecomendations as ne}
                    <div>
                        {#if ne}
                            <New data={ne} />
                        {/if}
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
