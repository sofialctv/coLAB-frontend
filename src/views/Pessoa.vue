<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import type { IPessoaRequest, IPessoaResponse } from '../models/Entities/Pessoa';
  import GenericSnackbar from '../components/GenericSnackbar.vue';
  import PessoaController from '../controllers/PessoaController';
  import type { IHistoricoCargo } from '../models/Entities/HistoricoCargo';

  // Estados reativos
  const loading = ref(false);
  const pessoas = ref<IPessoaResponse[]>([]);

  // Cabeçalhos da tabela
  const headers = [
    { title: 'ID', key: 'Id' },
    { title: 'Nome', key: 'Nome' },
    { title: 'Email', key: 'Email' },
    { title: 'Telefone', key: 'Telefone' },
    { title: 'CPF', key: 'Cpf' },
    { title: 'Cargo', key: 'CargoNome' },
    { title: 'Bolsa', key: 'BolsaNome' },
    { title: 'Ações', key: 'actions', sortable: false }
  ];

  // Função para carregar as pessoas
  async function carregarPessoas() {
    loading.value = true;
    const controller = new PessoaController();
    try {
      pessoas.value = await controller.getAll();
    } catch (error) {
      console.error('Erro ao carregar pessoas:', error);
    } finally {
      loading.value = false;
    }
  }

  // Função para editar uma pessoa
  async function editarPessoa(id: number) {
    console.log('Editar pessoa com ID:', id);
    // Implemente a lógica de edição aqui
  }

  // Função para deletar uma pessoa
  async function deletarPessoa(id: number) {
    const confirmacao = confirm('Tem certeza que deseja deletar esta pessoa?');
    if (confirmacao) {
      const controller = new PessoaController();
      try {
        await controller.delete(id);
        await carregarPessoas(); // Recarrega a lista após deletar
      } catch (error) {
        console.error('Erro ao deletar pessoa:', error);
      }
    }
  }

  // Carrega as pessoas quando o componente é montado
  onMounted(() => {
    carregarPessoas();
  });

</script>

<template>
  <v-container>
    <v-card>
      <v-data-table
        :headers="headers"
        :items="pessoas"
        :loading="loading"
        loading-text="Carregando... Aguarde"
        no-data-text="Nenhuma pessoa encontrada"
      >
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editarPessoa(item.Id)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deletarPessoa(item.Id)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<style scoped>
/* Estiliza os rótulos com asterisco vermelho */
.required-label::after {
  content: " *";
  color: red;
  font-weight: bold;
}

.v-dialog {
  max-width: 75vw;
}

.v-card-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.v-card-text {
  padding: 16px;
}

.mb-4 {
  margin-bottom: 16px;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(12, 1fr); /* Divide em 12 colunas */
  gap: 16px; /* Espaçamento entre os elementos */
}

.grid-item {
  grid-column: span 6; /* Cada item ocupa 6 colunas */
}

.date-label {
  display: block;
  font-size: 14px;
  font-weight: bold;
}

/* Responsividade para telas menores que 1164px */
@media (max-width: 1164px) {
  .v-dialog {
    max-width: 95vw;
  }

  .grid-item {
    grid-column: span 12;
  }
}
</style>
