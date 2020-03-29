<template>
  <b-form-group :label="inputMetadata.label" :label-for="inputMetadata.id">
    <b-form-input
      v-model="validation.$model"
      :id="inputMetadata.id"
      :type="inputMetadata.type"
      :placeholder="inputMetadata.placeholder"
      :state="isInputValid"
    ></b-form-input>
    <b-form-invalid-feedback :state="isInputValid">
      {{ validationErrorTitle }}
    </b-form-invalid-feedback>
  </b-form-group>
</template>

<script>
export default {
  props: {
    inputMetadata: {
      required: true,
      type: Object
    },
    validation: {
      required: true,
      type: Object
    }
  },
  computed: {
    isInputValid() {
      return this.validation.$dirty ? !this.validation.$error : null;
    },
    validationErrorTitle() {
      const validationErrorTitles = [];
      if (!this.validation.$dirty) return true;
      for (let [key, value] of Object.entries(
        this.inputMetadata.validationErrors
      )) {
        !this.validation[key] &&
          this.validation.$error &&
          validationErrorTitles.push(value);
      }
      return validationErrorTitles[validationErrorTitles.length - 1];
    }
  }
};
</script>

<style scoped></style>
