<script setup>
import { reactive, ref, computed, onMounted } from "vue";
import { Medicament } from "/src/Medicament.js";
import ItemMedicament from "./ItemMedicament.vue";
import FormAjout from "./FormAjout.vue";
import FormModif from "./FormModif.vue";

const emit = defineEmits(["miseAJourNombre"]);

const URL_BASE = "https://apipharmacie.pecatte.fr/api/12/medicaments";

const listeMed = reactive([]);
const recherche = ref("");
const afficherFormAjout = ref(false);
const afficherFormModif = ref(false);
const medAModifier = ref(null);

const listeFiltree = computed(() => {
  const terme = recherche.value.trim().toLowerCase();
  if (!terme) return listeMed;
  return listeMed.filter((m) => m.denomination.toLowerCase().includes(terme));
});

function getMedicaments() {
  fetch(URL_BASE)
    .then((resp) => resp.json())
    .then((data) => {
      listeMed.splice(0, listeMed.length);
      for (let m of data) {
        listeMed.push(
          new Medicament(
            m.id,
            m.denomination,
            m.formepharmaceutique,
            m.photo,
            m.qte,
          ),
        );
      }
      emit("miseAJourNombre", listeMed.length);
    })
    .catch((err) => console.log(err));
}

function handlerSupprimer(med) {
  if (!confirm("Supprimer " + med.denomination + " ?")) return;
  fetch(URL_BASE + "/" + med.id, { method: "DELETE" })
    .then((resp) => resp.json())
    .then(() => {
      const idx = listeMed.findIndex((m) => m.id === med.id);
      if (idx !== -1) listeMed.splice(idx, 1);
      emit("miseAJourNombre", listeMed.length);
    })
    .catch((err) => console.log(err));
}

function handlerAjouterUnite(med) {
  fetch(URL_BASE, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: med.id, qte: med.qte + 1 }),
  })
    .then((resp) => resp.json())
    .then(() => {
      med.qte = med.qte + 1;
    })
    .catch((err) => console.log(err));
}

function handlerRetirerUnite(med) {
  if (med.qte <= 0) return;
  fetch(URL_BASE, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: med.id, qte: med.qte - 1 }),
  })
    .then((resp) => resp.json())
    .then(() => {
      med.qte = med.qte - 1;
    })
    .catch((err) => console.log(err));
}

function handlerAjouter(donnees) {
  fetch(URL_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(donnees),
  })
    .then((resp) => resp.json())
    .then(() => {
      getMedicaments();
      afficherFormAjout.value = false;
    })
    .catch((err) => console.log(err));
}

function ouvrirModif(med) {
  medAModifier.value = med;
  afficherFormModif.value = true;
}

function handlerModifier(donnees) {
  donnees.id = medAModifier.value.id;
  fetch(URL_BASE, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(donnees),
  })
    .then((resp) => resp.json())
    .then(() => {
      getMedicaments();
      afficherFormModif.value = false;
      medAModifier.value = null;
    })
    .catch((err) => console.log(err));
}

onMounted(() => {
  getMedicaments();
});
</script>

<template>
  <main class="liste-container">
    <input
      v-model="recherche"
      type="search"
      placeholder="Rechercher un médicament..."
      class="input-recherche"
      style="margin-bottom: 10px"
    />

    <p
      v-if="listeFiltree.length === 0"
      style="text-align: center; color: #999; padding: 30px 0"
    >
      Aucun médicament trouvé.
    </p>

    <div>
      <ItemMedicament
        v-for="med in listeFiltree"
        :key="med.id"
        :medicament="med"
        @supprimer="handlerSupprimer"
        @ajouterUnite="handlerAjouterUnite"
        @retirerUnite="handlerRetirerUnite"
        @modifier="ouvrirModif"
      />
    </div>

    <button class="add" @click="afficherFormAjout = true">
      Ajouter un medicament
    </button>

    <FormAjout
      v-if="afficherFormAjout"
      @ajouter="handlerAjouter"
      @fermer="afficherFormAjout = false"
    />

    <FormModif
      v-if="afficherFormModif && medAModifier"
      :medicament="medAModifier"
      @modifier="handlerModifier"
      @fermer="
        afficherFormModif = false;
        medAModifier = null;
      "
    />
  </main>
</template>

<style scoped>
.liste-container {
  width: 900px;
  margin: 40px auto;
}

.add {
  width: 100%;
  padding: 8px;
  border: 1px solid #bbb;
  background: #e9e9e9;
  margin-top: 5px;
}
</style>
