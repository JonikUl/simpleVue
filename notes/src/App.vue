<template>
  <div class="wrapper">
    <div class="wrapper-content">
      <section>
        <div class="container">
          <h1>{{ title }}</h1>

          <message v-if="message" :message="message" />

          <newNote :note="note" @addNote="addNote" />

          <div class="notes">
            <div class="note" v-for="(note, index) in notes" :key="index">
              <div class="note-header">
                <p>{{ note.title }}</p>
              </div>
              <div class="note-body">
                <p>{{ note.descr}}</p>
                <span>{{ note.date }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import message from '@/components/Message.vue'
import newNote from '@/components/NewNote.vue'

export default {
  name: 'app',
  components: {
    message,
    newNote,
  },
  data () {
    return {
      title: 'Notes App',
      message: null,
      note: {
        title: '',
        descr: ''
      },
      notes: [{
        title: 'First Note',
        descr: 'Description for First Note',
        date: new Date(Date.now()).toLocaleString()
      },
      {
        title: 'Second Note',
        descr: 'Description for Second Note',
        date: new Date(Date.now()).toLocaleString()
      },
      {
        title: 'Third Note',
        descr: 'Description for Third Note',
        date: new Date(Date.now()).toLocaleString()
      },
      ]
    }
  },
  methods: {
    addNote () {
      let {
        title,
        descr
      } = this.note;

      if (title === '') {
        this.message = 'Title can`t be blank!';
        return false;
      }

      this.notes.push({
        title,
        descr,
        date: new Date(Date.now()).toLocaleString()
      });
      this.note.title = '';
      this.note.descr = '';
      this.message = null;
    }
  }
}
</script>

<style lang="scss">
</style>
