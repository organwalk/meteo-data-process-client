<template>
    <el-col :xs="8" :sm="6" :md="4" :lg="12" :xl="1" >
        <el-card class="banner" shadow="never">
            <el-row>
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <body-index-pages-banner-card/>
                </el-col>
            </el-row>
        </el-card>
    </el-col>
</template>

<script setup>
import BodyIndexPagesBannerCard from "@/components/body/index-pages/body-index-pages-banner-card.vue";
</script>

<style scoped>
.banner{
    height: 90vh;
    border: none;
    margin-left: 5vw;
    margin-right: 3vw;
    font-family: 微软雅黑,serif;
    user-select: none;
    overflow-y: auto;
}
::-webkit-scrollbar {
    display: none;
}
</style>