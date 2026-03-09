<script setup>
import { ref } from "vue";

const nom = ref("");
const quantiteParUnite = ref("");
const imageURL = ref("");
const unitesEnStock = ref(0);

const emit = defineEmits(["ajouter", "fermer"]);
</script>

<template>
  <div class="fond-modal" @click.self="emit('fermer')">
    <div class="modal">
      <div class="modal-entete">
        <h2>Nouveau médicament</h2>
        <button class="btn-fermer" @click="emit('fermer')"></button>
      </div>

      <form
        @submit.prevent="
          $emit('ajouter', {
            nom: nom,
            quantiteParUnite: quantiteParUnite,
            imageURL: imageURL,
            unitesEnStock: Number(unitesEnStock),
          })
        "
      >
        <div class="champ">
          <label for="aj-nom">Dénomination</label>
          <input
            id="aj-nom"
            v-model="nom"
            type="text"
            placeholder="ex: Doliprane"
            required
          />
        </div>

        <div class="champ">
          <label for="aj-forme">Forme pharmaceutique</label>
          <input
            id="aj-forme"
            v-model="quantiteParUnite"
            type="text"
            placeholder="ex: comprimé 500 mg"
            required
          />
        </div>

        <div class="champ">
          <label for="aj-photo">URL de la photo</label>
          <input
            id="aj-photo"
            v-model="imageURL"
            type="url"
            placeholder="https://..."
          />
        </div>

        <div class="champ">
          <label for="aj-stock">Quantité en stock</label>
          <input id="aj-stock" v-model="unitesEnStock" type="number" min="0" />
        </div>

        <div class="modal-actions">
          <button type="button" class="btn-annuler" @click="emit('fermer')">
            Annuler
          </button>
          <button type="submit" class="btn-valider">Ajouter</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.fond-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  background: white;
  border: 1px solid #ccc;
  border-radius: 6px;
  width: 400px;
  padding: 20px;
}

.modal-entete {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.modal-entete h2 {
  margin: 0;
  font-size: 1.1rem;
}

.btn-fermer {
  background: none;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.champ {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.champ label {
  font-size: 0.85rem;
}

.modal-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin-top: 8px;
}
</style>
