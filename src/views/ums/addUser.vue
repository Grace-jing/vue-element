<template>
  <div>
    <user-form :is-edit='false'></user-form>
  </div>
</template>

<script>
import UserForm from './components/userForm.vue';
export default {
  name: 'AddUser',
  components: { UserForm },
  data() {
    return {
    }
  },
}
</script>

<style lang='scss' scoped>
</style>