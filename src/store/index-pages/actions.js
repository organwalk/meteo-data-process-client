export default {
    updateKeepAuthViewOpen({commit}, keepAuthViewOpen){
        commit('setKeepAuthViewOpen', keepAuthViewOpen)
    },
    updateAuthLoading({commit}, authLoading){
        commit('setAuthLoading', authLoading)
    }
}