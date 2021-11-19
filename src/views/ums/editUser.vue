<template>
  <div>
    <user-form :is-edit='true'></user-form>
  </div>
</template>

<script>
import UserForm from './components/userForm.vue';
export default {
  name: 'EditUser',
  components: { UserForm },
  data() {
    return {
    }
  },
}
</script>

<style lang='scss' scoped>
</style>