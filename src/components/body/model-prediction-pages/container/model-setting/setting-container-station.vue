<template>
    <el-form-item label="气象站">
        <el-select v-model="station" style="width: 100%" >
            <el-option
                    v-for="item in props.stationList"
                    :key="item.station"
                    :label="item.name"
                    :value="item.station"
            />
        </el-select>
    </el-form-item>
</template>

<script setup>
import {computed, defineProps, defineEmits, watchEffect} from 'vue'
const props = defineProps({
    station:String,
    stationList:Array
})
const station = computed(()=>props.station)
const emit = defineEmits(['getNewStation'])
watchEffect(() => {
  if (station.value){
    emit('getNewStation', station.value)
  }
})
</script>

<style scoped>

</style>