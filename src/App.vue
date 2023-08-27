<template>
    <el-card id="box" body-style="padding-left:0;padding-right:0;padding-bottom:0" >
        <client-header/>
        <router-view/>
    </el-card>
</template>

<script setup>
import ClientHeader from "@/components/headers/client-header.vue";
import {nextTick,watch,} from "vue";
import {useStore} from "vuex";

const store= useStore()
watch(() => store.state.mainPages.queryType, (newVal, oldVal) => {
    if (newVal !== oldVal) {
        nextTick(() => {
            window.scrollTo(0, 0);
        });
    }
});

</script>

<style>
body{
    overflow-y: auto !important;
    padding-right: 0 !important;
}
#box{
    width: 100%;border-radius: 15px;
}
</style>


