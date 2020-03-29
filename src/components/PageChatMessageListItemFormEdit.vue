<template>
  <div class="mt-2">
    <textarea v-model="editingMessage.text" class="form-control"></textarea>
    <div class="mt-1">
      <a
        href="#"
        class="card-link"
        @click.prevent="updateMessage(editingMessage)"
        >Update</a
      >
      <a href="#" class="card-link" @click.prevent="cancelEditing">Cancel</a>
    </div>
  </div>
</template>

<script>
import { messagesRef } from "../firebaseTools";
import { mapGetters } from "vuex";

export default {
  props: {
    message: {
      required: true,
      type: Object
    }
  },
  data() {
    return { editingMessage: { ...this.message } };
  },
  computed: {
    ...mapGetters(["messages"]),
    isMessageEdited() {
      return this.editingMessage.text !== this.message.text;
    }
  },
  methods: {
    updateMessage() {
      messagesRef
        .child(this.editingMessage.id)
        .update({
          text: this.editingMessage.text,
          isUpdated: this.isMessageEdited
        })
        .then(() => this.cancelEditing());
    },
    cancelEditing() {
      this.$emit("onCancelEditing");
    }
  }
};
</script>

<style scoped></style>
