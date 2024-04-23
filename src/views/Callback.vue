<script setup lang="ts">
import { computed, onMounted } from "vue";
import discord from "../assets/discord.svg";
import google from "../assets/google.svg";
import github from "../assets/github.svg";
import { useRoute, useRouter } from "vue-router";
import userStore from "../stores/user";

const user = userStore();
const route = useRoute();
const router = useRouter();
const icons = {
  discord,
  google,
  github,
};

const provider = route.params.provider as keyof typeof icons;
const colors = {
  discord: "#5865F2",
  google: "#323232",
  github: "#211F1F",
};

const normalizedProviderName = computed(() => {
  return provider.charAt(0).toUpperCase() + provider.slice(1);
});

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  if (code) {
    fetch(import.meta.env.VITE_API_URL + `/oauth/${provider}/callback`, {
      method: "POST",
      body: JSON.stringify({ code }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.token) {
          throw new Error("No token in response");
        }
        user.login(data.user, data.token.token);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setTimeout(() => {
          router.push("/");
        }, 1000);
      });
  }
});
</script>

<template>
  <div class="flex justify-center items-center h-screen flex-col">
    <div
      class="bg-neutral-800 py-4 px-6 flex items-center justify-center rounded-3xl relative mb-4 shadow-lg shadow-neutral-800"
      :style="`background-color: ${colors[provider]}`"
    >
      <div
        class="absolute w-full h-full left-0 top-0 rounded-3xl -z-10 animate-bounce"
        :style="`background-color: ${colors[provider]}`"
      />
      <component
        :is="icons[provider]"
        class="text-white animate-bounce w-10 h-10"
      />
    </div>
    <div class="ml-4 text-center">
      <h1 class="text-2xl font-semibold">Authentification</h1>
      <h2 class="text-5xl mt-1 font-bold">{{ normalizedProviderName }}</h2>
      <p class="mt-6 text-neutral-400">
        Ne quitte pas cette page... Tu vas être redirigé.
      </p>
    </div>
  </div>
</template>
