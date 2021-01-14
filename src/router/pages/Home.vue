<template>
  <div v-if="!user.error">
    <h2>Welcome</h2>
    <p>{{ user.name || "Stranger" }}</p>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Home",
  data: () => ({}),
  computed: {
    ...mapState(["user"]),
  },
};
</script>

<style>
</style>