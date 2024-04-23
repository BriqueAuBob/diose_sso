<script setup lang="ts">
import userStore from "./stores/user";
import useFetch from "./composables/useFetch";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

const store = userStore();
const route = useRoute();

onMounted(async () => {
  const token = localStorage.getItem("token");
  const { data } = await useFetch("/users/@me");
  store.login(data?.value?.user, token);

  if (route.query.redirect_uri) {
    localStorage.setItem("redirect_uri", route.query.redirect_uri as string);
  }
});
</script>

<template>
  <RouterView />
</template>
