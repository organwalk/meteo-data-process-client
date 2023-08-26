import {createStore} from "vuex";
import indexPages from "@/store/index-pages";
import mainPages from "@/store/main-pages";
import modelPredictionPages from "@/store/model-prediction-pages";

const store = createStore({
    modules:{
        indexPages,
        mainPages,
        modelPredictionPages
    }
})

export default store