<template>
  <RouterView/>
</template>

<script lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { RouterLink } from "vue-router";

export default {};
</script>

<style lang="scss">
@import "./assets/main.scss";
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500&family=Roboto:wght@300;400&display=swap");
body{
  background: #f5f7fa;
}

div {
  font-family: "Open Sans", sans-serif;
}

nav {
  font-family: "Open Sans", sans-serif;
}

h3{
  font-family: "Open Sans", sans-serif;
}


button{
   font-family: "Open Sans", sans-serif;
   font-weight: $font-weight-medium-cusotmize;
}


</style>
