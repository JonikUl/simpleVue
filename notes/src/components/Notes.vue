<template>
  <div class="notes">
    <div
      class="note"
      :class="{ full: !grid, high: note.priority ==2, 'very-high': note.priority == 3}"
      v-for="(note, index) in notes"
      :key="index"
    >
      <div class="note-header" :class="{ full: !grid}">
        <p @click="editTitle(index)" :class="{hidden: note.editing}">{{ note.title }}</p>
        <input
          autofocus="true"
          type="text"
          name="newTitle"
          id="newTitle"
          :placeholder="note.title"
          :class="{hidden: !note.editing}"
          v-model="note.title"
          @keyup.enter="doneEdit(index)"
          @keyup.esc="cancelEdit(index)"
          @blur="cancelEditOnBlur(index)"
        />
        <p style="cursor: pointer;" @click="removeNote(index)">X</p>
      </div>
      <div class="note-body">
        <p>{{ note.descr}}</p>
        <span>{{ note.date }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    notes: {
      type: Array,
      required: true
    },
    grid: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    removeNote (index) {
      this.$emit('remove', index)
    },
    editTitle (index) {
      this.$emit('editTitle', index)
    },
    doneEdit (index) {
      this.$emit('doneEdit', index)
    },
    cancelEdit (index) {
      this.$emit('cancelEdit', index)
    },
    cancelEditOnBlur (index) {
      this.$emit('cancelEditOnBlur', index)
    }
  }
}
</script>

<style lang="scss" scoped>
.notes {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 40px 0;
}
.note {
  width: 48%;
  padding: 18px 20px;
  margin-bottom: 20px;
  background-color: #fff;
  transition: all 0.25s cubic-bezier(0.02, 0.01, 0.47, 1);
  box-shadow: 0 30px 30px rgba($color: #000000, $alpha: 0.2);
  &:hover {
    box-shadow: 0 30px 30px rgba($color: #000000, $alpha: 0.4);
    transition-delay: 0s !important;
    transform: translate(0, -6px);
  }
  &.full {
    width: 100%;
    text-align: center;
  }
  &.high {
    border: 2px solid #fed330;
  }
  &.very-high {
    border: 2px solid #fc5c65;
  }
}
.note-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  p {
    color: #402caf;
    font-size: 22px;
    &:hover {
      cursor: pointer;
    }
  }
  &.full {
    justify-content: center;
    p {
      margin-right: 16px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  input {
    margin-bottom: 0;
    margin-right: 15px;
    padding: 08px 13px;
  }
}
.note-body {
  p {
    margin: 20px 0;
  }
  span {
    font-size: 14px;
    color: #999999;
  }
}
.hidden {
  display: none;
}
</style>
