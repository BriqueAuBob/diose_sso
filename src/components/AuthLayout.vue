<script setup lang="ts">
import background from "../assets/background.png";
</script>

<template>
  <div class="grid lg:grid-cols-2 min-h-screen p-4">
    <div
      class="w-full bg-slate-400 h-full hidden lg:block bg-cover bg-no-repeat bg-center rounded-xl shadow-lg"
      :style="`background-image: url('${background}');`"
    ></div>
    <main class="flex justify-center gap-2 flex-col max-w-lg mx-auto w-full">
      <slot></slot>
    </main>
  </div>
</template>
