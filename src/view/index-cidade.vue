<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useCidadeStore } from '@/controller/store/CidadeStore';
import { Cidade, type ICidade } from '@/model/Cidade';
import CreateForm from './generic/CreateForm.vue';
import CreateButton from './generic/CreateButton.vue';
import type { IField } from '@/model/generic/IField';
import GenericTable from './generic/GenericTable.vue';

// Estado e configuração inicial
const cidades = ref<ICidade[]>([]);
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
    cidades.value = useCidadeStore.items;
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

  <GenericTable
    :headers="header"
    :items="cidades"
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
