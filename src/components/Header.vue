<template>
  <header
    class="w-full bg-[#FEFEFE] shadow-md border-b border-[#84B61C]/20 absolute top-0 left-0 z-10"
  >
    <div class="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
      <!-- Flèche retour -->
      <div>
        <button
          v-if="canGoBack"
          @click="goBack"
          class="text-[#2C7626] text-xl hover:text-[#84B61C] transition"
        >
          ← Retour
        </button>
      </div>

      <!-- Status connexion -->
      <div class="text-sm font-medium" @click="goLogin">
        <span v-if="isLogged" class="text-[#84B61C] text-xl"> ● Connecté </span>

        <span v-else class="text-[#F79704] text-xl"> ● Non connecté </span>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "../composables/useAuth";

const router = useRouter();
const { userToken } = useAuth();

const isLogged = computed(() => {
  return userToken.value !== null;
});

const hideBackRoutes = ["/"];
const canGoBack = computed(() => {
  return !hideBackRoutes.includes(router.currentRoute.value.path);
});

const goBack = () => {
  router.back();
};

const goLogin = () => {
  router.push("/login");
};
</script>
