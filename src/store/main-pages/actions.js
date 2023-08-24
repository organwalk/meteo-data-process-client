export default {
    updateResStatus({commit}, resStatus){
        commit('setResStatus', resStatus)
    },
    updateStationList({commit}, stationList){
        commit('setStationList', stationList)
    }
}