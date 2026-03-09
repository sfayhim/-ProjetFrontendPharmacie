<script setup>
import { ref } from "vue";

const denomination = ref("");
const formepharmaceutique = ref("");
const photo = ref(null);
const qte = ref(0);

const emit = defineEmits(["ajouter", "fermer"]);

function handleFileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    photo.value = reader.result;
  };
  reader.readAsDataURL(file);
}

function soumettre() {
  const donnees = {
    denomination: denomination.value,
    formepharmaceutique: formepharmaceutique.value,
    qte: Number(qte.value),
  };
  if (photo.value) donnees.photo = photo.value;
  emit("ajouter", donnees);
}
</script>

<template>
  <div class="fond-modal" @click.self="emit('fermer')">
    <div class="modal">
      <div class="modal-entete">
        <h2>Nouveau médicament</h2>
        <button class="btn-fermer" @click="emit('fermer')">x</button>
      </div>

      <form @submit.prevent="soumettre">
        <div class="champ">
          <label for="aj-nom">Dénomination</label>
          <input
            id="aj-nom"
            v-model="denomination"
            type="text"
            placeholder="ex: Doliprane"
            required
          />
        </div>

        <div class="champ">
          <label for="aj-forme">Forme pharmaceutique</label>
          <input
            id="aj-forme"
            v-model="formepharmaceutique"
            type="text"
            placeholder="ex: comprimé"
            required
          />
        </div>

        <div class="champ">
          <label for="aj-photo">Photo</label>
          <input id="aj-photo" @change="handleFileUpload" type="file" />
        </div>

        <div class="champ">
          <label for="aj-stock">Quantité en stock</label>
          <input id="aj-stock" v-model="qte" type="number" min="0" />
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
