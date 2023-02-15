<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faRepeat } from '@fortawesome/free-solid-svg-icons'
import { ref } from 'vue';

library.add(faRepeat)

const props = defineProps(['card'])
const { card } = props
const flip = ref(false)

const getImage = (card) => {
  if (card['card_faces']) {
    const frontFace = card['card_faces'][0]
    return frontFace['image_uris']?.normal || frontFace['image_uris']?.small || frontFace['image_uris'].large
  }
  return card['image_uris']?.normal || card['image_uris']?.small || frontFace['image_uris'].large
}
const multiFace = card['card_faces']?.length
const backFace = card['card_faces'] && card['card_faces'][1]

const toggleFlip = () => flip.value = !flip.value

</script>

<template>
  <div class="cardContainer">
    <Transition name="flip" mode="out-in">
      <img class="cardFace" v-if="!flip" :src="getImage(card)" :alt="props.card.name">
      <img class="cardFace" v-else-if="multiFace" :src="getImage(backFace)" :alt="backFace.name">
    </Transition>
    <div class="flipCard" v-if="multiFace" @click="toggleFlip()">
      <FontAwesomeIcon icon="repeat" />
    </div>
  </div>
</template>

<style lang="less">
.flip-enter-from, .flip-leave-from {
  transform: scaleX(1)
}

.flip-enter-active {
  @keyframes flipIn {
    0% {
      transform: scaleX(0)
    }
    100% {
      transform: scaleX(1)
    }
  }
  animation: flipIn .1s ease-in;
}

.flip-leave-active {
  @keyframes flipOut {
    0% {
      transform:scaleX(1)
    }
    100% {
      transform: scaleX(0)
    }
  }
  animation: flipOut .2s ease-out
}

.flipCard {
  position: absolute;
  color: white;
  bottom: 46%;
  right: 8%;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 20px;
  width: 40px;
  height: 40px;
  display: grid;
  place-content: center;
  cursor: pointer;
}
</style>