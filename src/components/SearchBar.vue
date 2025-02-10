<template>
    <v-col cols="6">
      <v-text-field v-model="search" :label="`Buscar ${title}`" clearable></v-text-field>
    </v-col>
    <v-col cols="2" class="d-flex align-start">
      <v-btn class="custom-width" color="primary" variant="flat" dark @click="searchItems"
        name="SearchButton">Buscar</v-btn>
    </v-col>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const search = ref('');
const emits = defineEmits(['searchItems']);

defineProps({
  title: { type: String, required: true }
});

function searchItems() {
    emits('searchItems', search.value);
}
</script>

<style scoped>
.custom-width {
  height: 48px;
  width: 100px;
}
</style>