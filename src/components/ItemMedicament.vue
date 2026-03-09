<script setup>
defineProps(["medicament"]);

const emit = defineEmits([
  "supprimer",
  "ajouterUnite",
  "retirerUnite",
  "modifier",
]);
</script>

<template>
  <div class="medicament">
    <div class="info">
      <span class="nom">{{ medicament.nom }}</span>
      <span>{{ medicament.quantiteParUnite }}</span>
      <span>{{ medicament.unitesEnStock }}</span>
    </div>

    <img v-if="medicament.imageURL" :src="medicament.imageURL" class="image" />

    <div class="actions">
      <button @click="emit('supprimer', medicament)">Supprimer</button>
      <button @click="emit('modifier', medicament)">Modifier</button>
      <button @click="emit('ajouterUnite', medicament)">+1</button>
      <button
        :disabled="medicament.unitesEnStock === 0"
        @click="emit('retirerUnite', medicament)"
      >
        -1
      </button>
    </div>
  </div>
</template>

<style scoped>
.medicament {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 10px 15px;
  margin-bottom: 10px;
}

.info {
  display: flex;
  gap: 40px;
  width: 300px;
}

.nom {
  font-weight: bold;
}

.image {
  width: 70px;
}

.actions {
  display: flex;
  gap: 6px;
}

button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
