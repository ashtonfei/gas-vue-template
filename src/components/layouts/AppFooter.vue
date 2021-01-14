<template>
  <v-footer padless app>
    <v-col class="text-center" cols="12">
      {{ new Date().getFullYear() }} — <strong>{{ appName }}</strong>
    </v-col>
  </v-footer>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "AppFooter",
  computed: {
    ...mapState(["appName"]),
  },
};
</script>

<style>
</style>