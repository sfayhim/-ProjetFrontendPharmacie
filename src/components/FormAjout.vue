<script setup>
import { ref } from 'vue';

const nom = ref('');
const quantiteParUnite = ref('');
const imageURL = ref('');
const unitesEnStock = ref(0);

const emit = defineEmits(['ajouter', 'fermer']);
</script>

<template>
  <div class="fond-modal" @click.self="emit('fermer')">
    <div class="modal">

      <div class="modal-entete">
        <h2>Nouveau médicament</h2>
        <button class="btn-fermer" @click="emit('fermer')"></button>
      </div>

      <form @submit.prevent="$emit('ajouter', { nom: nom, quantiteParUnite: quantiteParUnite, imageURL: imageURL, unitesEnStock: Number(unitesEnStock) })">
        <div class="champ">
          <label for="aj-nom">Dénomination</label>
          <input id="aj-nom" v-model="nom" type="text" placeholder="ex: Doliprane" required />
        </div>

        <div class="champ">
          <label for="aj-forme">Forme pharmaceutique</label>
          <input id="aj-forme" v-model="quantiteParUnite" type="text" placeholder="ex: comprimé 500 mg" required />
        </div>

        <div class="champ">
          <label for="aj-photo">URL de la photo</label>
          <input id="aj-photo" v-model="imageURL" type="url" placeholder="https://..." />
        </div>

        <div class="champ">
          <label for="aj-stock">Quantité en stock</label>
          <input id="aj-stock" v-model="unitesEnStock" type="number" min="0" />
        </div>

        <div class="modal-actions">
          <button type="button" class="btn-annuler" @click="emit('fermer')">Annuler</button>
          <button type="submit" class="btn-valider">Ajouter</button>
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
  background-color: var(--vert-principal);
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
  background-color: var(--vert-principal);
  color: #fff;
}

.btn-valider:hover {
  background-color: var(--vert-fonce);
}
</style>
