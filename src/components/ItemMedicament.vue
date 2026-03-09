<script setup>
defineProps(['medicament']);

const emit = defineEmits(['supprimer', 'ajouterUnite', 'retirerUnite', 'modifier']);
</script>

<template>
  <div class="med-item" :class="{ 'stock-bas': medicament.unitesEnStock === 0 }">

    <div class="med-image">
      <img
        v-if="medicament.imageURL"
        :src="medicament.imageURL"
        :alt="medicament.nom"
        class="photo-med"
      />
      <div v-else class="photo-placeholder"></div>
    </div>

    <div class="med-info">
      <p class="med-nom">{{ medicament.nom }}</p>
      <p class="med-forme">{{ medicament.quantiteParUnite }}</p>
      <span class="stock-badge" :class="{ rupture: medicament.unitesEnStock === 0 }">
        {{ medicament.unitesEnStock === 0 ? 'Rupture de stock' : 'Stock : ' + medicament.unitesEnStock + ' unité(s)' }}
      </span>
    </div>

    <div class="med-actions">
      <div class="btns-qte">
        <button class="btn-plus" @click="emit('ajouterUnite', medicament)">+ 1</button>
        <button class="btn-moins" :disabled="medicament.unitesEnStock === 0" @click="emit('retirerUnite', medicament)">- 1</button>
      </div>
      <button class="btn-modifier" @click="emit('modifier', medicament)"> Modifier</button>
      <button class="btn-supprimer" @click="emit('supprimer', medicament)"> Supprimer</button>
    </div>

  </div>
</template>

<style scoped>
.med-item {
  background-color: var(--fond-carte);
  border: 1.5px solid var(--vert-border);
  border-radius: var(--radius);
  box-shadow: var(--ombre);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: transform var(--transition), box-shadow var(--transition);
}

.med-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.14);
}

.med-item.stock-bas {
  border-color: #ffcdd2;
}

.med-image {
  height: 160px;
  background-color: var(--vert-clair);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.photo-med {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.photo-placeholder {
  font-size: 3.5rem;
  opacity: 0.6;
}

.med-info {
  padding: 14px 16px 10px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.med-nom {
  font-size: 1rem;
  font-weight: 700;
  color: var(--texte);
}

.med-forme {
  font-size: 0.82rem;
  color: var(--texte-secondaire);
}

.stock-badge {
  display: inline-block;
  background-color: var(--vert-clair);
  color: var(--vert-fonce);
  font-size: 0.8rem;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 20px;
  border: 1px solid var(--vert-border);
  margin-top: 4px;
  width: fit-content;
}

.stock-badge.rupture {
  background-color: var(--rouge-clair);
  color: var(--rouge);
  border-color: #ef9a9a;
}

.med-actions {
  padding: 10px 14px 14px;
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.btns-qte {
  display: flex;
  gap: 8px;
}

.btn-plus,
.btn-moins {
  flex: 1;
  padding: 7px 0;
  font-size: 0.85rem;
  font-weight: 600;
  border-radius: var(--radius-petit);
}

.btn-plus {
  background-color: var(--vert-clair);
  color: var(--vert-fonce);
  border: 1px solid var(--vert-border);
}

.btn-plus:hover {
  background-color: var(--vert-border);
}

.btn-moins {
  background-color: var(--orange-clair);
  color: var(--orange);
  border: 1px solid #ffe0b2;
}

.btn-moins:hover:not(:disabled) {
  background-color: #ffe0b2;
}

.btn-moins:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.btn-modifier {
  background-color: #e3f2fd;
  color: #1565c0;
  font-size: 0.85rem;
  border: 1px solid #bbdefb;
}

.btn-modifier:hover {
  background-color: #bbdefb;
}

.btn-supprimer {
  background-color: var(--rouge-clair);
  color: var(--rouge);
  font-size: 0.85rem;
  border: 1px solid #ffcdd2;
}

.btn-supprimer:hover {
  background-color: #ffcdd2;
}
</style>
