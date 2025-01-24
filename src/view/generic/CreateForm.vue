<template>
  <v-card class="pa-4">
    <v-form @submit.prevent="submitForm">
      <v-row>
        <v-col v-for="(field, index) in fields" :key="index" cols="12" md="6">
          <!--
          Para um create form generico, o tipo de campo deve modificar o componente utilizado,
          trocar apenas o type gera problemas de usabilidade

          se precisar de outros tipos de componentes como checkbox, select, tem que alterar aqui
          eu acho dificil fazer componente de select pq precisa passar os items para de opcao
          ex: -->
          <v-checkbox v-if="field.type && field.type == 'checkbox'"
            v-model="formData[field.key]"
            :label="field.label"
            :required="field.required"
            :data-testid="`checkbox-${field.key}`"
          ></v-checkbox>

          <v-text-field v-else
            v-model="formData[field.key]"
            :label="field.label"
            :required="field.required"
            :type="field.type || 'text'"
            :data-testid="`input-${field.key}`"
          />
        </v-col>
      </v-row>
      <v-row class="error-messages pl-4">
        {{ erros }}
      </v-row>

      <v-row class="d-flex justify-end">
        <v-btn type="submit" color="primary" flat> Salvar </v-btn>
      </v-row>
    </v-form>
  </v-card>

  <GenericSnackbar
    v-model="snackbar"
    :text="mensagemSnackbar"
    :color="corSnackbar"
    :timeout="3000"
  />
</template>

<script setup lang="ts">
import type { IField } from '@/model/generic/IField';
import { onMounted, ref, watch, type PropType } from 'vue';
import { useRouter } from 'vue-router';
import GenericSnackbar from './GenericSnackbar.vue';

const erros = ref('');

const props = defineProps({
  title: { type: String, required: true },
  fields: { type: Array as PropType<IField[]>, required: true },
  store: { type: Object, required: true },
  item: { type: Object, default: null },
  isEditMode: { type: Boolean, default: false },
  successRoute: { type: String, required: false }
});

const router = useRouter();
const formData = ref<Record<string, unknown>>({});

const initializeFormData = () => {
  if (props.fields && Array.isArray(props.fields)) {
    props.fields.forEach((field: IField) => {
      // Inicializa como false para checkbox, ou usa o valor do item ou o valor padrão
      formData.value[field.key] = field.type === 'checkbox' ? (props.item && props.item[field.key] !== undefined ? props.item[field.key] : false)
      : (props.item ? props.item[field.key] : field.default || '');
    });
    if (props.item?.Id) formData.value.Id = props.item.Id;
  } else {
    console.error("props.fields não está definido ou não é um array.");
  }
};


onMounted(() => {
  initializeFormData();
});

// Watch para atualizar o formData ao editar um item
watch(() => props.item, (newItem) => {
  if (newItem && props.isEditMode) {
    initializeFormData();
  }
}, { immediate: true });

const snackbar = ref(false);
const mensagemSnackbar = ref('');
const corSnackbar = ref('');

function snackbarSuccess() {
  corSnackbar.value = 'success';
  snackbar.value = true;
  mensagemSnackbar.value = 'Ação concluída com sucesso!';
}

function snackbarError() {
  corSnackbar.value = 'error';
  snackbar.value = true;
  mensagemSnackbar.value = 'Ocorreu um erro!';
}

const submitForm = async () => {
  try {
    erros.value = ''
    if (props.isEditMode) {
      await props.store.updateItem(props.item.Id, formData.value);
      console.log('updatingItem', `Id: ${props.item.Id} e formData: `, formData.value);
    } else {
      await props.store.save(formData.value);
      console.log('creating', formData.value);
    }
    if (props.successRoute) router.push(props.successRoute);
    else snackbarSuccess();
  } catch (error) {
    snackbarError();
    console.error("Erro ao salvar item:", error);
  }
};
</script>

<style scoped>
.v-card {
max-width: 600px;
margin: auto;
}

.error-messages {
color: #AE1212;
font-size: small;
}
</style>
