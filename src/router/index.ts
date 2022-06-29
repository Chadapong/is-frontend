import { createRouter, createWebHistory } from "vue-router";
import Benchmark from "@/views/Benchmark.vue"
import RestApi from "@/views/RestApi.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name:"benchmarkNodejs",
      component: Benchmark
    },
    {
      path: "/rest-api",
      name:"restApi",
      component: RestApi
    }
  ],
});

export default router;
