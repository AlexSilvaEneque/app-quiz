<script setup>
  import Formulario from './components/Formulario.vue'
</script>

<template>
  <div class="wrapper__main">
    <Formulario />
    <div class="footer">
      <p>&#169; created by <a href="https://www.instagram.com/silvaenequealex/" target="_blank" class="external__link">AmseDev</a></p>
    </div>
  </div>
</template>

<style scoped>
.wrapper__main {
  background-color: var(--background-main);
  height: 100vh;
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
