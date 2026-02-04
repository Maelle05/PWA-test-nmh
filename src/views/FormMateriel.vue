<template>
  <div class="min-h-screen bg-[#FEFEFE] flex flex-col items-center p-6 pt-20">
    <span class="text-3xl mb-2"> 🛠️ </span>
    <h1 class="text-3xl font-bold text-[#2C7626] mb-6 text-center">
      Materiel SBPU
    </h1>

    <form
      @submit.prevent="submitForm"
      class="flex flex-col gap-4 w-full max-w-md bg-[#F7F7F7] p-6 rounded-xl shadow-md"
    >
      <input
        v-model="materiel"
        placeholder="Matériel"
        required
        class="border border-[#585858] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2C7626]"
      />

      <input
        v-model="statut"
        placeholder="Statut"
        required
        class="border border-[#585858] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2C7626]"
      />

      <input
        v-model="devis"
        placeholder="Devis"
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
        Envoyer
      </button>
    </form>

    <p v-if="message" class="mt-4 text-center text-[#F79704] font-medium">
      {{ message }}
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useAuth } from "../composables/useAuth";
const { userToken } = useAuth();

const materiel = ref("");
const statut = ref("");
const devis = ref("");
const engagement = ref("");
const message = ref("");

const WEB_APP_URL = "/.netlify/functions/sheet-proxy";

async function submitForm() {
  try {
    const res = await axios.post(WEB_APP_URL, {
      materiel: materiel.value,
      statut: statut.value,
      devis: devis.value,
      engagement: engagement.value,
      acteur: userToken.value,
    });

    if (res.data.success) {
      message.value = "Données envoyées ✅";

      // Reset des champs
      materiel.value = statut.value = devis.value = engagement.value = "";
    } else {
      message.value = "Erreur : " + res.data.message;
    }
  } catch (err) {
    message.value = "Erreur de connexion : " + err.message;
  }
}
</script>
