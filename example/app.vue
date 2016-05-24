<template>
  <mint-range></mint-range>
  <mint-range>
    <div slot="start">start</div>
    <div slot="end">end</div>
  </mint-range>
  <mint-range disabled :value="3"></mint-range>
  <mint-range :min="7" :max="77" :step="10">
    <div slot="start">7</div>
    <div slot="end">77</div>
  </mint-range>
</template>

<script>
  import { MintRange } from '../src/index.js';

  export default {
    name: 'app',

    components: {
      MintRange
    }
  };
</script>
