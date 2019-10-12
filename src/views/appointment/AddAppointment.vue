<template>
  <v-container>
    <h3>Step #: {{ currentStep }}</h3>
    <hr />
    <div v-show="editedItem.customerName">Customer Name: {{ editedItem.customerName }}</div>
    <div v-show="editedItem.vehicleName">Vehicle: {{ editedItem.vehicleName }}</div>
    <div v-show="editedItem.workshopName">Workshop: {{ editedItem.workshopName }}</div>

    <v-stepper v-model="currentStep">
      <v-stepper-header>
        <v-stepper-step :complete="currentStep > 1" step="1">Select Customer's Vehicle</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="currentStep > 2" step="2">Select Workshop and Activities</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3">Set Appointment</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card color="grey lighten-1" class="mb-12" height="200px">

            
          </v-card>
          <v-btn color="primary" @click="currentStep = 2">Continue</v-btn>
          <v-btn text>Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
          <v-btn color="primary" @click="currentStep = 3">Continue</v-btn>
          <v-btn text>Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
          <v-btn color="primary" to="appointmentlist">Continue</v-btn>
          <v-btn text>Cancel</v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      currentStep: 1,
      editedItem: {
        customerName: "Ali",
        vehicleName: "BMW",
        workshopName: "",
        activities: [],
        appDate: "",
        appTime: ""
      }
    };
  },
  props: ["serviceItems"]
};
</script>

<style>
</style>
