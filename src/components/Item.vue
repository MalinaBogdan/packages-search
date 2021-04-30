<template>
    <div class="card mb-3" @click="openModal(index)">
        <div class="card-header">
          <img :src="item.owner.avatar" alt="">
          <p>{{ item.owner.name }}</p>
        </div>
        <div class="card-body">
          <h5 class="card-title">{{ item.name }}</h5>
          <p class="card-text">{{ item.description }}</p>
        </div>
    </div>
</template>

<script>
import Modal from '@/components/Modal'

export default {
   components: {
     Modal, 
   },
    props: ['item', 'index'],
    methods: {
        openModal: function(i) {
            this.$emit('openModal', i)
            console.log(i)
        }
    }
}
</script>

<style lang='scss'>
@import "@/assets/variables.scss";

.card {
    cursor: pointer;
    width: calc(50% - 10px);

    .card-header {
        background: $color-dark;
        display: flex;
        padding: 10px;

        img {
            vertical-align: middle;
            width: 70px;
            height: 70px;
            object-fit: contain;
            border-radius: 50px;
        }

        p {
            margin: 0 0 0 30px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-left: 20px;
            font-size: 24px;
            font-weight: 600;
            color: white;
        }
    }
}

@media only screen and (max-width: 600px) {
    .card {
        width: 100%;
        margin: 0 auto;
    }
}
</style>
