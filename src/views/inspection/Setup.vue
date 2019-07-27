<template>
  <v-container>
    <ul v-for="(item, i) in inspectItems" :key="i">
      <li>{{ item }}</li>
    </ul>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      inspectItems: ["Oil level", "Tire pressure", "Radiater water"]
    };
  }
};
</script>

<style>
</style>
