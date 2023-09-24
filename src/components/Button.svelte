<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export let animDelay;
    const btnAction = () => dispatch('click');
</script>

