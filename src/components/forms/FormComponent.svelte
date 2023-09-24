<script>
// @ts-nocheck

    import { onMount } from "svelte";
    import { createEventDispatcher } from "svelte";
    import { third } from "../../store";

    const dispatch = createEventDispatcher();

    import { fade, fly } from "svelte/transition";
    import { goto } from "$app/navigation";
    /**
     * @type {any}
     */
     export let questionText;
    /**
     * @type {any}
     */
     export let formActionComponent;
     const animDuration = 500;
     let loadAnim = false;
     export let isBtn = true;
     export let url='/success'
     /**
      * @type {boolean}
      */
     export let disabled;

     onMount(() => loadAnim=true)
     const submit = () => {
        if ($third.length != 0) {
            goto('/success')
        } else {

            dispatch('submit', {
                'submit' : 'kms'
            });
        }
     }
</script>

<main>
    {#if loadAnim}
        <h1 class="text-5xl text-center" transition:fade={{duration: animDuration, delay: 400}}>
            {questionText}
        </h1>

        <svelte:component this={formActionComponent} />
        {#if isBtn}
            <button on:click={submit} class="form-action-submit" disabled={disabled} class:disabled={disabled} class:enabled={!disabled} transition:fly={{duration: animDuration, delay: 400, x: -50}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#" viewBox="0 0 256 256"><path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path></svg>
            </button>
        {/if}

        {#if !isBtn}
            <a href={url} class="form-action-submit" disabled={disabled} class:disabled={disabled} class:enabled={!disabled} transition:fly={{duration: animDuration, delay: 400, x: -50}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#" viewBox="0 0 256 256"><path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path></svg>
            </a>
        {/if}

    {/if}
</main>
<style>
    main {
        @apply flex;
        @apply flex-col;
        @apply items-center;
        @apply justify-center;
        @apply px-4;
        @apply gap-8;
    }

    .form-action-submit {
        @apply bg-light;
        @apply p-2;
        @apply rounded-full;
        transition: background 500ms ease-in-out;

    }

    .enabled:hover {
        transition: transform 100ms ease-in-out;
        transform: scale(1.10);
    }


    .disabled {
        @apply bg-dark;
    }


</style>