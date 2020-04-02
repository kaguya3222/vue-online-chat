import nativeToast from "native-toast";

export default {
  methods: {
    showNotification({ message, type }) {
      nativeToast({
        message,
        position: "south",
        timeout: 3000,
        rounded: true,
        type
      });
    }
  }
};
