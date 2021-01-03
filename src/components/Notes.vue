<template>
	<section class="notes">

    <ul class="notes__list">
      <li class="notes__note note" tabindex="0"
      		v-for="(note, index) in notes" 
      		:class="[{ full: !grid }, note.importance]"
      		:key="index"
      >

      	<div class="row">
      		<h2 class="note__title" 
      				@click="editTitle(index, note.title)"
      				:class="{hidden: note.hiddenTitle}"
      		>
      			{{ note.title }}
      		</h2>

      		<input type="text" class="note__edit note__edit--title" placeholder="Change title and hit Enter" 
      					:class="{ 'hidden': !note.hiddenTitle }"
      					v-model="newTitle"
      					@keydown.enter="editTitle(index, newTitle)"
      		>
	        <button class="note__del" @click="removeNote(index)">&#10006;</button>
      	</div>

        <div class="note__body">
        	<p class="note__desc"
        			@click="editDesc(index, note.description)"
      				:class="{hidden: note.hiddenDesc}"
      		>
      			{{ note.description }}
      		</p>

        	<input type="text" class="note__edit note__edit--descr"
        				placeholder="Change description and hit Enter" 
      					:class="{ 'hidden': !note.hiddenDesc }"
      					v-model="newDescr"
      					@keydown.enter="editDesc(index, newDescr)"
      		>
        	<span class="note__date">{{note.date}}</span>
        </div>
        
      </li>
    </ul>

  </section>

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
			},
		},
		data() {
			return {
				newTitle: '',
				newDescr: ''
			}
		},
		methods:{
			removeNote(index) {
				this.$emit('remove', index)
			},

			setTitle(title) {
				this.value = title
				return title
			},

			editTitle(index, value) {

				if (value !== '') {
					this.notes[index].title = value
					this.newTitle = value
				}

				this.notes[index].hiddenTitle = !this.notes[index].hiddenTitle
			},

			editDesc(index, value) {
				if (value !== '') {
					this.notes[index].description = value
					this.newDescr = value
				}

				this.notes[index].hiddenDesc = !this.notes[index].hiddenDesc
			}

		}
	}

</script>

<style lang="scss">
.notes {

	&__list {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		padding: 40px 0;

		
	}
}

.note {
	width: 48%;
	padding: 18px 20px;
	margin-bottom: 20px;

	background-color: #fff;
  box-shadow: 0px 0px 10px 0px rgba(38,166,154,0.8);

	transition: all .25s cubic-bezier(.02,.01,.47,1);

	@media screen and (max-width: 480px) { 
		width: 100%;

		text-align: center;
	}
	
  &:hover {
    box-shadow: 0px 0px 40px 0px rgba(38,166,154,0.8);

    transform: translate(0,-6px);
    transition-delay: 0s !important;
  }

  &:focus { transform: translate(0,-2px); }

	&.full { width: 100%; text-align: center;}

	&__title {
		font-size: 20px;
		color: #26A69A;
	}

	&__del {
		align-self: end;

		border: none;
		background: #fff;
		cursor: pointer;

		font-size: 20px;
		color: #26A69A;

		transition: .2s transform;
		
		&:focus { transform: translate(0,-2px); }

	}
	&__body {}

	&__desc {
		margin: 20px 0;
	}

	&__date {
		font-size: 14px;
		color: #999;
	}

	&__edit {
		display: block;

		padding: 10px;
		margin: 0;
		width: 100%;

		&--title { color: #26A69A; }
		&--descr { margin: 10px 0; }
	}

	&.serious { 
		box-shadow: 0px 0px 10px 0px rgba(254, 211, 48, 0.8);
		&:hover {
    	box-shadow: 0px 0px 40px 0px rgba(254, 211, 48, 0.8);
    }
	}
	&.grand { 
		box-shadow: 0px 0px 10px 0px rgba(252, 92, 101, 0.8);
		&:hover {
    	box-shadow: 0px 0px 40px 0px rgba(252, 92, 101, 0.8);
    } 
	}
}

.hidden {
	display: none;
}


</style>