<template>
  <v-container>
    <v-card>
      <v-card-title>
        <span class="text-h5">Gerenciamento de Cargos</span>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="cadastrarCargo">Novo Cargo</v-btn>
      </v-card-title>

      <v-data-table :headers="[
        { title: 'Nome do cargo', key: 'Nome' },
        { title: 'Descrição', key: 'Descricao' },
      ]" :items="Cargos" class="elevation-1">
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.Nome }}</td>
            <td>{{ item.Descricao }}</td>
            <td style="display: flex; gap: 0.5rem; align-items: center;">

              <v-btn icon color="blue" size="small" @click="editarCargo(item)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon color="red" size="small" @click="excluirCargo(item.Id)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title>
          <span class="text-h5"> {{ cargoSelecionado.Id ? 'Editar Cargo' : 'Cadastrar Cargo' }}</span>
        </v-card-title>

        <v-card-text>
          <v-form>

            <label class="required-label">Nome</label>
            <v-text-field
              v-model="cargoSelecionado.Nome"
              :rules="[rules.required]"
              class="mb-4"
              outlined
            ></v-text-field>

            <label class="required-label">Descrição</label>
            <v-text-field
              v-model="cargoSelecionado.Descricao"
              :rules="[rules.required]"
              class="mb-4"
              outlined
            ></v-text-field>
          </v-form>
        </v-card-text>

      <v-card-actions>
          <v-btn color="red" @click="dialog = false">Cancelar</v-btn>
          <v-btn color="green" @click="criarCargo">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>

  <GenericSnackbar
    v-model="snackbar"
    :text="mensagemSnackbar"
    :color="corSnackbar"
    :timeout="3000"
  />
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import GenericSnackbar from '../components/GenericSnackbar.vue';

  import { Cargo } from '../models/Entities/Cargo';
  import type { ICargoResponse } from '../models/Entities/Cargo';
  import CargoController from '../controllers/CargoController';

  const snackbar = ref(false);
  const mensagemSnackbar = ref('');
  const corSnackbar = ref('');

  const cargoController = new CargoController();
  const Cargos = ref<ICargoResponse[]>([]);

  const dialog = ref(false);


  function snackbarSuccess(mensagem?: string) {
    corSnackbar.value = 'success';
    snackbar.value = true;
    mensagemSnackbar.value = mensagem || 'Ação concluída com sucesso!';
  }

  function snackbarError(mensagem?: string) {
    corSnackbar.value = 'error';
    snackbar.value = true;
    mensagemSnackbar.value = mensagem || 'Ocorreu um erro!';
  }


  const carregarCargos = async () => {
    Cargos.value = await cargoController.getAll();
  }

  const cadastrarCargo = () => {
    cargoSelecionado.value = new Cargo(0, '', '');
    dialog.value = true;
  };

  const criarCargo = async () => {
    try {
      await cargoController.create(cargoSelecionado.value);
      snackbarSuccess('Cargo criada com sucesso!');
      dialog.value = false;
      await carregarCargos();
    } catch (error) {
      console.error('Erro ao criar Cargo:', error);
      snackbarError();
    }
  }

  const editarCargo = (Cargo: ICargoResponse) => {
    cargoSelecionado.value = { ...Cargo };
    dialog.value = true;
  }

  const atualizarCargo = async () => {
    try {
      if (cargoSelecionado.value.Id) {
        await CargoController.update(cargoSelecionado.value.Id, cargoSelecionado.value);
        snackbarSuccess('Cargo atualizado com sucesso!');
        dialog.value = false;
        await carregarCargos();
      }
    } catch (error) {
      console.error('Erro ao atualizar Cargo:', error);
      snackbarError();
    }
  }

  const excluirCargo = async (Id: number) => {
    if (confirm('Deseja realmente excluir este Cargo?')) {
      await carregarCargos();

      const existeBolsaAssociada = Cargos.value.some(c => c.CargoId === Id);

      if (existeBolsaAssociada) {
      alert('Este Cargo não pode ser excluído porque está associado a uma ou mais bolsas.');
      return;
      }

      await CargoController.delete(Id);
      await carregarCargos();
    }
  }

  const cargoSelecionado = ref<ICargoResponse>(
    new Cargo(0, '', '')
  );

  const rules = {
    required: (v: any) => (
      v === null || v === undefined || v === '' ? 'Campo obrigatório' : true
    )
  }


  onMounted(() => {
    carregarCargos();
  });

</script>

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
