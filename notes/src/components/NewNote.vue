<template>
  <div class="new-note">
    <label for="title">Title</label>
    <input v-model="note.title" type="text" id="title" />
    <label for="priority">Priority</label>
    <select v-model="note.priority" name="priority" id="priority">
      <option value="1">Normal</option>
      <option value="2">High</option>
      <option value="3">Very High</option>
    </select>
    <label for="description">Description</label>
    <textarea v-model="note.descr" id="description"></textarea>
    <button class="btn btnPrimary" @click="addNote">New Note</button>
  </div>
</template>

<script>
export default {
  props: {
    note: Object,
    required: true,
  },
  methods: {
    addNote () {
      this.$emit('addNote', this.note)
    }
  }
}
</script>

<style lang="scss" scoped>
.new-note {
  text-align: center;
  button {
    margin: 32px 0;
  }
  select {
    padding: 12px 6px;
    margin-bottom: 30px;
  }
  label {
    cursor: pointer;
  }
}
</style>
