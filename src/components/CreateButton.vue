<template>
  <v-row>
    <v-col :cols="cols" class="d-flex justify-start">
      <v-btn
        :color="color"
        :class="customClass"
        @click="handleClick"
      >
        <slot>{{ buttonText }}</slot>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';

export default defineComponent({
  props: {
    buttonText: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: 'primary',
    },
    variant: {
      type: String,
      default: 'flat',
    },
    customClass: {
      type: String,
      default: '',
    },
    cols: {
      type: Number,
      default: 2,
    },
    onClick: {
      type: Function as PropType<() => void>,
      default: () => {},
    },
  },
  methods: {
    handleClick() {
      this.onClick();
    },
  },
});
</script>
