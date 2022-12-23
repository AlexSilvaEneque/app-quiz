<script setup>
    import { onMounted, ref } from 'vue'
    import store from '../store'
    import Quiz from './Quiz.vue'

    const prop = defineProps({
        data: {
            type: Object,
            required: true
        }
    })

    const flag = ref(false)
    const questions = ref([])

    const getQuestions = async () => {
        const res = await fetch(`https://the-trivia-api.com/api/questions?categories=${store.category}&limit=${store.limit}`)
        const data = await res.json()
        questions.value = data
        flag.value = true
    }

    const again = () => {
        store.start = true
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