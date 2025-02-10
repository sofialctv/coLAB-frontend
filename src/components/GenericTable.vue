<template>
  <v-row>
    <v-col cols="12">
      <v-data-table :headers="headers" :items="items" item-value="Id">
        <template #item.actions="{ item }">
          <v-btn @click="() => emitEdit(item)" color="primary" icon>
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn @click="() => emitDelete(item)" color="red" icon>
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
        <template #no-data>
          <v-label>Sem dados!</v-label>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { type PropType, defineEmits } from 'vue';

defineProps({
  headers: { type: Array, required: true },
  items: { type: Array, default: null },
  onEdit: { type: Function as PropType<(item: any) => void>, required: true },
});

const emit = defineEmits(['edit', 'delete']);

const emitEdit = (item: any) => {
  emit('edit', item);
};

const emitDelete = (item: any) => {
  emit('delete', item);
};
</script>

<style scoped>
.border {
  border: 1px solid #ddd;
}
</style>
