<template>
  <div class="wrapper">
    <div class="wrapper-content">
      <section>
        <div class="container">
          <button class="btn btnPrimary" @click="modalFirst = !modalFirst">Show first modal</button>
          <modals title="First modal" v-show="modalFirst" @close="modalFirst = false">
            <div slot="body">
              <p>Text</p>
              <button class="btn btnPrimary" @click="modalFirst = !modalFirst">Well Done!</button>
            </div>
          </modals>

          <button
            class="btn btnPrimary"
            @click="modalSecond.show = !modalSecond.show"
          >Show modal with form</button>
          <modals
            title="Modal with form"
            v-show="modalSecond.show"
            @close="modalSecond.show = false"
          >
            <div slot="body">
              <form @submit.prevent="submitSecondForm">
                <label>
                  Name:
                  <input type="text" v-model="modalSecond.name" required />
                </label>
                <label>
                  Email:
                  <input type="email" v-model="modalSecond.email" required />
                </label>
                <button class="btn btnPrimary">Submit!</button>
              </form>
            </div>
          </modals>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import modals from '@/components/Modal.vue'
export default {
  components: { modals },
  data () {
    return {
      modalFirst: false,
      modalSecond: {
        show: false,
        name: '',
        email: '',
      }
    }
  },
  methods: {
    submitSecondForm () {
      console.log({
        name: this.modalSecond.name,
        email: this.modalSecond.email,
      });
      this.modalSecond.name = '';
      this.modalSecond.email = '';
      this.modalSecond.show = false;
    }
  }
}
</script>

<style lang="scss">
label {
  cursor: pointer;
}
</style>
