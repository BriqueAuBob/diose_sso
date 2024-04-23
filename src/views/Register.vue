<script setup lang="ts">
import { ref } from "vue";
import Input from "../components/Input.vue";
import Button from "../components/Button.vue";
import AuthLayout from "../components/AuthLayout.vue";
import userStore from "../stores/user";

const email = ref("");
const username = ref("");
const password = ref("");
const confirmPassword = ref("");
const errors = ref<any>({});

const user = userStore();

const registerEmail = () => {
  fetch(import.meta.env.VITE_API_URL + "/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.value,
      username: username.value,
      password: password.value,
      password_confirmation: confirmPassword.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.errors) {
        errors.value = data.errors.reduce((acc: any, error: any) => {
          acc[error.field] = error.message;
          return acc;
        }, {});
        return;
      }
      user.login(data.user, data.token);
    })
    .catch((err) => {
      console.error(err);
    });
};
</script>

<template>
  <AuthLayout>
    <div class="flex flex-col justify-center h-full">
      <h1 class="font-bold text-4xl">Diose</h1>
      <h2 class="text-xl text-neutral-600 dark:text-neutral-200 mb-4">
        Création de compte
      </h2>
      <div class="w-full flex flex-col gap-3">
        <Input
          label="Email"
          placeholder="Email"
          v-model="email"
          :error="errors.email"
        />
        <Input
          label="Nom d'utilisateur"
          placeholder="Nom d'utilisateur"
          v-model="username"
          :error="errors.username"
        />
        <Input
          label="Mot de passe"
          placeholder="Mot de passe"
          type="password"
          v-model="password"
          :error="errors.password"
        />
        <Input
          label="Confirmer le mot de passe"
          placeholder="Confirmer le mot de passe"
          type="password"
          v-model="confirmPassword"
          :error="errors.password_confirmation"
        />
        <Button class="mt-4" @click="registerEmail"> Créer un compte </Button>
        <a href="#" class="dark:text-neutral-200 text-sm mt-3">
          Vous avez déjà un compte?
          <RouterLink to="/" class="text-primary-400 underline">
            Se connecter
          </RouterLink>
        </a>
      </div>
    </div>
  </AuthLayout>
</template>
