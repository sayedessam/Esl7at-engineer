<template>
  <v-app :key="comp">
    <!-- FIXME:shdjfghsjkdfg -->
    <v-navigation-drawer v-if="!loading" v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app dark>
      <v-list dense>
        <template v-for="item in items">
          <v-layout v-if="item.heading" :key="item.heading" align-center>
            <v-flex xs6>
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-flex>
            <v-flex xs6 class="text-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon
          >
            <template v-slot:activator>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>{{ item.text }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <v-list-item v-for="(child, i) in item.children" :key="i">
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title class="title">{{ child.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item v-else :key="item.text" :to="item.link">
            <v-list-item-action>
              <v-icon color="blue lighten-3">{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
      <template v-slot:append>
        <div class="pa-3 text-center dark primary white--text title">Esla7at</div>
        <v-layout justify-center class="white">
          <v-img src="./assets/eslah.png" max-width="80" class="ma-4"></v-img>
        </v-layout>
      </template>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app class="primary" dark>
      <v-toolbar-title class="headline">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-btn text to="/">
          <span class="title">Esla7at</span>
        </v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <span>{{ user ? user.userEmail : '' }}</span>
      <v-btn v-if="user" class="orange darken-4" @click="logOutUser">Logout</v-btn>
      
      <Signin v-else />
      
      <v-btn text to="/about">About</v-btn>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
export default {
  components: {
    Footer: () => import("./components/base/Footer")
  },
  data () {
    //FIXME: condition
    return {
      dialog: false,
      drawer: null,
      comp: 0
    }  
  },
  methods: {
    forceRerender() {
      this.comp += 1
    },
    logOutUser() {
      this.$store.dispatch('logUserOut')
    },
  },
  computed: {
    user() {
      return this.$store.getters.user
    },
    loading() {
      return this.$store.getters.loading
    },
    items() {
      if (this.user) {
        return [
      {
        icon: "mdi-account-box-outline",
        text: "Customers",
        link: "/customerlist"
      },
      { icon: "mdi-car-hatchback", text: "Vehicles", link: "/vehiclelist" },

      {
        icon: "mdi-home-city-outline",
        text: "Workshops",
        link: "/workshoplist"
      },
      { icon: "mdi-alarm", text: "Appointments", link: "/appointmentlist" },
      {
        icon: "mdi-clipboard-pulse-outline",
        text: "Inspections",
        link: "/inspectionlist"
      },
      {
        icon: "mdi-settings-outline",
        text: "Setup",
        link: "/setup"
      },
      { icon: "mdi-cloud-download-outline", text: "Downloads", link: "/about" }
    ]
      }
      else return [{ icon: "mdi-cloud-download-outline", text: "Downloads", link: "/about" }]
    }
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        // this.$forceUpdate()
        this.$router.push("/")
      }
    }
  }
};
</script>
 