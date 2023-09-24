<script>
// @ts-nocheck

    import { fade } from "svelte/transition";
    import { second } from "../../../store";
    let obj = {};
    let inputValue = '';
    $: isBlueBorder = false;

    const handleInput = (e) => {
        inputValue = e.target.value;

        if (inputValue.trim().split(/\s+/).length > 3) {
            isBlueBorder = true;
        } else {
            isBlueBorder = false;
        }

    }

    $: {
        if (inputValue) {
            second.update(() => inputValue)
        }
    }

</script>

<div class="container" transition:fade>
    <textarea
      class="textbox"
      class:blue-border={isBlueBorder}
      type="text"
      bind:value={inputValue}
      on:input={handleInput}
      rows="100"
      cols="100"
      placeholder="Type here..."
    />
</div>

<style>
    .container {
        @apply flex;
        @apply items-center;
        @apply flex-col;
    }

    textarea {
        @apply bg-light;
        @apply text-dark;
        @apply p-4;

        max-width: 450px;
        max-height: 300px;
        border-radius: 10px;

        border: none;
        overflow: auto;
        outline: none;

        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;

        resize: none; 
    }

    .blue-border{
        border: 2px solid;
        @apply border-indigo;
    }


</style>