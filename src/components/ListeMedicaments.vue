<script setup>
import { reactive, ref, computed, onMounted } from 'vue';
import { Medicament } from '/src/Medicament.js';
import ItemMedicament from './ItemMedicament.vue';
import FormAjout from './FormAjout.vue';
import FormModif from './FormModif.vue';

const emit = defineEmits(['miseAJourNombre']);

const URL_BASE = 'https://projetbackendpharmacie.onrender.com/api/medicaments';

const listeMed = reactive([]);
const recherche = ref('');
const afficherFormAjout = ref(false);
const afficherFormModif = ref(false);
const medAModifier = ref(null);

const listeFiltree = computed(() => {
  const terme = recherche.value.trim().toLowerCase();
  if (!terme) return listeMed;
  return listeMed.filter(m => m.nom.toLowerCase().includes(terme));
});

function getMedicaments() {
  fetch(URL_BASE)
    .then(resp => resp.json())
    .then(data => {
      for (let m of data._embedded.medicaments) {
        listeMed.push(
          new Medicament(m.id, m.nom, m.quantiteParUnite, m.imageURL, m.unitesEnStock, m._links?.self?.href || '')
        );
      }
      emit('miseAJourNombre', listeMed.length);
    })
    .catch(err => console.log(err));
}

function handlerSupprimer(med) {
  if (!confirm('Supprimer  ' + med.nom + '  définitivement ?')) return;
  const urlMed = med.href || URL_BASE + '/' + med.id;
  fetch(urlMed, { method: 'DELETE' })
    .then(() => {
      const idx = listeMed.findIndex(m => m.id === med.id);
      if (idx !== -1) listeMed.splice(idx, 1);
      emit('miseAJourNombre', listeMed.length);
    })
    .catch(err => console.log(err));
}

function handlerAjouterUnite(med) {
  const urlMed = med.href || URL_BASE + '/' + med.id;
  let myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  const fetchOptions = {
    method: 'PATCH',
    headers: myHeaders,
    body: JSON.stringify({ unitesEnStock: med.unitesEnStock + 1 }),
  };
  fetch(urlMed, fetchOptions)
    .then(resp => resp.json())
    .then(() => { med.unitesEnStock = med.unitesEnStock + 1; })
    .catch(err => console.log(err));
}

function handlerRetirerUnite(med) {
  if (med.unitesEnStock <= 0) return;
  const urlMed = med.href || URL_BASE + '/' + med.id;
  let myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  const fetchOptions = {
    method: 'PATCH',
    headers: myHeaders,
    body: JSON.stringify({ unitesEnStock: med.unitesEnStock - 1 }),
  };
  fetch(urlMed, fetchOptions)
    .then(resp => resp.json())
    .then(() => { med.unitesEnStock = med.unitesEnStock - 1; })
    .catch(err => console.log(err));
}

function handlerAjouter(donnees) {
  let myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  const fetchOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(donnees),
  };
  fetch(URL_BASE, fetchOptions)
    .then(resp => resp.json())
    .then(data => {
      listeMed.push(
        new Medicament(data.id, data.nom, data.quantiteParUnite, data.imageURL, data.unitesEnStock, data._links?.self?.href || '')
      );
      emit('miseAJourNombre', listeMed.length);
      afficherFormAjout.value = false;
    })
    .catch(err => console.log(err));
}

function ouvrirModif(med) {
  medAModifier.value = med;
  afficherFormModif.value = true;
}

function handlerModifier(donnees) {
  const urlMed = medAModifier.value.href || URL_BASE + '/' + medAModifier.value.id;
  let myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  const fetchOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: JSON.stringify(donnees),
  };
  fetch(urlMed, fetchOptions)
    .then(resp => resp.json())
    .then(data => {
      const idx = listeMed.findIndex(m => m.id === medAModifier.value.id);
      if (idx !== -1) {
        listeMed[idx].nom = data.nom;
        listeMed[idx].quantiteParUnite = data.quantiteParUnite;
        listeMed[idx].imageURL = data.imageURL;
        listeMed[idx].unitesEnStock = data.unitesEnStock;
      }
      afficherFormModif.value = false;
      medAModifier.value = null;
    })
    .catch(err => console.log(err));
}

onMounted(() => {
  getMedicaments();
});
</script>

<template>
  <main class="liste-container">

    <div class="barre-outils">
      <div class="zone-recherche">
        <input
          v-model="recherche"
          type="search"
          placeholder="Rechercher un médicament..."
          class="input-recherche"
        />
      </div>
      <button class="btn-ajouter" @click="afficherFormAjout = true">
        + Ajouter un médicament
      </button>
    </div>

    <p v-if="listeFiltree.length === 0" class="aucun-resultat">
      Aucun médicament trouvé.
    </p>

    <div class="grille-medicaments">
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

    <FormAjout
      v-if="afficherFormAjout"
      @ajouter="handlerAjouter"
      @fermer="afficherFormAjout = false"
    />

    <FormModif
      v-if="afficherFormModif && medAModifier"
      :medicament="medAModifier"
      @modifier="handlerModifier"
      @fermer="afficherFormModif = false; medAModifier = null"
    />

  </main>
</template>

<style scoped>
.liste-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 28px 24px 48px;
}

.barre-outils {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.zone-recherche {
  flex: 1;
  min-width: 220px;
}

.btn-ajouter {
  background-color: var(--vert-principal);
  color: #fff;
  padding: 10px 20px;
  font-size: 0.9rem;
  white-space: nowrap;
  flex-shrink: 0;
}

.btn-ajouter:hover {
  background-color: var(--vert-fonce);
}

.aucun-resultat {
  text-align: center;
  color: var(--texte-secondaire);
  padding: 60px 0;
}

.grille-medicaments {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}
</style>
