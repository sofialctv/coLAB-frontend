<template>
  <v-card>
    <!-- Tabela -->
    <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
      :items-per-page="itemsPerPage"
      v-model:page.sync="page"
      v-model:sort-by="sortBy"
      v-model:sort-desc="sortDesc"
      :loading="loading"
      loading-text="Carregando... Por favor, aguarde."
      @update:page="onPageChange"
    >
      <!-- Slot para personalizar o cabeçalho -->
      <template v-slot:header="{ props }">
        <thead>
          <tr>
            <th
              v-for="header in props.headers"
              :key="header.text"
              class="bold-white"
              :style="{ backgroundColor: '#171f27' }"
            >
              {{ header.text }}
            </th>
          </tr>
        </thead>
      </template>

      <!-- Slot para personalizar células -->
      <template v-slot:item.acoes="{ item }">
        <v-btn icon color="grey lighten-1" @click="$emit('edit', item)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon color="red" @click="$emit('delete', item)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <!-- Paginação -->
    <v-card-actions>
      <v-spacer></v-spacer>
      <span class="mr-4">Página {{ page }} de {{ pageCount }}</span>
      <v-btn icon @click="previousPage">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn icon @click="nextPage">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Props
const props = defineProps({
  headers: {
    type: Array as () => Array<{ text: string; value: string; sortable?: boolean }>,
    required: true,
  },
  items: {
    type: Array as () => Array<any>,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  search: {
    type: String,
    default: '',
  },
});

// Emits
const emit = defineEmits(['edit', 'delete']);

// Dados da tabela
const page = ref(1);
const itemsPerPage = ref(10);
const sortBy = ref([]);
const sortDesc = ref([]);

// Computed
const pageCount = computed(() => {
  return Math.ceil(props.items.length / itemsPerPage.value);
});

// Métodos
const previousPage = () => {
  if (page.value > 1) page.value--;
};

const nextPage = () => {
  if (page.value < pageCount.value) page.value++;
};

const onPageChange = (newPage: number) => {
  page.value = newPage;
};
</script>

<style scoped>
.bold-white {
  color: white !important;
  font-weight: bold !important;
  background-color: #171f27 !important;
}

.v-btn {
  text-transform: none;
}

.grey--text.text--lighten-1 {
  color: #bdbdbd !important;
}

.red--text {
  color: #ff5252 !important;
}
</style>
