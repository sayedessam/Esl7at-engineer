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
    <h2>We serve most of the cars in the market starting from model year 2005</h2>
    <v-row>
    <v-col cols="12" sm="10" offset-sm="1">
      <v-card>
        <v-container fluid>
          <v-row>
            <v-col
              v-for="(n,i) in makes"
              :key="i"
              class="d-flex child-flex"
              cols="2"
            >
            
              <v-card flat tile class="d-flex">
                
                <v-img
                  :src="n.url"
                  :lazy-src="n.url"
                  aspect-ratio="1"
                  class="grey lighten-5"
                  max-width="110"
                  max-height="80"
                >
                
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
  <br><br>
  </v-container>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.getters.user
    },
    makes() {
      return this.$store.getters.makes
    }
  },
  components: {}
};
</script>