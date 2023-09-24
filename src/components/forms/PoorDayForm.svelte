<script>
    import TextBoxFirst from "./actions/TextBoxFirst.svelte";
    import FormComponent from "./FormComponent.svelte";
    import TextBoxSecond from "./actions/TextBoxSecond.svelte";
    import TextBoxThird from "./actions/TextBoxThird.svelte";

    import { first, second, third, progressBarPercent} from "../../store";
    import { createEventDispatcher } from "svelte";
    import { goto } from "$app/navigation";


    const questions = {
        first : {
            question: "I'm sorry to hear that you had a tough day. Can you share what made your day a 0-3 rating?",
            formActionComponent: TextBoxFirst
        },

        second : {
            question: `Is there something specific you'd like to discuss or share about your feelings or experiences today?`,
            formActionComponent: TextBoxSecond
        },

        third: {
            question: `What can you do tomorrow to make the day better or more manageable for yourself?`,
            formActionComponent: TextBoxThird,
        }
    }

    $: firstQuestionDisabled = false;
    $: secondQuestionDisabled = false;
    $: thirdQuestionDisabled = false;

    $: firstQuestionVisible = true;
    $: secondQuestionVisible = false;
    $: thirdQuestionVisible = false;



    $: {
        if ($first.length > 20) {
            firstQuestionDisabled = false;

        } else {
            firstQuestionDisabled = true;
        }

        if ($second.length > 20) {
            secondQuestionDisabled = false;
        } else {
            secondQuestionDisabled = true;
        }

        if ($third.length > 20) {
            thirdQuestionDisabled = false;
        } else {
            thirdQuestionDisabled = true;
        }
    }

    const handleQuestionSubmit = (/** @type {number} */ questionNumber) => {
        if (questionNumber === 1) {
            firstQuestionVisible = false;
            setTimeout(() => {
                secondQuestionVisible = true;
            }, 1300);
            thirdQuestionVisible = false;

        } else if (questionNumber === 2) {
            firstQuestionVisible = false;
            setTimeout(() => {
                secondQuestionVisible = true;
            }, 1300);
            thirdQuestionVisible = false;

        } else if (questionNumber === 3) {
            firstQuestionVisible = false;
            secondQuestionVisible = false;
            setTimeout(() => {
                thirdQuestionVisible = true;
            }, 1300);
            thirdQuestionVisible = true;
        }

        progressBarPercent.update(t => t += 25);
    }

        const handleFormSubmit = () => {
            goto('/')
        }


</script>


{#if firstQuestionVisible}
    <FormComponent 
        on:submit={() => handleQuestionSubmit(2)}
        questionText={questions.first.question} 
        formActionComponent={TextBoxFirst} 
        disabled={firstQuestionDisabled}
    />
{/if}

{#if secondQuestionVisible}
    <FormComponent 
        on:submit={() => handleQuestionSubmit(3)}
        questionText={questions.second.question} 
        formActionComponent={TextBoxSecond} 
        disabled={secondQuestionDisabled}
    />
{/if}

{#if thirdQuestionVisible}
    <FormComponent 
        on:submit={() => handleFormSubmit()} 
        questionText={questions.third.question} 
        formActionComponent={TextBoxThird} 
        disabled={thirdQuestionDisabled}
    />

{/if}


<style>
</style>