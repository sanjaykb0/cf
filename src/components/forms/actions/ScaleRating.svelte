<script>
    import { fly } from "svelte/transition";
    import { quintOut } from "svelte/easing";
    import { ratingScale } from "../../../store";

    const handleClick = (/** @type {number} */ rating) => {
        ratingScale.update(t => t = rating);
    }
</script>

<main>
      <div class="container">
        {#each Array.from({ length: 10 }, (_, i) => i + 1) as rating}
            <div class="item" transition:fly={{delay: 50 * rating, easing: quintOut, x: 0, y: -10}}>
                <label class="block" for="rating">
                    {rating}
                </label>

                <input
                    type="radio"
                    name="rating"
                    class="option"
                    value={rating}
                    on:click={() => handleClick(rating)}
                />
            </div>
        {/each}
      </div>
</main>

<style>
    .container {
        @apply flex;
        @apply gap-10;
    }

    .item {
        @apply flex;
        @apply flex-col;
        @apply gap-2;
        @apply items-center;
        @apply justify-center;
    }

    .option {
        @apply cursor-pointer;
        @apply border-none;
    }

    label {
        display: block;
        cursor: pointer;
    }
</style>
