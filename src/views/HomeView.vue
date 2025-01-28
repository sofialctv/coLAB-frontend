<!-- src/views/HomeView.vue -->
<template>
    <q-page class="q-pa-md">
      <h1>User List</h1>
      <ul>
        <li v-for="user in users" :key="user.id">
          {{ user.name }} - {{ user.email }}
        </li>
      </ul>
    </q-page>
  </template>
  
  <script>
  import UserController from '../controllers/UserController';
  
  export default {
    name: 'HomeView',
    data() {
      return {
        users: [],
      };
    },
    created() {
      this.users = UserController.fetchUsers();
    },
  };
  </script>
  