<template>
  <v-container>
    <br />
    <h2>About Esla7at Serive Engineer Application</h2>
    <hr />
    <Signin v-if="!user" />
    <br />
    <p>Service Engineer has the rights to add/edit customer or workshop, user name and password is to be provided by the administrator.</p>
    <p>Appointments has to be agreed with the customer according to the workshop free slots.</p>
    <p>Use setup option to add more inspection items</p>
    <br />
    <hr />
    <br />
    <v-btn color="secondary black--text">Download Service Book Manual</v-btn>
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