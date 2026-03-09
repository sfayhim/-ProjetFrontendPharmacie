<script setup>
const props = defineProps({
  nombreMedicaments: {
    type: Number,
    default: 0,
  },
});
</script>

<template>
  <header class="header">
    <h1>⚕ Pharmacie Mahdi</h1>
    <p>
      Gestion du stock — <strong>{{ nombreMedicaments }}</strong> médicament(s)
    </p>
  </header>
</template>

<style scoped>
.header {
  background: #4a7c59;
  color: white;
  padding: 15px 20px;
  text-align: center;
}

.header h1 {
  margin: 0;
  font-size: 1.4rem;
}

.header p {
  margin: 4px 0 0;
  font-size: 0.9rem;
}
</style>
