<template>
  <v-container>
     <v-treeview :items="items" color="blue"  hoverable></v-treeview>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      inspectItems: ["Oil level", "Tire pressure", "Radiater water"],
      items: [
        {
          id: 1,
          name: 'BATTERY :',
          children: [
            { id: 2, name: 'Condition of Terminal' },
            { id: 3, name: 'Indicator' },
            { id: 4, name: 'Expiry' },
          ],
        },
        {
          id: 5,
          name: 'EXHAUST :',
          children: [
            { id: 6, name: 'Exhaust Manifold' },
            { id: 7, name: 'Oxygen Sensor' },
            { id: 8, name: 'Exhaust Pipe' },
            { id: 9, name: 'Tailpipe and Muffler' },
          ],
        },
        {
          id: 10,
          name: 'STEERING & SUSPENSION :',
          children: [
            { id: 11, name: 'U-Joint' },
            { id: 12, name: 'Idler/Pitman Arm' },
            { id: 13, name: 'Center Link' },
            { id: 14, name: 'Bushings' },
            { id: 15, name: 'Tie Rod Ends' },
            { id: 16, name: 'Ball Joints' },
            { id: 17, name: 'Shocks/Struts' },
          ],
        }
      ]
    }
  }
};
</script>

<style>
</style>
