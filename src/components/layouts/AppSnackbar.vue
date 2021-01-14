<template>
  <v-snackbar v-model="showSnackbar" :color="snackbarColor" :timeout="2000">
    {{ snackbarMessage }}
    <template v-slot:action="{ attrs }">
      <v-btn icon v-bind="attrs" @click="showSnackbar = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  computed: {
    ...mapState(["snackbarMessage", "snackbarColor"]),
    showSnackbar: {
      get() {
        return this.$store.state.showSnackbar;
      },
      set(value) {
        this.$store.commit("updateShowSnackbar", value);
      },
    },
  },
};
</script>

<style>
</style>