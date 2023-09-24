<script>
    import { fly } from "svelte/transition";
    import { createEventDispatcher, onMount } from "svelte";
    import { quintIn } from "svelte/easing";
    import { getAuth } from "firebase/auth";
    import { isLoggedIn, uid } from "../store";
    import { goto } from "$app/navigation";

    const dispatch = createEventDispatcher();

    /**
     * @type {boolean}
     */
    let loggedIn;
    isLoggedIn.subscribe((t) => loggedIn = t);

    $: menuIsOpen = false;
    const handleClick = () => {
        menuIsOpen = !menuIsOpen;
    }

    const handleSignOut = () => {
        const auth = getAuth();
        auth.signOut()

        uid.set("")
        isLoggedIn.set(false)
        handleClick();
        goto('/')
    }

</script>

<section>
    <div class="img-container">
        <a href="/"> 
            <img src="/g2g.png" alt="">
        </a>
    </div>

    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="menu-btn" on:click={handleClick}>
        {#if !menuIsOpen}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><line x1="40" y1="128" x2="216" y2="128" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="40" y1="64" x2="216" y2="64" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="40" y1="192" x2="216" y2="192" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>
        {:else}
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#0a0a0a" viewBox="0 0 256 256"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path></svg> 
        {/if}
    </div>

    {#if menuIsOpen}
        <div class="menu" transition:fly={{duration: 300, easing: quintIn, x: 200}}>
            <ul class="text-dark">
                <li class="text-dark"> <a href="/" on:click={handleClick}>Home</a></li>
                <li class="text-dark"> <a href="/dashboard" on:click={handleClick}>Dashboard</a></li>
                <li> <a href="/">My Profile</a></li>
                {#if loggedIn}
                    <button class="btn" on:click={handleSignOut} id="logout">Logout</button>
                {/if}
            </ul>
        </div>
    {/if}
</section>

<style>
    section {
        @apply w-full;
        height: 72px;
        @apply flex;
        @apply items-center;
        @apply justify-between;
        @apply px-4;
        @apply mb-8;
        z-index: 10;
        @apply relative;
    }

    .menu-btn {
        height: 30px;
        width: 30px;
        @apply cursor-pointer;
        @apply relative;
        z-index: 50;
    }

    .menu {
        @apply absolute;
        top: 0;
        bottom: 0;
        right: 0;
        height: 100vh;
        width: 200px;
        @apply bg-light;
        @apply text-dark;
        @apply flex;
        @apply items-center;
        @apply justify-center;
    }

    .menu ul {
        @apply text-xl;
        @apply flex;
        @apply items-center;
        @apply flex-col;
        @apply gap-4;
    }

    .img-container img{
        height: 25px;
        width: auto;
    }

    svg {
        @apply text-light;
    }

    .btn {
        @apply flex;
        @apply items-center;
        @apply justify-center;
        @apply px-4;
        @apply py-2;
        @apply bg-dark;
        @apply text-light;
    }

</style>
