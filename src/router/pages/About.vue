<template>
  <div v-if="!user.error">
    <h2>About Page</h2>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "About",
  data: () => ({}),
  computed: {
    ...mapState(["user"]),
  },
};
</script>

<style>
</style>