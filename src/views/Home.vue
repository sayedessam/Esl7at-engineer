<template>
  <v-container>
    <h2 v-if="user" class="text-center primary--text">
      Service Engineer: {{ user.userName }}{{ user.userRole == '0' ? ' (Admin)': ''}}</h2>
    <hr />
    <Signin v-if="!user" />
    <br />
    <v-layout align-center justify-center>
      <v-img
        src="../assets/workshop.jpg"
        max-width="700"
        max-height="500"
      ></v-img>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.getters.user
    }
  },
  components: {}
};
</script>
