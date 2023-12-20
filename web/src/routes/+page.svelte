<script lang="ts">
    import axios from "axios";
    import Movie from "$lib/movie.svelte";
    import TVShow from "$lib/tv.svelte";
    import New from "$lib/new.svelte";
    let selectedCountryCode = "in";
    let oldcode = "";
    const countryCodes: Array<string> = ["se", "gb", "us", "de", "in"];
    const languagecodes: any = {
        se: "sv",
        gb: "en-us",
        us: "en-us",
        de: "de",
        in: "hi",
    };
    let newsrecomendations: any[] = [];
    let recomendation: { mov: Array<any>; tv: Array<any> };
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
    const onKeyPress = (e: { charCode: number }) => {
        if (e.charCode === 13) send();
    };
    async function updatenews() {
        oldcode = selectedCountryCode;
        newsgotten = false;
        newsrecomendations = [];
        const news = await axios.post("http://localhost:4000/news", {
            country: selectedCountryCode,
            lang: languagecodes[selectedCountryCode],
        });
        console.log(news);
        for (let i = 0; i < news.data.articles.length; i++) {
            let title;
            const n = news.data.articles[i];
            if (n.trans) {
                title = n.trans;
            } else if (n.content) {
                title = n.content;
            } else if (n.description) {
                title = n.description;
            } else {
                title = n.title;
            }

            const rec = await axios.post(
                "http://localhost:4000/generateandget",
                {
                    desc: title,
                    limit: 1,
                },
            );
            const ne = { new: n, rec };
            newsrecomendations.push(ne);
            newsrecomendations = newsrecomendations;
            newsgotten = true;
        }
    }
    $: if (selectedCountryCode) {
        if (selectedCountryCode !== oldcode) {
            updatenews();
        }
    }
</script>

<main class="w-screen h-screen flex flex flex-col overflow-x-hidden text-white">
    <form class="flex items-center w-4/5">
        <label for="simple-search" class="sr-only">Search</label>
        <div class="relative w-full flex flex-row">
            <div class="bg-zinc-800">
                <label for="countryCode">Select a country code:</label>
                <select
                    class="bg-zinc-800"
                    id="countryCode"
                    bind:value={selectedCountryCode}
                >
                    {#each countryCodes as code}
                        <option>{code}</option>
                    {/each}
                </select>
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

    <div class="grid grid-cols-3 gap-4">
        {#if recomendation}
            <div>
                movies
                {#each recomendation.mov as movie}
                    <div>
                        <Movie {movie} />
                    </div>
                {/each}
            </div>
            <div>
                series
                {#each recomendation.tv as tv}
                    <div>
                        <TVShow {tv} />
                    </div>
                {/each}
            </div>
        {/if}

        {#if newsgotten}
            <div>
                based on news in your country
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
