import { reactive, toRefs } from "vue";

export default async (url: RequestInfo | URL, options: any = {}) => {
  const state = reactive<{
    data: any;
    error: any;
    loading: boolean;
  }>({
    data: null,
    error: null,
    loading: true,
  });

  //@ts-ignore
  if (!options?.headers?.Authorization) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
  }
  if (options?.body) {
    options.body = JSON.stringify(options.body);
    options.headers = {
      ...options.headers,
      "Content-Type": "application/json",
    };
  }

  await fetch(import.meta.env.VITE_API_URL + url, options)
    .then((response) => response.json())
    .then((data) => {
      state.data = data;
      state.loading = false;
    })
    .catch((error) => {
      state.error = error;
      state.loading = false;
    });

  return toRefs<{
    data: any;
    error: any;
    loading: boolean;
  }>(state);
};
