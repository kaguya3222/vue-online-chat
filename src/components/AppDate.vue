<template>
  <span :title="unixDate | humanFriendlyDate">
    {{ unixDate | relativeDate }}
  </span>
</template>

<script>
import moment from "moment";
export default {
  name: "AppDate.vue",
  props: {
    unixDate: {
      required: true,
      type: Number
    }
  },
  filters: {
    humanFriendlyDate(date) {
      return moment.unix(date).format("MMMM Do YYYY, h:mm:ss a");
    },
    relativeDate(date) {
      return moment.unix(date).fromNow();
    }
  }
};
</script>
