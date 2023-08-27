<template>
    <el-col :xs="8" :sm="6" :md="4" :lg="6" :xl="1" >
        <el-card id="query" shadow="never">
            <query-card/>
        </el-card>
    </el-col>
</template>

<script setup>
import QueryCard from "@/components/body/main-pages/query/query-card.vue";

</script>

<style scoped>
#query{
    border-radius: 0;
    border-left: none;
    overflow-y: auto;
    font-family: 微软雅黑,system-ui;
    user-select: none;
}
::-webkit-scrollbar {
    display: none;
}

</style>