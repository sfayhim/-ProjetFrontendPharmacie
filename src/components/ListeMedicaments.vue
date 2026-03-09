<script setup>
import { reactive, ref, computed, onMounted } from "vue";
import { Medicament } from "/src/Medicament.js";
import ItemMedicament from "./ItemMedicament.vue";
import FormAjout from "./FormAjout.vue";
import FormModif from "./FormModif.vue";

const emit = defineEmits(["miseAJourNombre"]);

const URL_BASE = "https://projetbackendpharmacie.onrender.com/api/medicaments";

const listeMed = reactive([]);
const recherche = ref("");
const afficherFormAjout = ref(false);
const afficherFormModif = ref(false);
const medAModifier = ref(null);

const listeFiltree = computed(() => {
  const terme = recherche.value.trim().toLowerCase();
  if (!terme) return listeMed;
  return listeMed.filter((m) => m.nom.toLowerCase().includes(terme));
});

function getMedicaments() {
  fetch(URL_BASE)
    .then((resp) => resp.json())
    .then((data) => {
      for (let m of data._embedded.medicaments) {
        listeMed.push(
          new Medicament(
            m.id,
            m.nom,
            m.quantiteParUnite,
            m.imageURL,
            m.unitesEnStock,
            m._links?.self?.href || "",
          ),
        );
      }
      emit("miseAJourNombre", listeMed.length);
    })
    .catch((err) => console.log(err));
}

function handlerSupprimer(med) {
  if (!confirm("Supprimer  " + med.nom + "  définitivement ?")) return;
  const urlMed = med.href || URL_BASE + "/" + med.id;
  fetch(urlMed, { method: "DELETE" })
    .then(() => {
      const idx = listeMed.findIndex((m) => m.id === med.id);
      if (idx !== -1) listeMed.splice(idx, 1);
      emit("miseAJourNombre", listeMed.length);
    })
    .catch((err) => console.log(err));
}

function handlerAjouterUnite(med) {
  const urlMed = med.href || URL_BASE + "/" + med.id;
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const fetchOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: JSON.stringify({ unitesEnStock: med.unitesEnStock + 1 }),
  };
  fetch(urlMed, fetchOptions)
    .then((resp) => resp.json())
    .then(() => {
      med.unitesEnStock = med.unitesEnStock + 1;
    })
    .catch((err) => console.log(err));
}

function handlerRetirerUnite(med) {
  if (med.unitesEnStock <= 0) return;
  const urlMed = med.href || URL_BASE + "/" + med.id;
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const fetchOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: JSON.stringify({ unitesEnStock: med.unitesEnStock - 1 }),
  };
  fetch(urlMed, fetchOptions)
    .then((resp) => resp.json())
    .then(() => {
      med.unitesEnStock = med.unitesEnStock - 1;
    })
    .catch((err) => console.log(err));
}

function handlerAjouter(donnees) {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const fetchOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(donnees),
  };
  fetch(URL_BASE, fetchOptions)
    .then((resp) => resp.json())
    .then((data) => {
      listeMed.push(
        new Medicament(
          data.id,
          data.nom,
          data.quantiteParUnite,
          data.imageURL,
          data.unitesEnStock,
          data._links?.self?.href || "",
        ),
      );
      emit("miseAJourNombre", listeMed.length);
      afficherFormAjout.value = false;
    })
    .catch((err) => console.log(err));
}

function ouvrirModif(med) {
  medAModifier.value = med;
  afficherFormModif.value = true;
}

function handlerModifier(donnees) {
  const urlMed =
    medAModifier.value.href || URL_BASE + "/" + medAModifier.value.id;
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const fetchOptions = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify(donnees),
  };
  fetch(urlMed, fetchOptions)
    .then((resp) => resp.json())
    .then((data) => {
      const idx = listeMed.findIndex((m) => m.id === medAModifier.value.id);
      if (idx !== -1) {
        listeMed[idx].nom = data.nom;
        listeMed[idx].quantiteParUnite = data.quantiteParUnite;
        listeMed[idx].imageURL = data.imageURL;
        listeMed[idx].unitesEnStock = data.unitesEnStock;
      }
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
