<script setup>
const props = defineProps({
  nombreMedicaments: {
    type: Number,
    default: 0,
  },
});
</script>

<template>
  <header class="header">
    <div class="header-contenu">
      <div class="logo-zone">
        <div class="croix-pharma">
          <span class="barre-h"></span>
          <span class="barre-v"></span>
        </div>
        <div class="titre-zone">
          <h1 class="nom-pharmacie">PharmaCiel</h1>
          <p class="sous-titre">Gestion du stock de médicaments</p>
        </div>
      </div>

      <div class="stats-zone">
        <div class="stat-card">
          <span class="stat-nombre">{{ nombreMedicaments }}</span>
          <span class="stat-label">médicaments en stock</span>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  background: linear-gradient(135deg, var(--vert-fonce) 0%, var(--vert-principal) 60%, var(--vert-moyen) 100%);
  color: #fff;
  padding: 0;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.2);
}

.header-contenu {
  max-width: 1200px;
  margin: 0 auto;
  padding: 22px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
}

.logo-zone {
  display: flex;
  align-items: center;
  gap: 18px;
}

.croix-pharma {
  position: relative;
  width: 52px;
  height: 52px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  flex-shrink: 0;
}

.barre-h,
.barre-v {
  position: absolute;
  background-color: #fff;
  border-radius: 3px;
}

.barre-h {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 36px;
  height: 12px;
}

.barre-v {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 12px;
  height: 36px;
}

.nom-pharmacie {
  font-size: 1.75rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
  letter-spacing: -0.3px;
}

.sous-titre {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.75);
  margin: 2px 0 0;
}

.stat-card {
  background-color: rgba(255, 255, 255, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  padding: 12px 24px;
  text-align: center;
}

.stat-nombre {
  display: block;
  font-size: 1.6rem;
  font-weight: 700;
  color: #fff;
  line-height: 1;
}

.stat-label {
  display: block;
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 4px;
}

@media (max-width: 600px) {
  .header-contenu {
    padding: 16px 20px;
  }

  .stats-zone {
    display: none;
  }
}
</style>
