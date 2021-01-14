<template>
  <div>
    <v-app-bar class="primary" dark fixed app>
      <v-app-bar-nav-icon
        @click="drawer = true"
        class="hidden-md-and-up"
        v-if="!user.error"
      ></v-app-bar-nav-icon>
      <v-toolbar-title :to="'/'">{{ appName }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="hidden-sm-and-down" v-if="!user.error">
        <v-btn v-for="page in pages" :key="page.path" :to="page.path" text>
          <v-icon left>{{ page.icon }}</v-icon
          >{{ page.label }}</v-btn
        >
        <v-btn text @click="logout"><v-icon>mdi-logout</v-icon>Log out</v-btn>
      </div>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      v-if="!user.error"
      app
    >
      <v-list nav dense>
        <v-list-item-group v-model="group" active-class="primary--text">
          <v-list-item v-for="page in pages" :key="page.path" :to="page.path">
            <v-list-item-icon>
              <v-icon>{{ page.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ page.label }}</v-list-item-title>
          </v-list-item>
          <v-list-item @click="LOGOUT">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Log out</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "AppHeader",
  data: () => ({
    drawer: false,
    group: null,
  }),
  computed: {
    ...mapState(["appName", "user", "pages"]),
  },
  methods: {
    ...mapActions(["LOGOUT", "OPEN_SNACKBAR"]),
    logout() {
      this.LOGOUT()
        .then((success) =>
          this.OPEN_SNACKBAR({ message: success, color: "success" })
        )
        .catch((fail) => this.OPEN_SNACKBAR({ message: fail, color: "error" }));
    },
  },
};
</script>

<style>
</style>