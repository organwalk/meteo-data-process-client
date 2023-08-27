<template>
    <el-col :xs="8" :sm="6" :md="4" :lg="8" :xl="1" >
        <el-card id="server-card" shadow="hover">
            <span class="server-card-title" v-html="props.cardData.title"/><br/><br/>
            <span class="server-card-content" v-html="props.cardData.content"/>
        </el-card>
    </el-col>
</template>

<script setup>
import {defineProps} from "vue";
const props = defineProps({
    cardData:{
        title:'',
        content:''
    }
})
</script>

<style scoped>
#server-card {
    border-radius: 10px;
    font-family: 微软雅黑,serif;
    user-select: none;
    margin-top: 4vh;
    height: 15vh;
}
.server-card-title{
    font-weight: bolder;
    font-size: large;
}
.server-card-content{
    font-weight: lighter;
}
</style>