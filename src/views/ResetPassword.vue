<script setup lang="ts">
import { ref } from "vue";
import Input from "../components/Input.vue";
import Button from "../components/Button.vue";
import AuthLayout from "../components/AuthLayout.vue";
import { useRoute } from "vue-router";
import useFetch from "../composables/useFetch";

const route = useRoute();

const token = route?.params?.token;
const password = ref("");
const confirmPassword = ref("");

const resetPassword = async () => {
  if (password.value !== confirmPassword.value) {
    return;
  }
  try {
    await useFetch("/auth/reset-password/", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: {
        password: password.value,
        password_confirmation: confirmPassword.value,
      },
    });
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <AuthLayout>
    <div class="flex flex-col justify-center h-full">
      <h1 class="font-bold text-4xl">Diose</h1>
      <h2 class="text-xl text-neutral-600 dark:text-neutral-200 mb-4">
        Réinitialisation du mot de passe
      </h2>
      <div class="flex flex-col space-y-4">
        <Input
          type="password"
          placeholder="Nouveau mot de passe"
          label="Nouveau mot de passe"
          required
          v-model="password"
        />
        <Input
          type="password"
          placeholder="Confirmer le mot de passe"
          label="Confirmer le mot de passe"
          required
          v-model="confirmPassword"
        />
        <Button class="w-full" @click="resetPassword"> Envoyer </Button>
      </div>
    </div>
  </AuthLayout>
</template>
