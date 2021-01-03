<template>
	
	<section class="new-note col">

		<label class="new-note__heading">
			<!-- <h2 class="title">Title</h2> -->
			<input v-model="note.title" type="text" placeholder="Title" aria-describedby="enter-title">
		</label>
    
    
    <label lass="new-note__descr">
    	<!-- <h2 class="title">Description</h2> -->
    	<textarea v-model="note.description" cols="30" rows="3" placeholder="Take a note..." aria-describedby="enter-description"></textarea>
    </label>

    <div class="new-note__importance">
    	<button class="toggle"
    					v-for="btn in buttons" 
    					:class="[{ 'selected' : btn.selected }, btn.importance]"
    					@click="setSelected(btn.id, btn.importance)">
    						
    	</button>
    </div>

    <button class="new-note__btn btn btn--primary" @click="addNote" type="button">New note</button>
  </section>


</template>


<script>
	export default {
		props: {
			note: {
				type: Object,
				required: true
			},
		},
		data() {
			return {
				buttons: [
					{id: 0, importance: 'usual', selected: true},
					{id: 1, importance: 'serious', selected: false},
					{id: 2, importance: 'grand', selected: false}
				],
				importance: 'usual'
			}
		},
		methods:{
			addNote() {
				this.$emit('addNote', {
					note: this.note,
					importance: this.importance
				})
				this.reset()
			},
			setSelected(id, importance) {
				this.importance = importance
				this.buttons.forEach(btn => {
					if (btn.id === id) {
						btn.selected = true
					} else {
						btn.selected = false
					}
				})
			},
			reset() {
				this.buttons.forEach(btn => {
					if (btn.importance === 'usual') {
						btn.selected = true
					} else {
						btn.selected = false
					}
				})
				this.importance = 'usual'
			}
		}
	}

</script>


<style lang="scss">

.new-note {
	text-align: center;

	&__importance {
		display: flex;
		justify-content: center;

		margin-top: 20px;
	}

	.toggle {
		display: block;

		width: 20px;
		height: 20px;
		border: none;
		border-radius: 50%;

		transition: .2s box-shadow;

		&:not(:last-child){ margin-right: 20px; }

		&.usual {
			background-color: #26a69a;

			&:focus { box-shadow: 0px 0px 10px 0px rgba(38,166,154,1) }
			&.selected { box-shadow: 0px 0px 30px 10px rgba(38,166,154,0.9); }
		}
		&.serious {
			background-color: #fed330;

			&:focus { box-shadow: 0px 0px 10px 0px rgba(254, 211, 48, 0.9) }
			&.selected { box-shadow: 0px 0px 30px 10px rgba(254, 211, 48, 0.9); }
		}
		&.grand {
			background-color: #fc5c65;

			&:focus { box-shadow: 0px 0px 10px 0px rgba(252, 92, 101, 0.9) }
			&.selected { box-shadow: 0px 0px 30px 10px rgba(252, 92, 101, 0.9); }
		}
	}

	&__btn { align-self: center; }
}
</style>