<template>
  <div
    class="min-h-screen bg-[#FEFEFE] text-[#585858] flex flex-col items-center p-6 pt-20"
  >
    <img src="/assets/Logo.png" alt="Logo" class="w-20 h-20 mb-2" />
    <h1 class="text-3xl font-bold text-[#2C7626] mb-10">Tableau de bord</h1>

    <!-- Colonne de boutons -->
    <div class="flex flex-col gap-4 w-full max-w-sm">
      <button
        @click="goToForm('form-materiel')"
        class="bg-[#F79704] text-[#FEFEFE] font-bold py-6 rounded-lg hover:bg-[#84B61C] transition-colors"
      >
        Materiel SBPU
      </button>

      <button
        class="bg-[#585858] text-[#FEFEFE] font-bold py-6 rounded-lg hover:bg-[#84B61C] transition-colors"
      >
        Contrôle Aires de jeux (Hebdo)
      </button>

      <button
        class="bg-[#585858] text-[#FEFEFE] font-bold py-6 rounded-lg hover:bg-[#84B61C] transition-colors"
      >
        Activité Equipes SEE
      </button>

      <button
        class="bg-[#585858] text-[#FEFEFE] font-bold py-6 rounded-lg hover:bg-[#84B61C] transition-colors"
      >
        ...
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goToForm = (formName) => {
  router.push(`/${formName}`);
};
</script>
