<template>
    <section>
      <div class="input-group mb-5">
        <input v-model="searchQuery" v-on:keyup.enter="onSearch" type="search" class="form-control">
        <input @click="onSearch" type="submit" value="search" class="btn btn-outline-secondary" >
      </div>
      <div v-if="!items.length" >
        <p>The packages list is empty.</p>
      </div>
      <div v-else class="items-wrap">
        <Item
          v-for="(item, index) in items"
          :key="item.id"
          :item="item"
          :index="index"
          @openModal="changeModal"
        /> 
       </div>
      <div v-if="items.length" class="pagination">
        <button 
          :class="{ active: index === currentlyPage }"
          v-for="(page, index) in pagination" 
          :key="page.id" 
          @click="changePage(index)"
        >
          {{ page }}
        </button>
      </div>
      <Modal
        :item="items[indexItem]"
        :indexItem="indexItem"
        @closeModal="changeModal"
      />
    </section>
</template>

<script>
import searchPackages from '@/utils/searchPackages.js'
import Item from '@/components/Item'
import Modal from '@/components/Modal'

export default {
   components: {
     Item, Modal
   },
   data() {
        return {
          indexItem: null,
          searchQuery: '',
          items: [],
          indexItem: null,
          currentlyPage: 0,
          pagination: []
        }
    },
    methods: {
        onSearch: async function() {
          const packages = await searchPackages(this.searchQuery, this.currentlyPage * 10)
          for(let i = 0; i < packages.response.nbPages / 10;) {
            this.pagination[i] = ++i
          }
          this.items = packages.response.hits
          console.log( this.pagination)
          console.log(packages)
        },
        changeModal: function(i) {
          this.indexItem = i
          console.log(i)
        },
        changePage: function(i) {
          this.currentlyPage = i
          this.onSearch()
        }
    }
}
</script>

<style lang='scss' scoped>
@import "@/assets/variables.scss";

section {
    width: calc(100% - 40px);
    max-width: 1000px;
    margin: 50px auto 30px;

    .items-wrap {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }

    .input-group {
      input:focus {
        border: 1px solid $color-blue; 
        box-shadow: none;
      }
    }

    .pagination {
      display: flex;
      justify-content: center;
      margin-top: 20px;

      button {
        display: block;
        border: 1px solid $color-dark;
        background: white;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        margin: 0 5px;
        color: $color-dark;
        font-weight: 600;
      }
      button.active {
        background: #2c3e50;
        color: white;
      }
    }
  }
</style>
