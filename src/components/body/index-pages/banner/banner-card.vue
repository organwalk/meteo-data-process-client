<template>
  <br />
  <el-card
    v-for="(card, index) in config.banner.card"
    :key="card.title"
    class="banner-card"
    :style="{ animationDelay: getAnimationDelay(index) }"
  >
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="16" :lg="18" :xl="18">
        <h3>{{ card.title }}</h3>
        <span>{{ card.des }}</span>
      </el-col>
      <el-col :xs="24" :sm="24" :md="8" :lg="6" :xl="6">
        <el-card class="banner-card__image" shadow="never">
          <img :src="getImagePath(card.img)" :alt="card.title" />
        </el-card>
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup>
import config from '@/config/index-page-config.json'
import { getAnimationDelay, getImagePath } from '@/utils/utils'
</script>

<style scoped>
.banner-card {
  border-radius: 10px;
  min-height: 20vh;
  padding: 0 50px 20px 20px;
  margin-bottom: 20px;
  color: #333333;
  opacity: 0;
  transform: translateY(-20px);
  animation: slide-down 0.5s ease-in-out forwards;
}

.banner-card:hover {
  background-color: #409eff;
  color: #ffffff;
}

.banner-card span {
  font-size: 15px;
  font-weight: 300;
}

.banner-card__image {
  border: none;
  width: 100%;
  border-radius: 5px;
}

.banner-card img {
  width: 100%;
  max-height: 10vh;
  object-fit: contain;
  margin-top: 24px;
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
