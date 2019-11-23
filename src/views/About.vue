<template>
  <v-container>
    <br />
    <h2>About Esla7at Serive Engineer Application</h2>
    <hr />
    <p>Service Engineer has the rights to add/edit customer or workshop, user name and password is to be provided by the administrator.
    Appointments has to be agreed with the customer according to the workshop free slots.
    Use setup option to add more inspection items</p>
    <hr />
    <br />
    <v-btn color="secondary black--text">Download Service Book Manual</v-btn>
    <h2>We serve most of the cars in the market starting from model year 2005</h2>
    
    
    <!-- Select your car -->
     <v-toolbar color="blue accent-1" width="650">
    
    <v-toolbar-title class="title mr-6 hidden-sm-and-down">
      <v-icon>mdi-magnify</v-icon>
    </v-toolbar-title>
    <v-autocomplete
      :items="makes"
      :loading="isLoading"
      :search-input.sync="search"
      chips
      clearable
      hide-details
      hide-selected
      item-text="make"
      item-value="logo"
      label="Search for your favorite car make..."
      solo
      width="200"
    >
      <template v-slot:no-data>
        <v-list-item>
          <v-list-item-title>
            Search for your favorite
            <strong>Car Make</strong>
          </v-list-item-title>
        </v-list-item>
      </template>
      <template v-slot:selection="{ attr, on, item, selected }">
        <v-chip
          v-bind="attr"
          :input-value="selected"
          color="white"
          class="indigo--text"
          v-on="on"
        >
          <!-- <v-icon left>mdi-car-sports</v-icon> -->
          <v-img
            :src="item.url"
            :lazy-src="item.url"
            aspect-ratio="1"
            class="white"
            max-width="40"
            max-height="30"
                ></v-img>
          <strong><span v-text="`' ${item.make} ' `"></span></strong>
          
        </v-chip>
      </template>
      <template v-slot:item="{ item }">
        <v-list-item-avatar
        tile
          color="white"
          class="headline font-weight-light white--text"
        >
          <v-img
            :src="item.url"
            :lazy-src="item.url"
            aspect-ratio="1"
            class="white"
            max-width="40"
            max-height="30"
                >
          </v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-text="item.make"></v-list-item-title>
          <v-list-item-subtitle v-text="item.symbol"></v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-icon>mdi-car-sports</v-icon>
        </v-list-item-action>
      </template>
    </v-autocomplete>
  </v-toolbar>



    <v-row>
    <v-col cols="12" xm="8">
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
                  max-width="100"
                  max-height="70"
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

 
<br><br><br><br>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      items: [],
      search: null
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    },
    makes() {
      return this.$store.getters.makes
    }
  },
  watch: {
    search () {
        // Items have already been loaded
        if (this.makes.length > 0) return

        this.isLoading = true

        // Lazily load input items
        fetch('https://api.coinmarketcap.com/v2/listings/')
          .then(res => res.json())
          .then(res => {
            this.items = res.data
          })
          .catch(err => {
            alert(err)
          })
          .finally(() => (this.isLoading = false))
    }
  },
  components: {}
};
</script>