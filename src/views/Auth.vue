<script setup lang="ts">
import { ref } from "vue";

import background from "../assets/background.png";
import SocialSignIn from "../components/SocialSignIn.vue";
import Input from "../components/Input.vue";
import Button from "../components/Button.vue";
import storeUser from "../stores/user";

const email = ref("");
const password = ref("");
const userStore = storeUser();

const redirectToProvider = (provider: string) => {
  fetch(import.meta.env.VITE_API_URL + `/oauth/${provider}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      window.location.href = data.redirect_url;
    });
};

const loginEmail = () => {
  fetch(import.meta.env.VITE_API_URL + `/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    }),
  })
    .then((res) => res.json())
    .then((data: { user: any; token: any }) => {
      userStore.login(data.user, data.token.token);
    });
};

const currentAuthUserLogin = () => {
  const redirect_uri = localStorage.getItem("redirect_uri");

  if (!redirect_uri) {
    return;
  }

  fetch(import.meta.env.VITE_API_URL + `/auth/code`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userStore.token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      window.location.href = `${redirect_uri}?code=${data.token.token}`;
    });
};
</script>

<template>
  <div class="grid lg:grid-cols-2 min-h-screen p-4">
    <div
      class="w-full bg-slate-400 h-full hidden lg:block bg-cover bg-no-repeat bg-center rounded-xl shadow-lg"
      :style="`background-image: url('${background}');`"
    ></div>
    <main class="flex justify-center gap-2 flex-col max-w-lg mx-auto w-full">
      <h1 class="font-bold text-4xl">Diose</h1>
      <h2 class="text-xl text-neutral-600 dark:text-neutral-200">
        Connexion à l'un de nos services
      </h2>
      <button
        v-if="userStore.user"
        class="text-left flex gap-2 border-2 p-2 items-center rounded-3xl border-zinc-100 bg-white dark:bg-neutral-800 dark:border-neutral-700 hover:bg-white ease-out duration-300 cursor-pointer hover:-translate-y-2 hover:shadow-md"
        @click="currentAuthUserLogin"
      >
        <img
          v-if="userStore?.user?.avatarUrl"
          :src="userStore?.user?.avatarUrl"
          class="w-16 h-16 rounded-2xl"
        />
        <div
          :class="{
            'p-3': !userStore?.user?.avatarUrl,
          }"
        >
          <div>Connexion en tant que</div>
          <span class="text-lg font-semibold">{{
            userStore?.user?.username
          }}</span>
        </div>
      </button>
      <div class="flex flex-col justify-center gap-2 pt-1">
        <SocialSignIn social="discord" @click="redirectToProvider('discord')" />
        <SocialSignIn social="google" @click="redirectToProvider('google')" />
        <SocialSignIn social="github" @click="redirectToProvider('github')" />
      </div>
      <div class="flex items-center gap-2 py-4">
        <div class="h-0.5 bg-neutral-300 dark:bg-neutral-400 w-full"></div>
        <span class="text-neutral-300 dark:text-neutral-400 uppercase">Ou</span>
        <div class="h-0.5 bg-neutral-300 dark:bg-neutral-400 w-full"></div>
      </div>
      <div class="w-full flex flex-col gap-3">
        <Input label="Email" placeholder="john.doe@diose.io" v-model="email" />
        <div class="relative">
          <Input
            label="Mot de passe"
            placeholder="Mot de passe"
            type="password"
            v-model="password"
          />
          <RouterLink
            :to="{ name: 'forgot-password' }"
            class="dark:text-neutral-200 text-sm mb-2 absolute top-0 right-0"
          >
            Mot de passe oublié ?
          </RouterLink>
        </div>
        <Button class="mt-4" @click="loginEmail"> Connexion </Button>
        <a href="#" class="dark:text-neutral-200 text-sm mt-3">
          Pas encore de compte?
          <RouterLink to="/register" class="text-primary-400 underline"
            >S'inscrire</RouterLink
          >
        </a>
      </div>
    </main>
  </div>
</template>
