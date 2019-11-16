
<template>
<!-- CodeCoEditor comment  -->
  <v-layout justify-center>
    <v-dialog v-model="dialog" max-width="390">
      <template v-slot:activator="{ on }">
        <v-btn class="orange darken-4" v-on="on">Signin</v-btn>
      </template>
      <v-card>
        <v-card-title class="headline orange">Service Engineer Sign in</v-card-title>
        <v-card-text>
          <v-container>
            <form @submit.prevent="onSignin">
              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    name="email"
                    label="Email"
                    id="email"
                    v-model="email"
                    type="email"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    name="password"
                    label="Password"
                    id="password"
                    v-model="password"
                    type="password"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-btn type="submit" :disabled="loading" :loading="loading" class="primary">
                    Sign in
                    <span slot="loader" class="custom-loader">
                      <v-icon light>cached</v-icon>
                    </span>
                  </v-btn>
                </v-flex>
              </v-layout>
            </form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
/**
 * Signin
 * Reset Password
 *
 */

export default {
  data() {
    return {
      dialog: false,
      email: '',
      password: ''
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    error() {
      return this.$store.getters.error;
    },
    loading() {
      return this.$store.getters.loading;
    }
  },
  watch: {
    
  },
  methods: {
    onSignin() {
      this.$store.dispatch("signUserIn", {
        email: this.email,
        password: this.password
      })
      this.dialog=false
    },
    onDismissed() {
      this.$store.dispatch("clearError");
    }
  }
};
</script>

<style>
</style>
