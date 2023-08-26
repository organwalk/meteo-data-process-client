export default {
    updateStationList({commit}, stationList){
        commit('setStationList', stationList)
    },
    updateNowStation({commit}, nowStation){
        commit('setNowStation', nowStation)
    },
    updateNowPickMonth({commit}, nowPickMonth){
        commit('setNowPickMonth', nowPickMonth)
    },
    updateQueryType({commit}, queryType){
        commit('setQueryType', queryType)
    },
}