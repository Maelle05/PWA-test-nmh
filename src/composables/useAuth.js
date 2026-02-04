import { ref } from "vue";

const userToken = ref(localStorage.getItem("user_token") || null);

function login(token) {
  console.log("Setting user token:", token);
  userToken.value = token;
  localStorage.setItem("user_token", token);
}

function logout() {
  console.log("Clearing user token");
  userToken.value = null;
  localStorage.removeItem("user_token");
}

export function useAuth() {
  return {
    userToken,
    login,
    logout,
  };
}
