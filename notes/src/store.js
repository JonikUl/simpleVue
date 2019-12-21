import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    notes: [{
        title: 'First Note',
        priority: 2,
        descr: 'Description for First Note',
        date: new Date(Date.now()).toLocaleString(),
        editing: false
      },
      {
        title: 'Second Note',
        priority: 1,
        descr: 'Description for Second Note',
        date: new Date(Date.now()).toLocaleString(),
        editing: false
      },
      {
        title: 'Third Note',
        priority: 3,
        descr: 'Description for Third Note',
        date: new Date(Date.now()).toLocaleString(),
        editing: false
      },
    ]
  },
  mutations: {
    addNote(store, payload) {
      store.notes.push(payload)
    },
    deleteNote(store, index) {
      store.notes.splice(index, 1)
    },
    editNote(store, payload) {
      store.notes[payload.index].title = payload.title
    }
  },
  actions: {
    addNote({
      commit
    }, payload) {
      store.commit('addNote',
        payload)
    },
    deleteNote({
      commit
    }, id) {
      store.commit('deleteNote', id)
    },
    editNote({
      commit
    }, payload) {
      store.commit('editNote', payload)
    }
  },
  getters: {
    getNotes(store) {
      return store.notes;
    }
  }
})
