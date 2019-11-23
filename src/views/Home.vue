<template>
<v-container app>
  
    <v-card v-if="loading" flat class="d-flex justify-center align-end fill-height">
      <br>
      <br>
      <br>
      <br>
      <p>
         <v-img src="../assets/eslah.png" max-width="150" class="ma-4"></v-img>
      </p>
      
				<v-progress-circular
				indeterminate
				color="red"
				size="120"
				width="10"
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
