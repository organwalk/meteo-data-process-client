<template>
    <el-col :xs="8" :sm="6" :md="4" :lg="18" :xl="1" >
        <el-card id="container" shadow="never">
            <container-chart/><br/>
            <container-server/><br/>
            <container-collection/>
            <br/>
        </el-card>
    </el-col>
</template>

<script setup>
import ContainerChart from "@/components/body/main-pages/container/container-chart.vue";
import ContainerServer from "@/components/body/main-pages/container/container-server.vue";
import ContainerCollection from "@/components/body/main-pages/container/container-collection.vue";
</script>

<style scoped>
#container{
    height: 90vh;
    border-radius: 0;
    border-right: none;
    overflow-y: auto;
}
::-webkit-scrollbar {
    display: none;
}
</style>