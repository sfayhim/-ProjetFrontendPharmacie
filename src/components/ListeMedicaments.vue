<script setup>
import { reactive, onMounted } from 'vue';
import { Medicament } from '/src/Medicament.js';
const url = 'https://apipharmacie.pecatte.fr/api/2/medicaments';
const listeMed = reactive([]);
function getMedicaments() {
  fetch(url, { method: 'GET' })
    .then((resp) => {
      console.log('request ok');
      return resp.json();
    })
    .then((data) => {
      console.log('data ok');
      for (let med of data) {
        listeMed.push(
          new Medicament(
            med.id,
            med.denomination,
            med.formepharmaceutique,
            med.photo,
            med.qte
          )
        );
      }
    });
}
onMounted(() => {
  getMedicaments();
});
function handlerAdd(l) {
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
</script>
<template>
  <ul>
    <li v-for="med in listeMed" :key="med.id">
      {{ med.toString() }}
      <button>Supprimer</button>
      <button>Modifier</button>
      <button>+1</button>
      <button>-1</button>
    </li>
  </ul>
</template>
<style></style>
