export default {
	state: {
		notes: [
			{
	      title: 'First',
	      description: 'First Description',
	      date: new Date(Date.now()).toLocaleString(),
	      importance: 'usual',
	      hiddenTitle: false,
	      hiddenDesc: false
	    },
	    {
	      title: 'Second',
	      description: 'Second Description',
	      date: new Date(Date.now()).toLocaleString(),
	      importance: 'usual',
	      hiddenTitle: false,
	      hiddenDesc: false
	    }
		],
		message: '',
		note: {},
	},
	mutations: {
		updateNotes(state, payload) {

			let {title, description} = payload.note

      if (title === '') {
        return state.message = 'Title can\'t be clear'
      }

      state.notes.unshift({
        // id: state.notes.length - 1,
        title,
        description,
        date: new Date(Date.now()).toLocaleString(),
        importance: payload.importance,
        hiddenTitle: false,
        hiddenDesc: false
      })
      state.note.title = ''
      state.note.description = ''
      state.message = null

		}
	},
	actions: {
		addNote({ commit }, payload) {

			commit('updateNotes', payload)

		}
	},
	getters: {
		getNotes(state) {
			return state.notes
		},
		getMessage(state) {
			return state.message
		}
	}
}