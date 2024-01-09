<script lang="ts">
    import Movie from "./movie.svelte";
    export let data: any;

    let error = false;
    function handleError() {
        error = true;
    }

    if (!data) {
        console.error("Data is not defined");
        error = true;
    } else {
        console.log(data);
    }
</script>

<div class="mt-20">
    <Movie movie={data.rec.data.rec.mov[0]} />
    <div class="flex flex-row">
        {#if error}
            <div style="width: 500px; height: 500px; background-color: gray;">
                error
            </div>
        {:else}
            <a href={data?.new?.link} target="_blank">
                <img
                    src={data?.new?.image_url}
                    on:error={handleError}
                    alt=""
                    class="w-12 h-12"
                /></a
            >
        {/if}

        <div class="text-white">
            based on: <p class="text-sm">{data?.new?.title}</p>
        </div>
    </div>
</div>
