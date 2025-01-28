<template>
  <v-app>
    <Sidebar /> 

    <v-app-bar app>
      <v-toolbar-title>colab</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

import Sidebar from './components/Sidebar';

export default {
  components: {
    Sidebar,
  },
};
</script>
