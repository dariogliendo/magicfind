<script setup>
import Filter from "@/components/Filter.vue"
import Card from '@/components/Card.vue'
import { useCardsStore } from "../store/cardStore";
const cardStore = useCardsStore()


</script>
<template>
  <div class="container">
    <Filter />
    <div class="cardsArea">
      <div class="card" v-for="card of cardStore.cards">
        <Card :card="card"/>
      </div>
    </div>
  </div>
</template>
<style lang="less">
.container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.cardsArea {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
  align-items: center;
  justify-items: center;

  .card {
    img {
      width: 220px;
    }
  }
}
</style>