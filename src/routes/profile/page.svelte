<script>
    import { onMount } from "svelte";
    import { isLoggedIn } from "../../store";
    import { goto } from "$app/navigation";

    let loadPage = false;

    onMount(() => {
        if (!$isLoggedIn) {
            goto('/');
        } else {
            setTimeout(() => {
                loadPage = true;
            }, 2300)
        }
    })
</script>

{#if loadPage}
{/if}
