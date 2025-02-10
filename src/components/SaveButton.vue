<template>
  <v-btn color="primary" @click="$emit('save')">
    <v-icon left>mdi-content-save</v-icon>
    Salvar
  </v-btn>
</template>

<script>
export default {
  name: 'SaveButton',
};
</script>

<style scoped>
.v-btn {
  text-transform: none;
}
</style>
