<template>
  <modal title="Login" @close="$emit('close')">
    <div slot="body">
      <form @submit.prevent="onSubmit">
        <div class="form-item" :class="{ errorInput: $v.email.$error }">
          <label>
            <p class="errorText" v-if="!$v.email.required">Email is required!</p>
            <p class="errorText" v-if="!$v.email.email">Email is not valid!</p>Email:
            <input
              v-model="email"
              :class="{ error: $v.email.$error }"
              @change="$v.email.$touch()"
            />
          </label>
        </div>
        <div class="form-item" :class="{ errorInput: $v.password.$error }">
          <label>
            <p class="errorText" v-if="!$v.password.required">Password is required!</p>
            <p
              class="errorText"
              v-if="!$v.password.minLength"
            >Password must contain at least {{ $v.password.$params.minLength.min }} letters!</p>Password:
            <input
              v-model="password"
              type="password"
              :class="{ error: $v.password.$error }"
              @change="$v.password.$touch()"
            />
          </label>
        </div>
        <button class="btn btnPrimary">Submit!</button>
        <div class="form-footer">
          <a href="#" @click.prevent="showRegister">Registration</a>
        </div>
      </form>
    </div>
  </modal>
</template>

<script>
import modal from '@/components/UI/Modal.vue'
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'

export default {
  components: { modal },
  data () {
    return {
      email: '',
      password: '',
    }
  },
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(6),
    },
  },
  methods: {
    onSubmit () {
      return;
    },
    showRegister () {
      this.$emit('showRegister')
    }
  }
}
</script>

<style lang="scss" scoped>
.form-footer a {
  margin-top: 20px;
  display: inline-block;
}
</style>
