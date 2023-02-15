<script setup>
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useCardsStore } from '../store/cardStore'

const cardStore = useCardsStore()

library.add(faXmark)

const prompt = ref('');
const type = ref('NAME')
const types = cardStore.filterFields.map(m => m.type)
const [ nameFilters, textFilters, typesFilters ] = cardStore.filterFields


const displayType = (type) => {
  const first = type[0]
  const rest = type.slice(1).toLowerCase()
  return (first.toUpperCase() + rest).replace('-', ' ')
}

const addFilter = () => {
  cardStore.addFilterField(type.value, prompt.value)
  prompt.value = ''
}

const search = () => {
  cardStore.searchCards()
}

</script>

<template>
  <form @submit.prevent="addFilter">
    <div class="formatSelector">
      <span>Format</span>
    </div>
    <div class="row">
      <input type="text" name="search" id="searchBar" v-model="prompt">
      <select name="type" id="type" v-model="type" required>
        <option v-for="filterType of types" :value="filterType">{{ displayType(filterType) }}</option>
      </select>
      <button type="submit">Add</button>
    </div>
    <div class="colors">
      <img src="/W.png" class="W" alt="White" @click="cardStore.toggleColor('W')" :class="{'enabled': cardStore.colorFilter['W']}">
      <img src="/U.png" class="U" alt="Blue" @click="cardStore.toggleColor('U')" :class="{'enabled': cardStore.colorFilter['U']}">
      <img src="/B.png" class="B" alt="Black" @click="cardStore.toggleColor('B')" :class="{'enabled': cardStore.colorFilter['B']}">
      <img src="/R.png" class="R" alt="Red" @click="cardStore.toggleColor('R')" :class="{'enabled': cardStore.colorFilter['R']}">
      <img src="/G.png" class="G" alt="Green" @click="cardStore.toggleColor('G')" :class="{'enabled': cardStore.colorFilter['G']}">
      <img src="/C.png" class="C" alt="Colorless" @click="cardStore.toggleColor('C')" :class="{'enabled': cardStore.colorFilter['C']}">
      <img src="/M.png" class="M" alt="Multicolored" @click="cardStore.toggleColor('M')" :class="{'enabled': cardStore.colorFilter['M']}">
    </div>
    <div class="filters">
      <div class="chip" v-for="(filter, index) in nameFilters.filters" :key="index">
        <span>{{ filter.value }}</span>
        <span class="filterType NAME">{{ 'NAME' }}</span>
        <FontAwesomeIcon icon="xmark" @click="cardStore.removeFilterField('NAME', index)" />
      </div>
      <div class="chip" v-for="(filter, index) in textFilters.filters" :key="index">
        <span>{{ filter.value }}</span>
        <span class="filterType TEXT">{{ 'TEXT' }}</span>
        <FontAwesomeIcon icon="xmark" @click="cardStore.removeFilterField('TEXT', index)" />
      </div>
      <div class="chip" v-for="(filter, index) in typesFilters.filters" :key="index">
        <span>{{ filter.value }}</span>
        <span class="filterType TYPES">{{ 'TYPES' }}</span>
        <FontAwesomeIcon icon="xmark" @click="cardStore.removeFilterField('TYPES', index)" />
      </div>
    </div>
    <button class="clear" @click.prevent="cardStore.clearFilters()">Clear</button>
    <button @click.prevent="search">Search</button>
  </form>
</template>

<style lang="less">
@import '../assets/palette.less';
@import '../assets/base.css';

form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.colors {
  display: flex;
  flex-direction: row;
  gap: 16px;
  justify-content: space-between;
  
  img {
    opacity: .3;
    width: 35px;

    &.enabled {
      opacity: 1;
    }
    &:hover {
      opacity: .8;
    }
    transition: opacity .1s ease-in;
  }
}

.filters {
  display: flex;
  flex-direction: row;
  gap: 16px;
  flex-wrap: wrap;

  .chip {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    background-color: var(--color-background-mute);
    padding: 4px;
    border-radius: 8px;

    .filterType {
      &.NAME {
        background-color: @contrast;
      }
      &.TEXT {
        background-color: #b084e2;
      }
      &.ALL {
        background-color: #e0e283;
      }
      &.TYPES {
        background-color: #83e2d8;
      }
      padding: 3px 8px;
      border-radius: 8px;
      color: var(--color-background-mute);
      font-size: 0.8em;
    }

    svg {
      cursor: pointer;
      padding: 4px;
    }

    span {
      flex: 1;
    }
  }
}

input,
select {
  appearance: none;
  border: 0;
  padding: 12px 6px;
  opacity: 0.8;
  border-radius: 8px;

  &[type="text"] {
    flex: 1;
  }

  &:focus {
    opacity: 1;
  }
}


select {
  flex-basis: 90px;
}

.row {
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 16px;
}

button {
  appearance: none;
  border: 0px;
  background-color: @primaryColor;
  font-weight: 800;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: @primaryLighter;
  }

  &:active {
    -webkit-box-shadow: inset 0px 0px 12px -4px rgba(0, 0, 0, 0.6);
    -moz-box-shadow: inset 0px 0px 12px -4px rgba(0, 0, 0, 0.6);
    box-shadow: inset 0px 0px 12px -4px rgba(0, 0, 0, 0.6);
  }

  &.clear {
    background-color: var(--color-background-mute);
    color: var(--color-text)
  }

  transition: background-color .1s ease-in
}
</style>