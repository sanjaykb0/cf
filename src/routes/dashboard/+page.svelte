<script>
    import { ratingScale, first, second, third, progressBarPercent, ratingResponse, isLoggedIn } from "../../store";

    import FormComponent from "../../components/forms/FormComponent.svelte"
    import ScaleRating from "../../components/forms/actions/ScaleRating.svelte";
    import { onDestroy, onMount } from "svelte";
    import { getFirestore } from "firebase/firestore";

    import PoorDayForm from "../../components/forms/PoorDayForm.svelte"
    import NormalDayForm from "../../components/forms/NormalDayForm.svelte"
    import GoodDayForm from "../../components/forms/GoodDayForm.svelte"
    import { goto } from "$app/navigation";

    export const layout = import('../+layout.svelte');


    let loadPage = false;

    /**
     * @type {boolean}
     */

    onMount(() => {
        if ($isLoggedIn) {
            setTimeout(() => {
                loadPage = true
            }, 2300);
        } else {
            goto('/')
        }

    })


    /**
     * @type {number}
     */
    let ratingVal;
    ratingScale.subscribe(c => {
        ratingVal = c;
    })

    /**
     * @type {boolean}
     */
    let isRatingResponseDone;
    ratingResponse.subscribe(t => isRatingResponseDone = t);

    $: q1Response = false;
    $: q2Response = false;
    $: q3Response = false;

    $: showPoorForm = false;
    $: showOkayForm = false;
    $: showGoodForm = false;

    let containerWidth = 0;
    // $: containerWidth = 0;
    // progressBarPercent.subscribe(t => containerWidth = t);


    const handleSubmitRating = () => {
        ratingResponse.update(t => t = true) 
        progressBarPercent.update(() => $progressBarPercent + 25);
    }

    $: {
        if (isRatingResponseDone) {
            setTimeout(() => {
                if (ratingVal <= 3) {
                    showPoorForm = true;
                    showGoodForm = false;
                    showOkayForm = false;
                } 

                else if (ratingVal <= 7) {
                    showPoorForm = false;
                    showGoodForm = false;
                    showOkayForm = true;

                } else {
                    showPoorForm = false;
                    showGoodForm = true;
                    showOkayForm = false;
                }
            }, 1000);

        }
    }

    const handleFormSubmit = () => {
        alert("WTF")
        goto('/')
    }
    
</script>


{#if loadPage}
<form>

    <!-- initial day's rating -->

    {#if !isRatingResponseDone}
        <FormComponent on:submit={handleSubmitRating} 
            questionText={'How would you rate your day on a scale of 1-10?'} 
            formActionComponent={ScaleRating} 
            disabled={ratingVal === 0 ? true : false}
        />
    {:else}
        {#if showPoorForm}
            <PoorDayForm on:submit={handleFormSubmit} />
        {/if}

        {#if showOkayForm}
            <NormalDayForm on:submit={handleFormSubmit}/>
        {/if}

        {#if showGoodForm}
            <GoodDayForm on:submit={handleFormSubmit}/>
        {/if}
    {/if}

    <div class="progress-bar" style="width: {containerWidth}%">
    </div>
</form>
{/if}

<style>
    * {
        @apply text-light;
    }
    .progress-bar {
        @apply absolute;
        bottom: 0;
        height: 8px;
        z-index: 20;
        width: 0;
        transition: width 1s ease-out;
        @apply bg-indigo;
    }
</style>