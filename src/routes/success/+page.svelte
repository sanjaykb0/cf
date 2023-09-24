<script>
// @ts-nocheck

    import { onMount } from "svelte";
    import { uid, first, second, third, ratingScale } from "../../store";
    import { addSurveyDocument } from "../../firebase/utils";
    import { getAuth, onAuthStateChanged } from "firebase/auth";
    import { goto } from "$app/navigation";

    /**
     * @param {number | undefined} ms
     */
    function delay(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }
    $: data = {
        name : "",
        pfp : ""
    }

    onMount( async () => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            data.name = user?.displayName;
            data.pfp = user?.photoURL
        })
        
        if ($ratingScale != 0) {
            await delay(3000);
            await addSurveyDocument($ratingScale, $first, $second, $third, $uid);
            ratingScale.set(0)
            first.set("")
            second.set("")
            third.set("")
            uid.set("")
        }
    })
</script>

<main>
    <h1 class="text-5xl">
        Looks like you're good to go{data.name ? ", " + data.name + "!" : "!"}
    </h1>
    <div class="img-container">
        <img src={data.pfp} alt="{data.name}'s profile picture.">
    </div>
</main>

<style>
    main {
        @apply flex;
        @apply flex-col;
        @apply items-center;
        @apply gap-4;
    }
    h1 {
        @apply text-light;
    }

    .img-container {
        @apply rounded-full;
    }
    .img-container img{
        @apply rounded-full;
        height: 150px;
    }

</style>