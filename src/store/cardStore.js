import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useCardsStore = defineStore('cards', {
  state: () => ({
    cards: [],
    filterFields: [
      {
        type: 'NAME',
        filters: []
      },
      {
        type: 'TEXT',
        filters: [],
      },
      {
        type: 'TYPES',
        filters: [],
      }
    ],
    colorFilter: {
      W: false,
      U: false,
      B: false,
      R: false,
      G: false,
      C: false,
      M: false,
    }
  }),
  actions: {
    async searchCards() {
      try {
        this.cards = []
        const nameFilters = this.filterFields[0].filters.map(m => 'name:'+m.value)
        const query = nameFilters.join(' OR ')
        const { data } = await axios.get(`https://api.scryfall.com/cards/search?q=${query}`)
        this.cards = data.data
        console.log(this.cards)
      } catch (error) {
        console.error(error)
      }
    }, 
    addFilterField(type, value) {
      const typeFilters = this.filterFields.find(f => f.type === type)
      typeFilters.filters.push({exclude: false, value: value})
    },
    toggleColor(color) {
      this.colorFilter[color] = !this.colorFilter[color]
    },
    removeFilterField(type, index) {
      const typeFilters = this.filterFields.find(f => f.type === type)
      typeFilters.filters.splice(index, 1)
    },
    clearFilters() {
      for (const field of this.filterFields) field.filters = []
      this.cards = []
    },
  },
})
