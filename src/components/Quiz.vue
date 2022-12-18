<script setup>
    import { onMounted, ref } from 'vue'

    const prop = defineProps({
        questionsList: Object
    })

    const emits = defineEmits(['try_again'])

    const question = ref('')
    const alternatives = ref([])
    const listAux = ref([])
    const num = ref(0)
    const check = ref()
    const check_review = ref()
    const itemSelected = ref('')
    const count = ref(0)
    const correct_ansswer = ref('')

    const pass = ref(0)
    const fail = ref(0)
    const flag = ref(false)

    const list = prop.questionsList

    const doAlternatives = () => {
        correct_ansswer.value = list[num.value].correct_answer
        listAux.value.push(list[num.value].correct_answer)
        for (let i = 0; i < list[num.value].incorrect_answers.length; i++) {
            listAux.value.push(list[num.value].incorrect_answers[i])
        }
        // ordenamiento random
        alternatives.value = listAux.value.sort(() => Math.random() - 0.5)
    }

    const doQuestion = () => {
        question.value = list[num.value].question

        doAlternatives()
    }

    const nextQuestion = () => {
        num.value += 1

        listAux.value = []
        correct_ansswer.value = null
        itemSelected.value = null
        check_review.value = null
        count.value = 0

        doQuestion()
    }

    const checkAnswer = (index, alternative) => {
        count.value++
        itemSelected.value=index
        if (alternative === correct_ansswer.value) { // marcaste la corrrecta
            check.value = true
            pass.value++
        } else {
            check.value = false
            fail.value++
            // que se muestre la correcta
            check_review.value = true
        }
    }

    const checkResults = () => {
        flag.value = true
    }

    const tryQuiz = () => {
        emits('try_again')

        listAux.value = []
        correct_ansswer.value = null
        itemSelected.value = null
        check_review.value = null
        count.value = 0
        num.value = 0

        flag.value = false

        doQuestion()
    }

    onMounted(() => {
        doQuestion()
    })
</script>

<template>
    <div class="wrapper__formulario">
        <div v-if="!flag">
            <div class="wrapper__formulario__pregunta">
                <h3>{{ question }}</h3>
            </div>
            <div class="wrapper__formulario__alternativas">
                <ul v-for="(alternative, index) in alternatives" :key="index">
                    <li @click="checkAnswer(index, alternative)" :class="{correct: ((check && itemSelected === index) || (check_review && alternative === correct_ansswer)), incorrect: (!check && itemSelected === index), disabled : count > 0}">
                        <span>{{index+1}})</span><label>{{alternative}}</label>
                    </li>
                </ul>
            </div>
            <div class="wrapper__formulario__footer">
                <button v-if="num < 4" @click="nextQuestion" :hidden="count === 0">Siguiente</button>
                <button v-else @click="checkResults">Finalizar</button>
            </div>
        </div>
        <div v-else>
            <div class="wrapper__imagen">
                <img src="/results.svg" alt="image">
            </div>
            <h2>Results</h2>
            <p>You got <span class="pass">{{ pass }}</span> correct answers</p>
            <button class="btn__try" @click="tryQuiz">Try again</button>
        </div>
    </div>
</template>

<style scoped>
.wrapper__formulario {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 2rem;
    min-height: 515px;
    height: max-content;
    width: 464px;
    border-radius: 24px;
    background-color: var(--background-form);
}
h3 {
    font-size: 24px;
}
.wrapper__formulario__alternativas {
    width: 400px;
    padding-top: 1.5rem;
}
ul {
    width: 100%;
}
li {
    align-items: center;
    border-radius: 12px;
    border: solid 2px #6066D0B2;
    color: #6066D0B2;
    cursor: pointer;
    display: flex;
    font-size: 18px;
    height: 56px;
    margin-bottom: 1rem;
    padding-left: 1rem;
    transition: .4s all;
    width: 100%;
}
.correct {
    background-color: #60BF88;
    color: #fff;
}
.incorrect {
    background-color: #EA8282;
    color: #fff;
}
.disabled {
    pointer-events: none;
}
/* li:hover {
    background-color: #F9A826;
    color: #fff;
} */
span {
    margin-right: 1.8rem;
}
.wrapper__formulario__footer {
    text-align: right;
    width: 100%;
}
button {
    background-color: #F9A826;
    border-radius: 12px;
    border: solid 1px #6066D0B2;
    box-shadow: 0px 2px 4px rgba(252, 168, 47, 0.4);
    color: #fff;
    cursor: pointer;
    font-size: 18px;
    height: 56px;
    width: 116px;
}
.wrapper__imagen {
    display: flex;
    justify-content: center;
}
h2 {
    margin-top: 5rem;
    font-size: 48px;
    text-align: center;
    margin-bottom: 1rem;
}
p {
    text-align: center;
    font-size: 18px;
}
.pass {
    margin-right: 0;
    color: #60BF88;
    font-weight: 700;
    font-size: 30px;
}
.btn__try {
    width: 209px;
    height: 62px;
    border: 2px solid #1d355d;
    color: #1d355d;
    background-color: #fff;
    display: block;
    margin-right: auto;
    margin-left: auto;
    margin-top: 2rem;
}

@media (min-width: 769px) {
    li:hover {
        background-color: #F9A826;
        color: #fff;
    }
}

@media (max-width: 471px) {
    .wrapper__formulario {
        width: 90%;
    }

    .wrapper__formulario__pregunta {
        width: 100%;
        /* border: solid; */
    }

    h3 {
        text-overflow: ellipsis;
        font-size: 18px;
    }
    
    .wrapper__formulario__alternativas {
        width: 100%;

    }
}

</style>