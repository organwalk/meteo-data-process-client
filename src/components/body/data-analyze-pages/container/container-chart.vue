<template>
    <div id="correlationChart" style="width: 100%; height: 100vh"></div>
</template>

<script setup>
import {getCorrelationChart} from "@/service/chart-service";
import {computed, defineProps, onMounted, watchEffect} from "vue";

const props = defineProps({
    elements:Array,
    correlationList:Array
})
const elements = computed(()=>props.elements)
onMounted(()=>{
    getCorrelationChart()
})
watchEffect(()=>{
    if (elements.value.length !==0){
        console.log(elements.value)
        getCorrelationChart()
    }
})
</script>

<style scoped>

</style>