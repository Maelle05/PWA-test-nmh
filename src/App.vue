<template>
  <div class="container">
    <h1>Mini App Google Sheet</h1>
    <form @submit.prevent="submitForm">
      <input v-model="materiel" placeholder="Matériel" required />
      <input v-model="statut" placeholder="Statut" required />
      <input v-model="devis" placeholder="Devis" />
      <input v-model="engagement" placeholder="Engagement" />
      <input v-model="acteur" placeholder="Acteur" />
      <button type="submit">Envoyer</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const materiel = ref("");
const statut = ref("");
const devis = ref("");
const engagement = ref("");
const acteur = ref("");
const message = ref("");

const WEB_APP_URL = "/.netlify/functions/sheet-proxy";
// const WEB_APP_URL =
//   "https://script.google.com/macros/s/AKfycbzhQaEurnr09b20ASqoWaGUUr18LNuFK6HziWuYNEOQBiVOMl8ldFE4iHdN8oi-kLk4tw/exec";

async function submitForm() {
  try {
    const res = await axios.post(WEB_APP_URL, {
      materiel: materiel.value,
      statut: statut.value,
      devis: devis.value,
      engagement: engagement.value,
      acteur: acteur.value,
    });

    if (res.data.success) {
      message.value = "Données envoyées ✅";
      materiel.value =
        statut.value =
        devis.value =
        engagement.value =
        acteur.value =
          "";
    } else {
      message.value = "Erreur : " + res.data.message;
    }
  } catch (err) {
    message.value = "Erreur de connexion : " + err.message;
  }
}
</script>

<style>
.container {
  max-width: 400px;
  margin: auto;
  padding: 2rem;
}
input {
  display: block;
  width: 100%;
  margin-bottom: 1rem;
}
button {
  padding: 0.5rem 1rem;
}
</style>
