<template>
  <div class="min-h-screen bg-[#2C7626] flex flex-col items-center p-6 pt-20">
    <span class="text-3xl mb-2"> 🛠️ </span>
    <h1 class="text-4xl font-bold text-[#F7F7F7] mb-6 text-center">
      Materiel SBPU
    </h1>

    <!-- Affiche un loader tant que les options ne sont pas encore chargées -->
    <div
      v-if="loading"
      class="text-[#F7F7F7] text-xl mt-20 flex flex-col items-center gap-4"
    >
      <div
        class="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"
      ></div>
      Chargement des options...
    </div>

    <form
      v-else
      @submit.prevent="submitForm"
      class="flex flex-col text-xl gap-4 w-full max-w-md bg-[#F7F7F7] p-6 rounded-xl shadow-md"
    >
      <VueSelect
        v-model="materiel"
        :options="
          materielsOptions.map((item) => ({ label: item, value: item }))
        "
        class="custom-select"
        placeholder="Recherche de matériel..."
      />

      <VueSelect
        v-model="statut"
        class="custom-select"
        :options="statutsOptions.map((item) => ({ label: item, value: item }))"
        placeholder="Recherche de statut…"
      />

      <input
        v-model="devis"
        placeholder="Devis / Infos"
        class="border border-[#585858] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2C7626]"
      />

      <input
        v-model="engagement"
        placeholder="Engagement"
        class="border border-[#585858] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2C7626]"
      />

      <button
        type="submit"
        class="bg-[#2C7626] text-[#FEFEFE] py-3 rounded-lg font-semibold hover:bg-[#84B61C] transition-colors"
      >
        <span v-if="!sendLoading">Envoyer</span>
        <span
          v-else
          class="w-6 h-6 block border-4 m-auto border-white border-t-transparent rounded-full animate-spin"
        ></span>
        <!-- <span v-else>Envoi en cours...</span> -->
      </button>
    </form>

    <p v-if="message" class="mt-4 text-center text-[#F79704] font-medium">
      {{ message }}
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useAuth } from "../composables/useAuth";
import VueSelect from "vue3-select-component";
import "vue3-select-component/styles";

const { userToken } = useAuth();

const materiel = ref("");
const statut = ref("");
const devis = ref("");
const engagement = ref("");
const message = ref("");

// Options pour les select
const materielsOptions = ref([]);
const statutsOptions = ref([]);

// Loading
const loading = ref(true);
const sendLoading = ref(false);

const WEB_APP_URL = "/.netlify/functions/sheet-proxy";

// Récupérer les données REF_DATAS
async function fetchRefDatas() {
  try {
    const res = await axios.get(WEB_APP_URL, {
      params: {
        type: "materiels",
      },
    });

    materielsOptions.value = res.data.materiels || [];
    statutsOptions.value = res.data.statuts || [];
  } catch (err) {
    message.value = "Erreur de chargement des options : " + err.message;
  } finally {
    loading.value = false; // Fin du chargement
  }
}

onMounted(() => {
  fetchRefDatas();
});

async function submitForm() {
  try {
    sendLoading.value = true; // Affiche le loader d'envoi
    const res = await axios.post(WEB_APP_URL, {
      materiel: materiel.value,
      statut: statut.value,
      devis: devis.value,
      engagement: engagement.value,
      acteur: userToken.value,
    });

    if (res.data.success) {
      sendLoading.value = false; // Cache le loader d'envoi
      message.value = "Données envoyées ✅";

      // Reset des champs
      materiel.value = statut.value = devis.value = engagement.value = "";
      setTimeout(() => {
        message.value = "";
      }, 5000);
    } else {
      sendLoading.value = false; // Cache le loader d'envoi
      message.value = "Erreur : " + res.data.message;
    }
  } catch (err) {
    sendLoading.value = false; // Cache le loader d'envoi
    message.value = "Erreur de connexion : " + err.message;
  }
}
</script>

<style scoped>
.custom-select {
  --vs-border: 1px solid #585858;
  --vs-border-radius: 8px;
  --vs-padding: 0.5rem 1rem;
  --vs-placeholder-color: #52525b84;
  --vs-outline-color: #2c7626;
  --vs-outline-width: 2px;
  --vs-font-size: none;
  --vs-menu-offset-top: 0px;
  --vs-menu-border: solid 1px #585858;
  --vs-background-color: #f7f7f7;
}
</style>
