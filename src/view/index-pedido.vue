<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { usePedidoStore } from '@/controller/store/PedidoStore';
import { Pedido } from '@/model/Pedido';
onMounted(async() => {
    await getPosts();
});

const Pedidos = ref();
async function getPosts() {
    await usePedidoStore.fetch('');
    Pedidos.value = usePedidoStore.items;
}

const header = ref([
    { title: 'Id', key: 'Id' },
    { title: 'Data', key: 'Data' },
    { title: 'Valor', key: 'Valor' },
    { title: 'Ações', key: 'actions' }
]);

const showModal = ref(false);
const isEditing = ref(false);

const newPedido = ref<Pedido>({
    Id: '',
    Data: '',
    Valor: 0
});
async function createPedido() {
    try {
        await usePedidoStore.save(newPedido.value);
        showModal.value = false;
    } catch (error) {
        console.error(error);
    }
}

async function salvarPedido() {
    if (isEditing.value) await submitEditPedido();
    else await createPedido();
}

function editPedido(item: unknown) {
    const pedido = item;
    newPedido.value = { ...pedido };
    isEditing.value = true;
    showModal.value = true;
}

async function submitEditPedido() {
    try {
        await usePedidoStore.updateItem(newPedido.value.Id, newPedido.value)
        showModal.value = false;
    } catch (error) {
        console.error(error);
    }
}

async function deletePedido(item: unknown) {
    try {
        await usePedidoStore.deleteItem(item.Id);
    } catch (error) {
        console.error(error);
    }
}
</script>

<template>
        <v-row>
            <v-col cols="2" class="d-flex justify-start">
                <v-btn @click="() => { showModal = true; isEditing = false; newPedido = { Id: '', Data: '', Valor: 0 } }" 
                    class="custom-width-2" 
                    color="primary" 
                    variant="flat"
                >
                    Cadastrar Pedido
                </v-btn>
            </v-col>
        </v-row>
        <v-data-table :headers="header" :items="Pedidos">
            <template #item.actions="{ item }">
                    <v-btn @click="editPedido(item)" color="primary" icon>
                        <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn @click="deletePedido(item)" color="red" icon>
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
                        v-model="newPedido.Id"
                        required
                    ></v-text-field>
                    <v-text-field
                        label="Data"
                        type="Date"
                        v-model="newPedido.Data"
                        required
                    ></v-text-field>
                    <v-text-field
                        label="Valor"
                        v-model="newPedido.Valor"
                        required
                    ></v-text-field>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn @click="showModal = false" >Cancelar</v-btn>
                <v-btn @click="salvarPedido" color="primary" >Salvar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
