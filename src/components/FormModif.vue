<script setup>
import { ref, watch } from 'vue';

const props = defineProps(['medicament']);
const emit = defineEmits(['modifier', 'fermer']);

const nom = ref('');
const quantiteParUnite = ref('');
const imageURL = ref('');
const unitesEnStock = ref(0);

watch(() => props.medicament, (med) => {
  if (med) {
    nom.value = med.nom;
    quantiteParUnite.value = med.quantiteParUnite;
    imageURL.value = med.imageURL;
    unitesEnStock.value = med.unitesEnStock;
  }
}, { immediate: true });
</script>

<template>
  <div class="fond-modal" @click.self="emit('fermer')">
    <div class="modal">

      <div class="modal-entete">
        <h2>Modifier le médicament</h2>
        <button class="btn-fermer" @click="emit('fermer')"></button>
      </div>

      <form @submit.prevent="$emit('modifier', { nom: nom, quantiteParUnite: quantiteParUnite, imageURL: imageURL, unitesEnStock: Number(unitesEnStock) })">
        <div class="champ">
          <label for="mod-nom">Dénomination</label>
          <input id="mod-nom" v-model="nom" type="text" required />
        </div>

        <div class="champ">
          <label for="mod-forme">Forme pharmaceutique</label>
          <input id="mod-forme" v-model="quantiteParUnite" type="text" required />
        </div>

        <div class="champ">
          <label for="mod-photo">URL de la photo</label>
          <input id="mod-photo" v-model="imageURL" type="url" />
        </div>

        <div class="champ">
          <label for="mod-stock">Quantité en stock</label>
          <input id="mod-stock" v-model="unitesEnStock" type="number" min="0" />
        </div>

        <div class="modal-actions">
          <button type="button" class="btn-annuler" @click="emit('fermer')">Annuler</button>
          <button type="submit" class="btn-valider">Enregistrer</button>
        </div>
      </form>

    </div>
  </div>
</template>

<style scoped>
.fond-modal {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 20px;
}

.modal {
  background-color: var(--blanc);
  border-radius: var(--radius);
  box-shadow: var(--ombre-modale);
  width: 100%;
  max-width: 460px;
  overflow: hidden;
}

.modal-entete {
  background-color: #1565c0;
  color: #fff;
  padding: 18px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-entete h2 {
  color: #fff;
  font-size: 1.1rem;
  margin: 0;
}

.btn-fermer {
  background: transparent;
  color: #fff;
  padding: 4px 8px;
}

.btn-fermer:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

form {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.champ {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.champ label {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--texte-secondaire);
}

.modal-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 6px;
}

.btn-annuler {
  background-color: #f5f5f5;
  color: var(--texte);
}

.btn-annuler:hover {
  background-color: #e0e0e0;
}

.btn-valider {
  background-color: #1565c0;
  color: #fff;
}

.btn-valider:hover {
  background-color: #0d47a1;
}
</style>
