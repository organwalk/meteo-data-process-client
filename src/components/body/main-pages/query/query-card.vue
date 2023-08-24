<template>
    <el-card :id="type === card.eng_type ? 'click-query-tab' : 'query-card'"
             v-for="card in config.query.card"
             :key="card" @click="toQuery(card.eng_type)" shadow="hover">
        <span v-html="card.eng_type"/>
        <h2 v-html="card.cn_type"/>
        <h5 v-html="card.cn_des"/>
    </el-card>
</template>

<script setup>
import config from "@/config/main-page-config.json";
import {ref} from "vue";

const type = ref(null)

const toQuery = (val) => {
    type.value = val
}
</script>

<style scoped>
#query-card{
    border-radius: 15px;
    margin-bottom: 20px;
    color: #333333;
    height: 27vh;
}
#query-card:hover{
    background-color: #409EFF;
    color: #ffffff;
    height: 30vh;
}
#query-card span{
    font-size: 15px;
    font-weight: lighter;
}
#query-card h2{
    margin-top: 0;
    font-weight: bolder;
}
#query-card h5{
    font-weight: lighter;
    line-height: 1.5rem;
}
#click-query-tab{
    border-radius: 15px;
    margin-bottom: 20px;
    background-color: #409EFF;
    color: #ffffff;
    height: 30vh;
}
#click-query-tab span{
    font-size: 15px;
    font-weight: lighter;
}
#click-query-tab h2{
    margin-top: 0;
    font-weight: bolder;
}
#click-query-tab h5{
    font-weight: lighter;
    line-height: 1.5rem;
}
</style>