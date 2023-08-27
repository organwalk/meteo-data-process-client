<template>
    <el-row >
        <el-col :xs="8" :sm="6" :md="4" :lg="24" :xl="1" >
            <el-row >
                <query-view/>
                <container-view/>
            </el-row>
        </el-col>
    </el-row>
</template>

<script setup>
import QueryView from "@/components/body/main-pages/query/query-view.vue";
import ContainerView from "@/components/body/main-pages/container/container-view.vue";
</script>

<style scoped>

</style>