import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import FormMateriel from "../views/FormMateriel.vue";
import DashboardView from "../views/DashboardView.vue";
import LoginView from "../views/LoginView.vue";

const routes = [
  {
    path: "/",
    component: HomeView,
  },
  {
    path: "/dashboard",
    component: DashboardView,
    meta: { requiresAuth: true },
  },
  {
    path: "/form-materiel",
    component: FormMateriel,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    component: LoginView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const userToken = localStorage.getItem("user_token");

  if (to.meta.requiresAuth && !userToken) {
    next("/login");
  } else {
    next();
  }
});

export default router;
