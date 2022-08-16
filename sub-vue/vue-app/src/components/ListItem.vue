<template>
  <p>{{val.a}}---{{val.b}}--{{val.c}}</p>
</template>

<script>
export default {
  name: 'ListItem',
  props:{
    val:{
      default: ''
    }
  }
}
</script>

<style>

</style>