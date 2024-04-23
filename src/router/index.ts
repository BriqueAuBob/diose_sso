import { createRouter, createWebHistory } from "vue-router";

import Auth from "../views/Auth.vue";
import Callback from "../views/Callback.vue";
import Register from "../views/Register.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Auth,
    },
    {
      path: "/register",
      component: Register,
    },
    {
      path: "/oauth/:provider",
      component: Callback,
    },
    {
      path: "/forgot-password",
      component: () => import("../views/ForgotPassword.vue"),
      name: "forgot-password",
    },
    {
      path: "/reset-password/:token",
      component: () => import("../views/ResetPassword.vue"),
      name: "reset-password",
    },
  ],
});

export default router;
