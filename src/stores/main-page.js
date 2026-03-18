import { defineStore } from 'pinia'

export const useMainPageStore = defineStore('main-page', {
  state: () => ({
    stationList: [],
    currentStation: '',
    currentMonth: '',
    queryType: '',
  }),
  actions: {
    setStationList(stationList) {
      this.stationList = Array.isArray(stationList) ? stationList : []
    },
    setCurrentStation(station) {
      this.currentStation = station ?? ''
    },
    setCurrentMonth(month) {
      this.currentMonth = month ?? ''
    },
    setQueryType(queryType) {
      this.queryType = queryType ?? ''
    },
  },
})
