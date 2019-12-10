<template></template>

<script>
import modal from '@components/UI/modal.vue'
import { required, minLength, email } from 'vuelidate/lib/validators'

export default {
  components: { modal },
  validations: {
    login: {
      required,
      minLength: minLength(4),
    },
    email: {
      required,
      email,
    },
    password: {
      required,
    }
  },
}
</script>
