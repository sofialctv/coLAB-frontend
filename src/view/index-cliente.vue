<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { useClienteStore } from '@/controller/store/ClienteStore';
import { useCidadeStore } from '@/controller/store/CidadeStore';
import { Cliente } from '@/model/Cliente';
onMounted(async() => {
    await getPosts();
    await getCidades();
});

const clientes = ref();
async function getPosts() {
    await useClienteStore.fetch('');
    clientes.value = useClienteStore.items;
}

const cidades = ref();
async function getCidades() {
    await useCidadeStore.fetch('');
    cidades.value = useCidadeStore.items;
}

const header = ref([
    { title: 'Id', key: 'Id' },
    { title: 'Nome', key: 'Nome' },
    { title: 'Telefone', key: 'Telefone' },
    { title: 'Cpf', key: 'Cpf' },
    { title: 'Ações', key: 'actions' }
]);

const showModal = ref(false);
const isEditing = ref(false);

const newCliente = ref<Cliente>({
    Id: '',
    Nome: '',
    Telefone: '', 
    Cpf: '',
    CidadeId: ''
});
async function createCliente() {
    try {
        await useClienteStore.save(newCliente.value);
        showModal.value = false;
    } catch (error) {
        console.error(error);
    }
}

async function salvarCliente() {
    if (isEditing.value) await submitEditCliente();
    else await createCliente();
}

function editCliente(item: unknown) {
    const cliente = item;
    newCliente.value = { ...cliente };
    isEditing.value = true;
    showModal.value = true;
}

async function submitEditCliente() {
    try {
        await useClienteStore.updateItem(newCliente.value.Id, newCliente.value)
        showModal.value = false;
    } catch (error) {
        console.error(error);
    }
}

async function deleteCliente(item: unknown) {
    try {
        await useClienteStore.deleteItem(item.Id);
    } catch (error) {
        console.error(error);
    }
}
</script>

<template>
        <v-row>
            <v-col cols="2" class="d-flex justify-start">
                <v-btn @click="() => { showModal = true; isEditing = false; newCliente = { Id: '', Nome: '', Telefone: '', Cpf: '', CidadeId: '' } }" 
                    class="custom-width-2" 
                    color="primary" 
                    variant="flat"
                >
                    Cadastrar Cliente
                </v-btn>
            </v-col>
        </v-row>
        <v-data-table :headers="header" :items="clientes">
            <template #item.actions="{ item }">
                    <v-btn @click="editCliente(item)" color="primary" icon>
                        <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn @click="deleteCliente(item)" color="red" icon>
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                </template>
            <template v-slot:no-data>
                <v-label>Sem dados!</v-label>
            </template>
        </v-data-table>
    
    <!-- Modal de Cadastro/Edição -->
    <v-dialog v-model="showModal" max-width="500">
        <v-card>
            <v-card-title>
                {{ isEditing ? 'Editar Resolução' : 'Cadastrar Resolução' }}
            </v-card-title>
            <v-card-text>
                <v-form>
                    <v-text-field
                        label="Id"
                        v-model="newCliente.Id"
                        required
                    ></v-text-field>
                    <v-text-field
                        label="Nome"
                        v-model="newCliente.Nome"
                        required
                    ></v-text-field>
                    <v-text-field
                        label="Telefone"
                        v-model="newCliente.Telefone"
                        required
                    ></v-text-field>
                    <v-text-field
                        label="Cpf"
                        v-model="newCliente.Cpf"
                        required
                    ></v-text-field>
                    <v-select
                        label="Cidade"
                        :items="cidades"
                        item-value="Id"
                        item-title="Nome"
                        v-model="newCliente.CidadeId"
                    >
                    </v-select>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn @click="showModal = false" >Cancelar</v-btn>
                <v-btn @click="salvarCliente" color="primary" >Salvar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
