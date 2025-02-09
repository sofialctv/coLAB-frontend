<template>
  <v-btn color="primary" @click="$emit('click')">
    <v-icon left>mdi-plus</v-icon>
    Novo Cadastro
  </v-btn>
</template>

<script>
export default {
  name: 'NewRegisterButton',
};
</script>

<style scoped>
.v-btn {
  text-transform: none;
  font-weight: 500;
}
</style>
