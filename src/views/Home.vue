<template>
  <v-container fluid>
    <!-- Banner de Boas-Vindas -->
    <v-row class="welcome-banner" align="left" justify="center">
      <v-col cols="12" md="8" class="text-left">
        <h1 class="text-h3 font-weight-bold mb-4">Bem-vindo ao coLAB!</h1>
        <p class="text-h6 mb-6">
          Utilize a sidebar ao lado para interagir com as abas de Bolsas, Financiadores, Pessoas ou Projetos.
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.welcome-banner {
  background-color: #2c3e50; /* Cor de fundo do banner */
  color: white; /* Cor do texto */
  padding: 40px 20px;
  margin-bottom: 40px; /* Espaçamento abaixo do banner */
}

.options-row {
  padding: 20px; /* Espaçamento interno */
}

.option-card {
  cursor: pointer; /* Muda o cursor para indicar que é clicável */
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* Efeito de transição */
  border-radius: 10px; /* Bordas arredondadas */
}

.option-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2); /* Sombra ao passar o mouse */
}

.text-h3 {
  font-size: 2.5rem; /* Tamanho do título */
}

.text-h6 {
  font-size: 1.25rem; /* Tamanho do subtítulo */
}
</style>
