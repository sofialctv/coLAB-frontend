<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="text-center">
        <h1 class="text-h4 font-weight-bold mb-4">Bem-vindo ao coLAB!</h1>
        <p class="text-h6">
          Utilize a sidebar à esquerda para navegar entre as diferentes seções do sistema.
        </p>
        <p class="text-body-1 mt-4">
          Aqui você pode gerenciar bolsas, financiadores, pessoas e projetos de forma eficiente.
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Home',
};
</script>

<style scoped>
.text-h4 {
  color: #2c3e50;
}

.text-h6 {
  color: #4a5568;
}
</style>
