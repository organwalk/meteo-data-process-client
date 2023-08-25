<template>
    <el-col :xs="8" :sm="6" :md="4" :lg="18" :xl="1" >
        <el-card id="container" shadow="never">
            <div class="container-chart-server" v-if="queryStore === ''">
                <container-chart/><br/>
                <container-server/><br/>
            </div>
            <container-query class="container-query" v-if="queryStore !== ''"/>
            <br/>
        </el-card>
    </el-col>
</template>

<script setup>
import ContainerChart from "@/components/body/main-pages/container/container-chart.vue";
import ContainerServer from "@/components/body/main-pages/container/container-server.vue";
import ContainerQuery from "@/components/body/main-pages/container/container-query.vue";
import {computed} from "vue";
import {useStore} from "vuex";

const store = useStore()
const queryStore = computed(()=>store.state.mainPages.queryType)
</script>

<style scoped>
#container{
    height: 90vh;
    border-radius: 0;
    border-right: none;
    overflow-y: auto;
    background-color: #f6f8fa;
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