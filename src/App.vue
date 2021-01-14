<template>
  <div id="app">
    <v-app v-if="!loading">
      <AppHeader></AppHeader>
      <v-main app>
        <v-container fluid>
          <AppLogin />
          <router-view />
          <AppSnackbar />
        </v-container>
      </v-main>
      <AppFooter></AppFooter>
    </v-app>
  </div>
</template>

<script>
import AppHeader from "@/components/layouts/AppHeader";
import AppFooter from "@/components/layouts/AppFooter";
import AppLogin from "@/components/layouts/AppLogin";
import AppSnackbar from "@/components/layouts/AppSnackbar";
import { mapState, mapActions } from "vuex";
export default {
  name: "App",
  data: () => ({
    loading: true,
  }),
  components: { AppHeader, AppFooter, AppLogin, AppSnackbar },
  methods: { ...mapActions(["LOGIN"]) },
  computed: { ...mapState(["user", "keyUser"]) },
  beforeMount() {
    try {
      const user = JSON.parse(localStorage.getItem(this.keyUser));
      //   console.log(user);
      if (user) {
        this.LOGIN({
          email: user.email,
          password: user.password,
          userType: user.userType,
        })
          .then((success) => (this.loading = false))
          .catch((fail) => (this.loading = false));
      } else {
        this.loading = false;
      }
    } catch (e) {
      //pass
      console.log(e.message);
      this.loading = false;
    }
  },
};
</script>

<style>
</style>