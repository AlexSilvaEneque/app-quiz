<script setup>
    import { onMounted, reactive, ref } from 'vue'
    import Quiz from './Quiz.vue'

    const flag = ref(false)
    const questions = ref([])

    const getQuestions = async () => {
        const res = await fetch('https://opentdb.com/api.php?amount=5&category=9&type=multiple')
        const data = await res.json()
        questions.value = data.results
        flag.value = true
    }

    const again = () => {
        flag.value = false
        getQuestions()
    }

    onMounted(() => {
        getQuestions()
    })
</script>

<template>
    <div class="wrapper">
        <h1>FAST QUIZ</h1>
        <Quiz v-if="flag" :questionsList="questions" @try_again="again" />
    </div>
</template>

<style scoped>

h1 {
    color: var(--background-form);
    margin-bottom: 1rem;
    font-size: 36px;
}

@media (max-width: 471px) {
    .wrapper {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
}

</style>