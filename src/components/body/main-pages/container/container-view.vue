<template>
    <el-col :xs="8" :sm="6" :md="4" :lg="18" :xl="1" >
        <el-card id="container" shadow="never" v-if="queryStore === ''">
            <chart-view/><br/>
            <server-view/><br/>
        </el-card>
        <el-card id="container" shadow="never" v-if="queryStore !== ''">
            <query-view class="container-query" /><br/>
        </el-card>
    </el-col>
</template>

<script setup>
import ChartView from "@/components/body/main-pages/container/chart/chart-view.vue";
import ServerView from "@/components/body/main-pages/container/server/server-view.vue";
import QueryView from "@/components/body/main-pages/container/query/query-view.vue";
import {computed} from "vue";
import {useStore} from "vuex";

const store = useStore()
const queryStore = computed(()=>store.state.mainPages.queryType)
</script>

<style scoped>
#container{

    border-radius: 0;
    border-right: none;
    border-left: none;
    overflow-y: auto;
    border-bottom: none;
}
::-webkit-scrollbar {
    display: none;
}
.container-query {
    opacity: 0;
    transform: translateY(50%);

    animation-name: slideInFromBottom;
    animation-duration: 1s;
    animation-timing-function: ease-in-out;
    animation-fill-mode: forwards;

    transition-property: opacity, transform;
    transition-duration: 0.5s;
}

@keyframes slideInFromBottom {
    0% {
        opacity: 0;
        transform: translateY(50%);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>