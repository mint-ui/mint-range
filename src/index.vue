<template>
  <div>mint-range</div>
  <range></range>
  <range>
    <div slot="start">start</div>
    <div slot="end">end</div>
  </range>
</template>

<script>
  import Range from './range.vue';

  export default {
    name: 'mint-range',

    props: {
      text: String
    },

    components: {
      Range
    },

    data() {
      return {
      };
    }
  };
</script>

<style lang="css">

</style>
