<template>
  <modal title="Modal with form" @close="$emit('close')">
    <div slot="body">
      <form @submit.prevent="onSubmit">
        <div class="form-item" :class="{ errorInput: $v.name.$error }">
          <label>
            <p class="errorText" v-if="!$v.name.required">Field is required!</p>
            <p
              class="errorText"
              v-if="!$v.name.minLength"
            >Name must contain at least {{ $v.name.$params.minLength.min }} letters!</p>Name:
            <input
              v-model="name"
              :class="{ error: $v.name.$error }"
              @change="$v.name.$touch()"
            />
          </label>
        </div>
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
        <button class="btn btnPrimary">Submit!</button>
      </form>
    </div>
  </modal>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators'
import modal from '@/components/UI/Modal.vue'

export default {
  components: { modal },
  data () {
    return {
      name: '',
      email: '',
    }
  },
  validations: {
    name: {
      required,
      minLength: minLength(4)
    },
    email: {
      required,
      email
    }
  },
  methods: {
    onSubmit () {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const user = {
          name: this.name,
          email: this.email,
        }
        console.log(user);
        this.name = '';
        this.email = '';
        this.$v.$reset();
        this.$emit('close');
      }
    }
  }
}
</script>

<style lang="scss">
.form-item .errorText {
  display: none;
  margin-bottom: 8px;
  font-size: 13.4px;
  color: #de4040;
}
.form-item.errorInput .errorText {
  display: block;
}
input.error {
  border-color: #de4040;
}
</style>
