export default {
    updateModelList({commit}, modelList) {
        commit('setModelList', modelList)
    },
    updatePaddingZero({commit},paddingZero){
        commit('setPaddingZero', paddingZero)
    },
    updateReport({commit},report){
        commit('setReport',report)
    }
}