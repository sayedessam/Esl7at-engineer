<template>
  <v-container>
   
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
