<template>

  <div class="wrapper">

      <div class="container">

        <message v-if="message" :message="message"/> 

        <newnote :note="note" @addNote="addNote"/>

        <section class="tools row">

          <search 
            @search="search = $event" 
            :value="search" 
            placeholder="Find your note"
          />

          <div class="tools__view">

            <button class="tools__btn">
              <svg 
                @click="grid = true" :class="{ active: grid }" class="tools__view-mode" width="24" height="24">
                <use xlink:href="./assets/img/sprite.svg#grid"></use>
              </svg>
            </button>

            <button class="tools__btn">
              <svg @click="grid = false" :class="{ active: !grid }" class="tools__view-mode" width="24" height="24">
                <use xlink:href="./assets/img/sprite.svg#column"></use>
              </svg>
            </button>
          </div>
        </section>

        <notes
          v-if="notes.length !== 0"
          :grid="grid" 
          :notes="notesFilter" 
          @remove="removeNote"
        />

        <p v-else class="no-note">
          You haven't created any notes (￣ヘ￣)
        </p>
      </div>
      <!-- /container -->
  </div>
  <!-- /wrapper -->
  
</template>


<script>

import message from '@/components/Message.vue'
import newnote from '@/components/NewNote.vue'
import notes from '@/components/Notes.vue'
import search from '@/components/Search.vue'

import { mapGetters } from 'vuex'

export default {
  components: {
    message,
    newnote,
    notes,
    search
  },
  data() {
    return {
      title: 'Note App',
      search: '',
      message: '',
      note: {
        title: '',
        description: ''
      },
      notes: [],
      grid: true,
    }
  },
  created() {
    this.notes = this.$store.getters.getNotes
  },
  computed: {
    notesFilter() {
      let array = this.notes,
           search = this.search
      if (!search) return array
      // To lower case
      search = search.trim().toLowerCase()
      // Filter
      array = array.filter( note => {
        const title = note.title.trim().toLowerCase()
        if (title.includes(search)) return note
      })
      return array
    }
  },
  methods: {
    addNote(data) {

      this.$store.dispatch('addNote', data)

      this.message = this.$store.getters.getMessage

      // let {title, description} = data.note

      // if (title === '') {
      //   return this.message = 'Title can\'t be clear'
      // }

      // this.notes.unshift({
      //   // id: this.notes.length - 1,
      //   title,
      //   description,
      //   date: new Date(Date.now()).toLocaleString(),
      //   importance: data.importance,
      //   hiddenTitle: false,
      //   hiddenDesc: false
      // })
      // this.note.title = ''
      // this.note.description = ''
      // this.message = null
    },
    removeNote(index) {
      this.notes.splice(index, 1)
    },
  }
}
</script>

<style lang="scss">
  
  .tools {
    &__btn {
      padding: 0;
      margin-right: 5px;
      
      border: none;
      background-color: transparent;

      transition: .2s transform;

      &:focus { transform: translate(0,-2px); }
    }

    &__view-mode { 
      cursor: pointer;
      color: #999;

      &.active { color: #26A69A; }

      &:focus { transform: translate(0,-2px); }

      &:not(:last-child) { margin-right: 10px; }
    }
  }

  .no-note {
    font-size: 30px;
    text-align: center;
    color: #999;
  }
  
</style>
