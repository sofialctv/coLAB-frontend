<template>
  <v-snackbar
    v-model="isActive"
    :timeout="timeout"
    :color="color"
  >
    {{ text }}
    <template v-slot:actions>
      <v-btn
        variant="text"
        @click="closeSnackbar"
      >
        Fechar
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from 'vue';

const props = defineProps({
  modelValue: { type: Boolean, required: true },
  text: { type: String, default: '' },
  color: { type: String, default: 'primary' },
  timeout: { type: Number, default: 5000 },
});

const emit = defineEmits(['update:modelValue']);

const isActive = ref(props.modelValue);

const closeSnackbar = () => {
  isActive.value = false;
  emit('update:modelValue', false);
};

// Watch to sync the prop value with the local state
watch(() => props.modelValue, (newValue) => {
  isActive.value = newValue;
});
</script>
