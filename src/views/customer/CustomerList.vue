<template>
  <v-container>
   <h2 v-if="user" class="text-center primary--text">
      {{ user.userRole == '0' ? 'Administrator': 'Service Engineer'}}: {{ user.userName }}
      <v-btn color="red" dark>Logout</v-btn>
    </h2>
    <hr />
    <br />

    <v-data-table :headers="headers" :items="customers" sort-by="lastDate" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title
            class="px-3 secondary blue--text text--darken-4"
            style="border-radius: 10px;"
          >Esla7at / Customers</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>

          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn fab color="primary" dark class="mb-2" v-on="on">
                <v-icon large>mdi-plus</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="orange">
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12 sm8 md6>
                      <v-text-field v-model="editedItem.name" label="Customer full name"></v-text-field>
                    </v-flex>

                    <v-flex xs12 sm4 md6>
                      <v-text-field v-model="editedItem.mobile" label="Mobile #"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm4 md6>
                      <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md12>
                      <v-text-field v-model="editedItem.address" label="Address"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-btn color="primary">Vehicles</v-btn>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon
          color="amber darken-4"
          small
          class="mr-2"
          @click="editVehicles(item)"
        >mdi-car-hatchback</v-icon>
        <v-icon color="green" small class="mr-2" @click="editItem(item)">mdi-border-color</v-icon>
        <v-icon color="red" small @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    headers: [
      {
        text: "Customer Name",
        align: "left",
        value: "name"
      },
      { text: "Mobile#", value: "mobile" },
      { text: "Email#", value: "email" },
      { text: "Address", value: "address" },
      { text: "Vehicles", value: "vehicles" },
      { text: "Actions", value: "action", sortable: false }
    ],
    customers: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      email: "",
      mobile: "",
      address: "",
      vehicles: null
    },
    defaultItem: {
      name: "",
      email: "",
      mobile: "",
      address: "",
      vehicles: null
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Customer" : "Edit Customer";
    },
    user() {
      return this.$store.getters.user
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.customers = [
        {
          name: "Amir Ezzat",
          email: 'amir@yahoo.com',
          mobile: "12-658-96584",
          address: "6 October",
          vehicles: 2
        },
        {
          name: "Naima Ibrahim",
          email: "naima@feel.com",
          mobile: "10-003-74782",
          address: "El Obour",
          vehicles: 1
        },
        {
          name: "Bahy Hamed - Uber",
          email: "di@gmail.com",
          mobile: "12-763-65985",
          address: "Imbaba",
          vehicles: 1
        }
      ];
    },

    editItem(item) {
      this.editedIndex = this.customers.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.customers.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.customers.splice(index, 1);
    },

    editVehicles(item) {
      confirm("Customer Vehicles Modal");
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.customers[this.editedIndex], this.editedItem);
      } else {
        this.customers.push(this.editedItem);
        this.$store.dispatch('createAccount',this.editedItem)
      }
      this.close();
    }
  }
};
</script>

<style>
</style>
