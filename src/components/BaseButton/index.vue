<template>
  <b-button
    v-bind="$attrs"
    :squared="squared"
    :disabled="disabled"
    @click="onClick"
    :variant="variant"
  >
    <slot />
  </b-button>
</template>

<script>
import { baseButtonVariants } from "@/components/BaseButton/constants";

export default {
  props: {
    squared: Boolean,
    disabled: Boolean,
    variant: {
      type: String,
      default: baseButtonVariants.primary,
      validator: v => Object.values(baseButtonVariants).includes(v)
    }
  },
  methods: {
    onClick() {
      this.$emit("click");
    }
  }
};
</script>
