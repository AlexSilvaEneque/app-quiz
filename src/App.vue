<script setup>
  import { onMounted, ref } from 'vue'
  import Formulario from './components/Formulario.vue'
  import Home from './components/Home.vue'

  import store from './store'

  const data = ref([])
  const bol = ref()

  const quiz = () => {

    data.value.push({
      qty: store.qtyQuestion, 
      category: store.category
    })
  }
</script>

<template>
  <div class="wrapper__main">

    <Home  v-if="store.start" @start-quiz="quiz"/>
    <Formulario v-else :data="data" />
    <div class="footer">
      <p>&#169; created by <a href="https://www.instagram.com/silvaenequealex/" target="_blank" class="external__link">AmseDev</a></p>
    </div>
  </div>
</template>

<style scoped>
.wrapper__main {
  background-color: var(--background-main);
  min-height: 100vh;
  overflow: hidden;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.footer {
  width: 100%;
  text-align: center;
  margin-top: 2em;
  color: #fff;
}
.external__link {
  color: #fff;
  font-weight: 600;
}
</style>
