<script setup lang="ts">
import { ref } from "vue";
import Input from "../components/Input.vue";
import Button from "../components/Button.vue";
import AuthLayout from "../components/AuthLayout.vue";
import BackButton from "../components/BackButton.vue";

const email = ref("");

const sendResetPasswordRequest = () => {
  fetch(import.meta.env.VITE_API_URL + `/auth/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
};
</script>

<template>
  <AuthLayout>
    <div class="flex flex-col justify-center h-full">
      <BackButton />
      <h1 class="font-bold text-4xl">Diose</h1>
      <h2 class="text-xl text-neutral-600 dark:text-neutral-200 mb-4">
        Mot de passe oublié
      </h2>
      <div class="flex flex-col space-y-4">
        <Input
          v-model="email"
          type="email"
          placeholder="Email"
          label="Email"
          required
        />
        <Button class="w-full" @click="sendResetPasswordRequest">
          Envoyer
        </Button>
      </div>
    </div>
  </AuthLayout>
</template>
