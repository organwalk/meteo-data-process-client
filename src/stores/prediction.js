import { defineStore } from 'pinia'

export const usePredictionStore = defineStore('prediction', {
  state: () => ({
    modelList: [],
    predictionList: [],
    paddingZero: true,
    report: true,
  }),
  actions: {
    setModelList(modelList) {
      this.modelList = Array.isArray(modelList) ? modelList : []
    },
    setPredictionList(predictionList) {
      this.predictionList = Array.isArray(predictionList) ? predictionList : []
    },
    setPaddingZero(value) {
      this.paddingZero = Boolean(value)
    },
    setReport(value) {
      this.report = Boolean(value)
    },
  },
})
