<script setup>
import { ref } from 'vue';
import HeaderPharma from './components/HeaderPharma.vue';
import ListeMedicaments from './components/ListeMedicaments.vue';

const nombreMedicaments = ref(0);

function handlerMiseAJourNombre(n) {
  nombreMedicaments.value = n;
}
</script>

<template>
  <HeaderPharma :nombreMedicaments="nombreMedicaments" />
  <ListeMedicaments @miseAJourNombre="handlerMiseAJourNombre" />
</template>

<style scoped>
</style>
