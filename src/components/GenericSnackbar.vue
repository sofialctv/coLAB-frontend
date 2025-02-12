<template>
  <v-snackbar
    v-model="isActive"
    :timeout="timeout"
    :color="color"
  >
    {{ text }}
  </v-snackbar>
</template>

<script setup lang="ts"></script>
