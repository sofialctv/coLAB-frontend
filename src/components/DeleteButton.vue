<template>
  <v-btn color="error" @click="$emit('delete')">
    <v-icon left>mdi-delete</v-icon>
    Excluir
  </v-btn>
</template>

<script>
export default {
  name: 'DeleteButton',
};
</script>

<style scoped>
.v-btn {
  text-transform: none;
}
</style>
