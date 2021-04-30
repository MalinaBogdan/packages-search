<template>
    <div v-if="indexItem !== null">
      <div @click="closeModal" class="modal-back show"></div>
      <div class="card card-modal">
        <button @click="closeModal">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#fb5b5b" class="bi bi-x-square-fill" viewBox="0 0 16 16">
            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"/>
          </svg>
        </button>
        <div class="card-header">
          <img :src="item.owner.avatar" alt="">
          <p>{{ item.owner.name }}</p>
        </div>
        <div class="card-body">
          <h5 class="card-title">{{ item.name }}</h5>
          <p class="card-text">{{ item.description }}</p>
          <hr>
          <div class="license">
            <p>License:</p>
            <p>{{ item.license }}</p>
          </div>
          <a :href="item.owner.link" target="_blank">GitHub</a>
        </div>
      </div> 
    </div>
</template>

<script>
export default {
    props: ['indexItem', 'item'],
    methods: {
      closeModal: function() {
         this.$emit('closeModal', null)
      },
    }
}
</script>

<style lang='scss' scoped>
@import "@/assets/variables.scss";

 .modal-back.show {
    width: 100vw;
    height: 100vh;
    background: $color-dark;
    opacity: 0.9;
    display: block;
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
  }

  .card-modal {
    position: absolute;
    z-index: 150;
    left: 0;
    right: 0;
    top: 150px;
    width: 500px;
    height: fit-content;
    margin: auto;
    border: none;
    -webkit-box-shadow: 0px 0px 48px 1px #919ca9;
    box-shadow: 0px 0px 48px 1px #919ca9;

      button {
      width: fit-content;
      height: fit-content;
      border: none;
      background: none;
      padding: 0;
      position: absolute;
      right: 15px;
      top: 5px;
    }
  }

.license {
  display: flex;
  width: fit-content;
  margin: 0 auto;

  p {
    margin: 0;
  }

  p:last-child {
    font-weight: 600;
    margin-left: 5px;
  }
}
</style>
