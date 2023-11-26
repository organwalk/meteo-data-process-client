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
import {defineProps, defineEmits, watchEffect, ref} from 'vue'
const props = defineProps({
    station:String,
    stationList:Array
})
const emit = defineEmits(['getStation'])
const station = ref()
watchEffect(() => {
  if (props.station){
    station.value = props.station
  }
})
watchEffect(() => {
  if (station.value){
    emit('getStation', station)
  }
})
</script>

<style scoped>

</style>