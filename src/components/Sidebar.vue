<template>
  <v-navigation-drawer
    class="bg-deep-purple"
    theme="dark"
    permanent
    app
  >
    <v-list color="transparent">
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :prepend-icon="item.icon"
        :title="item.title"
        @click="navigateTo(item.route)"
      >
      </v-list-item>
    </v-list>

    <template v-slot:append>
      <div class="pa-2">
        <v-btn block @click="logout">
          Logout
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard', route: '/dashboard' },
        { title: 'Account', icon: 'mdi-account-box', route: '/account' },
        { title: 'Admin', icon: 'mdi-gavel', route: '/admin' },
      ],
    };
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
    logout() {
      console.log('Logout');
    },
  },
};
</script>

<style scoped>
.v-navigation-drawer {
  width: 240px;
}
</style>