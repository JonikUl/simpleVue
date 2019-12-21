<template>
  <div class="wrapper">
    <div class="wrapper-content">
      <section>
        <div class="container">
          <message v-if="message" :message="message" />
          <newNote :note="note" @addNote="addNote" />
          <div class="note-header">
            <h1>{{ title }}</h1>
            <search :value="search" placeholder="Find your note" @search="search = $event" />
            <div class="icons">
              <svg
                :class="{ active: grid }"
                @click="grid = true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
              <svg
                :class="{ active: !grid }"
                @click="grid = false"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3" y2="6" />
                <line x1="3" y1="12" x2="3" y2="12" />
                <line x1="3" y1="18" x2="3" y2="18" />
              </svg>
            </div>
          </div>
          <notes
            :notes="notesFilter"
            :grid="grid"
            @remove="removeNote"
            @editTitle="editTitle"
            @doneEdit="doneEdit"
            @cancelEdit="cancelEdit"
            @cancelEditOnBlur="cancelEditOnBlur"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import message from '@/components/Message.vue'
import newNote from '@/components/NewNote.vue'
import notes from '@/components/Notes.vue'
import search from '@/components/Search.vue'

export default {
  name: 'app',
  components: {
    message,
    newNote,
    notes,
    search,
  },
  data () {
    return {
      title: 'Notes App',
      search: '',
      message: null,
      grid: true,
      note: {
        title: '',
        descr: '',
        priority: 1,
      },
      notes: null
    }
  },
  created () {
    this.notes = this.$store.getters.getNotes
  },
  methods: {
    addNote () {
      let {
        title,
        descr,
        priority
      } = this.note;

      if (title === '') {
        this.message = 'Title can`t be blank!';
        return false;
      }

      this.$store.commit('addNote', {
        title,
        descr,
        priority,
        date: new Date(Date.now()).toLocaleString()
      });
      this.note.title = '';
      this.note.descr = '';
      this.note.priority = 1;
      this.message = null;
    },
    removeNote (index) {
      this.$store.commit('deleteNote', index)
    },
    editTitle (index) {
      this.notes.map(i => i.editing = false);
      this.notes[index].editing = true;
      this.notes[index].cachedTitle = this.notes[index].title;
    },
    doneEdit (index) {
      this.notes[index].editing = false;
      if (!this.notes[index].title) {
        this.notes[index].title = this.notes[index].cachedTitle;
      }
      this.$store.commit('editNote', { index, title: this.notes[index].title })
      delete this.notes[index].cachedTitle
    },
    cancelEdit (index) {
      this.notes[index].editing = false;
      this.notes[index].title = this.notes[index].cachedTitle;
      delete this.notes[index].cachedTitle;
    },
    cancelEditOnBlur (index) {
      this.notes[index].editing = false;
      if (this.notes[index].cachedTitle) {
        this.notes[index].title = this.notes[index].cachedTitle;
      }
    }
  },
  computed: {
    notesFilter () {
      let array = this.notes,
        search = this.search;
      if (!search) return array;
      search = search.trim().toLowerCase();
      array = array.filter(function (i) {
        if (i.title.toLowerCase().indexOf(search) !== -1) {
          return i;
        }
      });
      return array;
    },

  }
}
</script>

<style lang="scss">
.note-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  h1 {
    font-size: 32px;
  }
  svg {
    margin-right: 12px;
    color: #999999;
    &.active {
      color: #402caf;
    }
    &:last-child {
      margin-right: 0;
    }
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
