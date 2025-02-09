<template>
  <v-navigation-drawer app permanent width="250" class="custom-sidebar">
    <v-list dense>
      <v-list-item title="coLAB" class="text-white">
        <template v-slot:prepend>
          <v-icon>mdi-alpha-c-box</v-icon>
        </template>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item
        prepend-icon="mdi-briefcase-outline"
        title="Bolsas"
        value="bolsas"
        class="text-white"
        to="/bolsas"
      ></v-list-item>

      <v-list-item
        prepend-icon="mdi-cash-multiple"
        title="Financiadores"
        value="financiadores"
        class="text-white"
        to="/financiadores"
      ></v-list-item>

      <v-list-item
        prepend-icon="mdi-account-multiple"
        title="Pessoas"
        value="pessoas"
        class="text-white"
        to="/pessoas"
      ></v-list-item>

      <v-list-item
        prepend-icon="mdi-lightbulb-on-outline"
        title="Projetos"
        value="projetos"
        class="text-white"
        to="/projetos"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'Sidebar',
};
</script>

<style scoped>
.custom-sidebar {
  background-color: #171f27;
}

.text-white {
  color: white !important;
}
</style>
