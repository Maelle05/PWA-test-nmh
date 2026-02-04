<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-[#FEFEFE] text-[#585858] p-6"
  >
    <!-- Logo -->
    <img src="/assets/Logo.png" alt="Logo" class="w-32 h-32 mb-6" />

    <!-- Titre -->
    <h1 class="text-4xl font-bold text-[#2C7626] mb-4 text-center">
      BioPaysages
    </h1>

    <p class="text-[#585858] text-xl mb-8 text-center">
      Outil de gestion des données <br />
      BIODIVERSITÉ & PAYSAGES URBAINS
    </p>

    <!-- Bouton de redirection -->
    <button
      @click="goNext"
      class="bg-[#2C7626] text-[#FEFEFE] text-xl font-bold px-6 py-3 rounded-lg hover:bg-[#84B61C] transition-colors"
    >
      Continuer
    </button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useAuth } from "../composables/useAuth";

const { userToken } = useAuth();
const router = useRouter();

const goNext = () => {
  console.log("User Token:", userToken.value);
  if (userToken.value) {
    router.push("/dashboard");
  } else {
    router.push("/login");
  }
};
</script>
