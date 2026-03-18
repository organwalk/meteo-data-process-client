<template>
  <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
    <el-card id="server-card" shadow="hover">
      <span class="server-card-title">{{ cardData.title }}</span>
      <br /><br />
      <span class="server-card-content">{{ cardData.content }}</span>
    </el-card>
  </el-col>
</template>

<script setup>
defineProps({
  cardData: {
    type: Object,
    default: () => ({
      title: '',
      content: '',
    }),
  },
})
</script>

<style scoped>
#server-card {
  border-radius: 10px;
  font-family: 'Microsoft YaHei', serif;
  user-select: none;
  margin-top: 4vh;
  min-height: 15vh;
}

.server-card-title {
  font-weight: 700;
  font-size: large;
}

.server-card-content {
  font-weight: 300;
}
</style>
