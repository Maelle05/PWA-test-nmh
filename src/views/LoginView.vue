<template>
  <div class="min-h-screen flex items-center justify-center bg-[#FEFEFE] px-4">
    <div
      class="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 border border-[#84B61C]/20"
      v-if="!userToken"
    >
      <!-- Logo -->
      <div class="flex flex-col items-center mb-6">
        <img src="/assets/Logo.png" alt="Logo" class="h-16 mb-3" />
        <h1 class="text-3xl font-bold text-[#2C7626]">Connexion</h1>
      </div>

      <!-- Form -->
      <form @submit.prevent="viewLogin" class="flex flex-col gap-4">
        <input
          v-model="token"
          type="text"
          placeholder="Entrer votre code utilisateur"
          class="border border-[#585858]/30 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#84B61C] text-xl"
          required
        />

        <button
          type="submit"
          class="bg-[#2C7626] text-white py-2 rounded-lg font-semibold hover:bg-[#84B61C] transition text-xl"
        >
          Se connecter
        </button>
      </form>
    </div>
    <div
      class="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 border border-[#84B61C]/20"
      v-if="userToken"
    >
      <!-- Logo -->
      <div class="flex flex-col items-center mb-6">
        <img src="/assets/Logo.png" alt="Logo" class="h-16 mb-3" />
        <h1 class="text-2xl font-bold text-[#2C7626]">
          Vous êtes connecté en tant que : {{ userToken }}
        </h1>
      </div>

      <button
        @click="viewLogout"
        class="bg-[#2C7626] text-white py-2 w-full rounded-lg font-semibold hover:bg-[#84B61C] transition text-xl"
      >
        Changer d'utilisateur
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "../composables/useAuth";

const router = useRouter();
const { userToken, login, logout } = useAuth();

const token = ref("");

function viewLogin() {
  // Sauvegarde du token
  login(token.value);

  // Redirection dashboard
  router.push("/dashboard");
}

function viewLogout() {
  logout();
  router.push("/login");
}
</script>
