<template>
  <div>
    <h1 class="hello">Hello World</h1>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
}
</script>

<style lang="css" scoped>
h1 {
  font-size: 3em;
}
.hello {
  color: red;
}
</style>
