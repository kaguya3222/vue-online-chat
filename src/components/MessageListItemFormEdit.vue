<template>
  <div class="mt-2">
    <textarea v-model="editingMessage.text" class="form-control"></textarea>
    <div class="mt-1">
      <a
        @click.prevent="updateMessage(editingMessage)"
        href="#"
        class="card-link"
        >Update</a
      >
      <a @click.prevent="cancelEditing" href="#" class="card-link">Cancel</a>
    </div>
  </div>
</template>

<script>
import { messagesRef } from "../firebaseConfig";
import { mapGetters } from "vuex";

export default {
  name: "PageChatMessageListItemEditMessageForm.vue",
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
