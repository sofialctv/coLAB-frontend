<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useCidadeStore } from '@/controller/store/CidadeStore';
import { Cidade, type ICidade } from '@/model/Cidade';
import type { IField } from '@/model/generic/IField';
import CreateForm from './generic/CreateForm.vue';
import CreateButton from './generic/CreateButton.vue';
import GenericTable from './generic/GenericTable.vue';
import SearchBar from './generic/SearchBar.vue';

// Estado e configuração inicial
const header = ref([
  { title: 'Id', key: 'Id' },
  { title: 'Nome', key: 'Nome' },
  { title: 'Ações', key: 'actions' },
]);
const showModal = ref(false);
const isEditing = ref(false);

// Instância inicial de Cidade
const newCidade = ref<ICidade>(new Cidade('', ''));

// Campos do formulário
const fields: IField[] = [
  { key: 'Nome', label: 'Nome', type: 'text', required: true },
];

// Fetch inicial
onMounted(async () => {
  await getCidades();
});

// Função para buscar as cidades
async function getCidades() {
  try {
    await useCidadeStore.fetch('');
  } catch (error) {
    console.error('Erro ao buscar cidades:', error);
  }
}

// Funções CRUD
function editCidade(item: ICidade) {
  newCidade.value = { ...item };
  isEditing.value = true;
  showModal.value = true;
}
async function deleteCidade(item: ICidade) {
  try {
    await useCidadeStore.deleteItem(item.Id);
    await getCidades();
  } catch (error) {
    console.error('Erro ao excluir cidade:', error);
  }
}

// Filtro - esse filtro funciona apenas com as informacoes da pagina
// para fazer um filtro por toda a base precisa fazer uma requisicao
const filtro = ref('')
function buscar(valor: string) {
  filtro.value = valor.toLowerCase();
}

const filteredItems = computed(() => {
  return useCidadeStore.items.filter(x => x.Nome.toLowerCase().includes(filtro.value));
})
</script>

<template>
  <CreateButton
    :cols="2"
    customClass="custom-width-2"
    color="primary"
    variant="flat"
    :onClick="() => {
      showModal = true;
      isEditing = false;
      newCidade = new Cidade('', '');
    }"
  >
    Cadastrar Cidade
  </CreateButton>

  <SearchBar title="cidade por nome" @search-items="buscar"></SearchBar>

  <GenericTable
    :headers="header"
    :items="filteredItems"
    @edit="editCidade"
    @delete="deleteCidade"
  />

  <!-- Modal de Cadastro/Edição -->
  <v-dialog v-model="showModal" max-width="500">
    <v-card>
      <v-card-title>
        {{ isEditing ? 'Editar Cidade' : 'Cadastrar Cidade' }}
      </v-card-title>
      <v-card-text>
        <CreateForm
          :title="isEditing ? 'Editar Cidade' : 'Cadastrar Cidade'"
          :fields="fields"
          :store="useCidadeStore"
          :item="isEditing ? newCidade : null"
          :isEditMode="isEditing"
        />
      </v-card-text>
    </v-card>
  </v-dialog>

</template>
