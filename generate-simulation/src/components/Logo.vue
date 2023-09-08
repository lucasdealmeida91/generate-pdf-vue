<template>
  <div class="logo-container">
    <img src="src/assets/logo.png" alt="Logo da Empresa" />
    <div class="title">Simule sua economia</div>
  </div>
</template>

<style scoped>
.logo-container {
  display: flex;
  align-items: center;
}

.title {
  margin-left: 10px;
  font-size: 18px;
  font-weight: bold;
}
</style>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LogoVue'
})
</script>

