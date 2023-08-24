<template>
    <br/>
    <el-card class="banner-card"
             v-for="(card, index) in config.banner.card"
             :key="card"
             :style="{ 'animation-delay': getAnimationDelay(index) }"
    >
        <el-row :gutter="20">
            <el-col :xs="8" :sm="6" :md="4" :lg="18" :xl="1" >
                <h3 v-html="card.title" />
                <span v-html="card.des"/>
            </el-col>
            <el-col :xs="8" :sm="6" :md="4" :lg="6" :xl="1" >
                <el-card style="border: none;width: 15vw;border-radius: 30px" shadow="never">
                    <img :src=getImagePath(card.img) alt="404"/>
                </el-card>
            </el-col>
        </el-row>
    </el-card>
</template>

<script setup>
import config from "@/config/index-page-config.json"
import {getImagePath, getAnimationDelay} from "@/utils/utils"

</script>

<style scoped>
.banner-card{
    border-radius: 15px;
    height: 20vh;
    padding-left: 20px;
    padding-right: 50px;
    padding-bottom: 20px;
    margin-bottom: 20px;
    color: #333333;
    opacity: 0;
    transform: translateY(-20px);
    animation: slide-down 0.5s ease-in-out forwards;
}
.banner-card:hover {
    height: 23vh;
    background-color: #409EFF;
    color: #fff;
}
.banner-card span{
    font-size: 15px;
    font-weight: lighter;
}
.banner-card img {
    height: 10vh;
    margin-top: 5vh;
}
@keyframes slide-down {
    0% {
        opacity: 0;
        transform: translateY(-20px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>