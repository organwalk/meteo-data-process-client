<template>
    <div id="correlationChart" style="width: 100%; height: 100vh"></div>
</template>

<script setup>
import {getCorrelationChart} from "@/service/chart-service";
import {computed, defineProps, watchEffect} from "vue";

const props = defineProps({
    elements:Array,
    correlationList:Array
})
const elements = computed(()=>props.elements)
const correlationList = computed(()=> props.correlationList)

watchEffect(()=>{
    if (elements.value.length !==0 && correlationList.value.length !== 0){
        getCorrelationChart(correlationList.value, elements.value)
    }
})
</script>

<style scoped>

</style>