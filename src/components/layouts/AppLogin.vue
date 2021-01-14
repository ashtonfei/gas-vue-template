<template>
  <v-row v-if="user.error">
    <v-spacer></v-spacer>
    <v-col cols="12" md="6" lg="5">
      <v-card :loading="loading" :disabled="loading" :outlined="outlined">
        <v-form ref="form" @submit.prevent="login">
          <v-card-title>
            <span class="headline">Login</span>
          </v-card-title>
          <v-card-text class="pb-0">
            <v-text-field
              v-model.trim="email"
              label="Email"
              :rules="emailRules"
              required
              :outlined="outlined"
            ></v-text-field>

            <v-text-field
              v-model.trim="password"
              label="Password"
              :type="showPassword ? 'text' : 'password'"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="passwordRules"
              @click:append="showPassword = !showPassword"
              required
              :outlined="outlined"
            ></v-text-field>

            <v-radio-group v-model="userType" row class="d-none">
              <v-radio label="Student" value="S"></v-radio>
              <v-radio label="Lecturer" value="L"></v-radio>
            </v-radio-group>
            <!-- <small>Forgot password?</small> -->
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn type="submit" color="primary" text>Login</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-col>
    <v-spacer></v-spacer>
  </v-row>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "AppLogin",
  data: () => ({
    email: "",
    emailRules: [
      (v) => !!v || "Email is required",
      (v) => /.+@.+\..+/.test(v) || "Email must be valid",
    ],
    loading: false,
    password: "",
    showPassword: false,
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) => v.length >= 6 || "Password must be 6 digits at least",
    ],
    userType: "L",
  }),
  computed: {
    ...mapState(["user", "outlined"]),
  },
  methods: {
    ...mapActions(["LOGIN", "OPEN_SNACKBAR"]),
    async login() {
      this.loading = true;
      const result = this.LOGIN({
        email: this.email,
        password: this.password,
        userType: this.userType,
      });
      result
        .then((success) => {
          this.email = "";
          this.password = "";
          this.loading = false;
          this.OPEN_SNACKBAR({ message: success, color: "success" });
        })
        .catch((fail) => {
          this.loading = false;
          this.OPEN_SNACKBAR({ message: fail, color: "error" });
        });
    },
  },
};
</script>

<style>
</style>