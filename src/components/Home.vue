<script setup>
    import { onMounted, ref } from 'vue'
    import store from '../store'
    import convertString from '../utils/convertString'

    const emit = defineEmits(['startQuiz'])

    const nros = ref([5,10,15,20])
    const listcategoria = ref([])

    const qty = ref(5)
    const categoria = ref("")

    const getCategories = async () => {
        const res = await fetch('https://the-trivia-api.com/api/categories')
        const data = await res.json()

        Object.keys(data).forEach(item => {
            listcategoria.value.push({
                key: convertString(item),
                value: item
            })
        })
    }

    const start = () => {

        store.start = false
        store.limit = qty.value
        store.category = categoria.value
        
    }

    onMounted(() => {
        getCategories()
    })

</script>

<template>
    <h1>Home</h1>
    <div class="wrapper__home">
        <h2>N° de preguntas</h2>
        <select v-model="qty">
            <option value="qty" disabled>-- Selecciona --</option>
            <option v-for="n in nros" :key="n"
                    :value="n">
                {{ n }}
            </option>
        </select>
        <h2>Categoria</h2>
        <select v-model="categoria">
            <option value="" disabled>-- Selecciona --</option>
            <option v-for="item in listcategoria" :key="item.id"
                    :value="item.key">
                {{ item.value }}
            </option>
        </select>
        <button class="btn__iniciar"
                v-if="qty && categoria"
                @click="start">
            Iniciar Quiz
        </button>
    </div>
</template>

<style scoped>

.wrapper__home {
    align-items: center;
    background-color: var(--background-form);
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    height: 250px;
    justify-content: center;
    padding: 3rem;
}
h1 {
    color: var(--background-form);
    margin-bottom: .4rem;
}

h2 {
    color: var(--background-main);
}

select {
    background-color: transparent;
    border: 1px solid #6066D0B2;
    color: #6066d0;
    font-size: 14px;
    height: 30px;
    margin-top: .5rem;
    padding: 5px;
    width: 250px;
}

select:first-of-type {
    margin-bottom: 1rem;
}

select:focus {
    outline: none;
}

.btn__iniciar {
    background-color: var(--background-main);
    border-radius: 8px;
    border: none;
    color: #fff;
    cursor: pointer;
    margin-top: 1rem;
    padding: 1rem 2rem;
    transition: .5s ease;
}

.btn__iniciar:hover {
    box-shadow: rgba(100, 100, 111, 0.5) 0px 7px 10px 0px;
}
</style>