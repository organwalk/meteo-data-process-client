<template>
  <el-form-item label="气象站">
    <el-select :model-value="modelValue" style="width: 100%" @update:model-value="emit('update:modelValue', $event)">
      <el-option
        v-for="item in stationList"
        :key="item.station"
        :label="item.name"
        :value="item.station"
      />
    </el-select>
  </el-form-item>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  stationList: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['update:modelValue'])
</script>
