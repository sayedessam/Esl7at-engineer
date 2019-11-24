<template>
<v-container app>
  
  <v-card v-if="loading" flat class="d-flex flex-column justify-center align-center fill-height">
    <br>
    <br>
    <br>
    <v-img src="../assets/eslah.png" max-width="200" class="ma-4"></v-img>
    <br>
      <v-progress-circular
      indeterminate
      color="red"
      size="140"
      width="15"
      rotate="30"
      style="color:#3FBF7F"
      >loading ...</v-progress-circular>
  </v-card>

  <div v-else>
    <div v-if="!user" class="red--text darken-4">Signin to use the menu item</div>
    <h2 v-if="user" class="text-center primary--text">
      {{ user.userRole == '0' ? 'Administrator': 'Service Engineer'}}: {{ user.userName }}
      
    </h2>
    <hr />
    
    <br />
    <v-layout align-center justify-center>
      <v-img
        src="../assets/workshop.jpg"
        max-width="700"
        max-height="500"
      ></v-img>
    </v-layout>
  </div>
</v-container>
  
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.getters.user
    },
    loading() {
      return this.$store.getters.loading

    }
  },
  components: {}
};
</script>
