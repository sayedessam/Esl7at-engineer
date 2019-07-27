<template>
  <v-container>
    <h2 class="text-center primary--text">Service Engineer: Amr Salim</h2>
    <hr />
    <br />

    <v-data-table :headers="headers" :items="workshops" sort-by="services" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title
            class="px-3 secondary blue--text text--darken-4"
            style="border-radius: 10px;"
          >Esla7at / Vehicles</v-toolbar-title>
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
                    <v-flex xs12 sm12 md12>
                      <v-text-field v-model="editedItem.name" label="Workshop name"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md12>
                      <v-select
                        v-model="editedItem.services"
                        :items="serviceItems"
                        chips
                        label="Select all avaialble services"
                        multiple
                        outlined
                      ></v-select>
                    </v-flex>
                    <v-flex xs2 sm2 md2>
                      <v-text-field v-model="editedItem.branches" label="Branches"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm10 md10>
                      <v-text-field v-model="editedItem.address" label="Address / Mobile"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-switch
                        color="orange darken-3"
                        v-model="editedItem.active"
                        inset
                        label="Active workshop"
                      ></v-switch>
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
        <v-icon color="green" small class="mr-2" @click="editItem(item)">mdi-border-color</v-icon>
        <v-icon color="red" small @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
      <template v-slot:item.active="{ item }">
        <v-chip :color="item.active ? 'green' : 'red' " dark>
          <v-icon>{{ item.active ? 'mdi-check-circle-outline' : 'mdi-cancel' }}</v-icon>
        </v-chip>
      </template>
      <template v-slot:item.services="{ item }">
        <template v-for="serv in item.services">
          <v-chip>{{ serv }}</v-chip>
        </template>
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
    serviceItems: ["Mechanic", "Oil", "Battery", "Tire", "Body", "Paint"],
    headers: [
      {
        text: "Workshop Name",
        align: "left",

        value: "name"
      },
      { text: "Services", value: "services", sortable: false },
      { text: "Branches", value: "branches" },
      { text: "Address", value: "address" },
      { text: "Active", value: "active" },
      { text: "Actions", value: "action", sortable: false }
    ],
    workshops: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      services: [],
      branches: 1,
      address: "",
      active: false
    },
    defaultItem: {
      name: "",
      services: [],
      branches: 1,
      address: "",
      active: false
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Workshop" : "Edit Workshop";
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
      this.workshops = [
        {
          name: "Almarazy",
          services: ["Oil", "Battery"],
          branches: 2,
          address: "Zatoon",
          active: true
        },
        {
          name: "Abdo Workshop",
          services: ["Mechanic", "Body"],
          branches: 3,
          address: "Alsalam City",
          active: false
        },
        {
          name: "Ahmed Elshahat",
          services: ["Mechanic", "Oil", "Battery", "Tire", "Body", "Paint"],
          branches: 5,
          address: "Alsalam City, 5th Settlm 12-658-63256",
          active: true
        }
      ];
    },

    editItem(item) {
      this.editedIndex = this.workshops.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.workshops.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.workshops.splice(index, 1);
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
        Object.assign(this.workshops[this.editedIndex], this.editedItem);
      } else {
        this.workshops.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>

<style>
</style>
