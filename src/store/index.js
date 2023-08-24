import {createStore} from "vuex";
import indexPages from "@/store/index-pages";
import mainPages from "@/store/main-pages";

const store = createStore({
    modules:{
        indexPages,
        mainPages
    }
})

export default store