<template>
  <span :title="unixDate | humanFriendlyDate">
    {{ unixDate | relativeDate }}
  </span>
</template>

<script>
import moment from "moment";
export default {
  filters: {
    humanFriendlyDate(date) {
      return moment.unix(date).format("MMMM Do YYYY, h:mm:ss a");
    },
    relativeDate(date) {
      return moment.unix(date).fromNow();
    }
  },
  props: {
    unixDate: {
      required: true,
      type: Number
    }
  }
};
</script>
