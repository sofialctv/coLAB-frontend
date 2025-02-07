<script setup lang="ts">
    import { ref, onMounted, computed } from 'vue';
    import { IPessoa } from '../Models/Pessoa';
    import PessoaController from '../Controllers/PessoaController';

    const pessoaController = new PessoaController();
    const pessoas = ref<IPessoa[]>([]);
    const novaPessoa = ref<IPessoa>({ nome: '', email: '' });

    // carregar todas as pessoas ao carregar a página
    onMounted(async () => {
        pessoas.value = await pessoaController.getAll();
    });

    async function adicionarPessoa() {
        await pessoaController.create(novaPessoa.value);
        pessoas.value = await pessoaController.getAll(); // atualiza a lista de pessoas
        novaPessoa.value = { nome: '', email: '' }; // limpa o campo
    }

    async function excluirPessoa(id : number) {
        await pessoaController.delete(id);
        pessoas.value = await pessoaController.getAll(); // atualiza a lista de pessoas
    }

    const header = ref([
        { title: 'Nome', value: 'nome' },
        { title: 'Email', value: 'email' },
        { title: 'Telefone', value: 'actions' },
        { title: 'CPF', value: 'actions' },
    ]);
</script>

<template>

</template>