<template>
  <section class="tools__search search">

      <div class="search__icon">
        <svg width="24" height="24">
          <use xlink:href="../assets/img/sprite.svg#search"></use>
        </svg>
      </div>
    	
      <input class="search__input" type="text" :placeholder="placeholder" v-model="search"/>
  </section>
  <!-- /search -->
</template>

	
<script>
	export default {
		props: {
			value: {
				type: String,
				required: true
			},
			placeholder: {
				type: String,
				default: 'Search'
			}
		},
		data() {
			return { search: this.value }
		},
		watch: {
			search(val) {
				this.$emit('search', val)
			}	
		}
	}
</script>


<style lang="scss" scoped>
  .search {
    position: relative;

    &__icon {
      position: absolute;
      top: 0px;
      bottom: 0px;
      left: 0px;

      display: flex;
      align-items: center;
      
      height: 100%;
      padding-left: 16px;
      padding-right: 16px;
    }

    &__input {
      height: auto;
      min-width: 400px;
      padding: 16px 16px 16px 56px;
      margin-bottom: 0px;

      border-radius: 30px;

      color: #909399;
      font-size: 16px;

      @media screen and (max-width: 480px) {
        min-width: unset;
        margin-right: 15px;
      }
    }
  }
</style>
