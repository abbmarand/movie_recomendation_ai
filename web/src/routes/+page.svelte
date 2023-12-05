<script>
    // @ts-nocheck
    import axios from "axios";
    let recomendation = false;
    let desc = "";
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
    const onKeyPress = (e) => {
        if (e.charCode === 13) send();
    };
</script>

<main class="w-screen h-screen flex">
    <h1 class="text-3xl font-bold underline">Movie Recomender</h1>
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
                        {movie.original_title}
                    </div>
                    <img
                        src="https://image.tmdb.org/t/p/w500{movie.poster_path}"
                        alt=""
                    />
                {/each}
            </div>
            <div class="flex flex-col">
                series
                {#each recomendation.tv as tv}
                    <div>
                        {tv.name}
                    </div>
                    <img
                        src="https://image.tmdb.org/t/p/w500{tv.poster_path}"
                        alt=""
                    />
                {/each}
            </div>
        {/if}
    </div>
</main>

<style lang="postcss">
    :global(html) {
        background-color: theme(colors.gray.100);
    }
</style>
