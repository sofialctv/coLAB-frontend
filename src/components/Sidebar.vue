<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    clipped
  >
    <v-list dense>
      <!-- Sidebar Header -->
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">Menu</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- Projeto Tab -->
      <v-list-item
        link
        @click="selectedTab = 'Projeto'"
        :active="selectedTab === 'Projeto'"
      >
        <v-list-item-icon>
          <v-icon>mdi-briefcase</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Projeto</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- Financiador Tab -->
      <v-list-item
        link
        @click="selectedTab = 'Financiador'"
        :active="selectedTab === 'Financiador'"
      >
        <v-list-item-icon>
          <v-icon>mdi-bank</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Financiador</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- Pessoas Tab -->
      <v-list-item
        link
        @click="selectedTab = 'Pessoas'"
        :active="selectedTab === 'Pessoas'"
      >
        <v-list-item-icon>
          <v-icon>mdi-account-group</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Pessoas</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- Bolsas Tab -->
      <v-list-item
        link
        @click="selectedTab = 'Bolsas'"
        :active="selectedTab === 'Bolsas'"
      >
        <v-list-item-icon>
          <v-icon>mdi-cash-multiple</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Bolsas</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      selectedTab: 'Projeto', // Default selected tab
    };
  },
};
</script>

<style scoped>
.v-list-item--active {
  background-color: #2196F3 !important; /* Customize active tab background */
  color: white !important;
}
</style>
