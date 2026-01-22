import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import FormMateriel from "../views/FormMateriel.vue";
import DashboardView from "../views/DashboardView.vue";

const routes = [
  {
    path: "/",
    component: HomeView,
  },
  {
    path: "/dashboard",
    component: DashboardView,
  },
  {
    path: "/form-materiel",
    component: FormMateriel,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;
