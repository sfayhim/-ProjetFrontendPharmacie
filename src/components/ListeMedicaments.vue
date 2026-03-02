<script setup>
import { reactive, onMounted } from 'vue';
import { Medicament } from '/src/Medicament.js';
const url = 'https://projetbackendpharmacie.onrender.com/api/medicaments';
const listeMed = reactive([]);
function getMedicaments() {
  fetch(url, { method: 'GET' })
    .then((resp) => {
      console.log('request ok');
      return resp.json();
    })
    .then((data) => {
      console.log('data ok',data);
      for (let med of data._embedded.medicaments) {
        listeMed.push(
          new Medicament(
            med.id,
            med.nom,
            med.quantiteParUnite,
            med.imageURL,
            med.unitesEnStock
          )
        );
      }
    });
}
onMounted(() => {
  getMedicaments();
});

function handlerPUT(l) {
  let myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  const fetchOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: JSON.stringify({ libelle: l, fait: false }),
  };

  fetch(url, fetchOptions)
    .then((response) => response.json())
    .then((dataJSON) => {
      console.log(dataJSON);
    })
    .catch((error) => {
      console.log(error);
    });
}

function handlerDELETE(med,index) {
  let myHeaders = new Headers();
  listeMed.splice(index,1);
  myHeaders.append('Content-Type', 'application/json');
  const fetchOptions = {
    method: 'DELETE',
    headers: myHeaders,
    body: JSON.stringify(med),
  };

  fetch(url, fetchOptions)
    .then((response) => response.json())
    .then((dataJSON) => {
      console.log(dataJSON);
      
    })
    .catch((error) => {
      console.log(error);
    });
}
</script>
<template>
  <div class="med-container">
    <div v-for="(med, index) in listeMed" :key="med.id" class="med-item">

      <div class="med-info">
        <div class="med-nom">{{ med.nom }}</div>
        <div class="med-forme">{{ med.quantiteParUnite }}</div>
        <div class="med-stock">{{ med.unitesEnStock }}</div>
      </div>

      <img :src="med.imageURL" alt="photo med" class="image" />

      <div class="med-actions">
        <button @click="handlerDELETE(med, index)">Supprimer</button>
        <button>Modifier</button>

        <div class="qte-buttons">
          <button>+1</button>
          <button>-1</button>
        </div>
      </div>

    </div>
    <button class="med-container">Ajouter un medicament</button>
  </div>
</template>
<style scoped>
.med-container {
  width: 100%;
}

.med-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ccc;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 8px;
  background-color: #f5f5f5;
}

.med-info {
  display: flex;
  gap: 40px;
  width: 40%;
}

.med-nom {
  font-weight: bold;
  width: 120px;
}

.med-forme {
  width: 120px;
}

.med-qte {
  width: 50px;
  text-align: center;
}

.image {
  width: 80px;
  height: auto;
}

.med-actions {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.qte-buttons {
  display: flex;
  gap: 5px;
}
</style>