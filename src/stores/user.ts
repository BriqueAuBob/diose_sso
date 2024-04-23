import { defineStore } from "pinia";

export default defineStore("user", {
  state: () => ({
    user: null as any,
    token: null as string | null,
  }),
  actions: {
    async login(user: any, token: any) {
      this.user = user;
      this.token = token;
      localStorage.setItem("token", token);
    },
  },
});
