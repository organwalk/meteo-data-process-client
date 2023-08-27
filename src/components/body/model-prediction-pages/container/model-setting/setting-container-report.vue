<template>
    <el-carousel height="200px" direction="vertical" :autoplay="true" :loop="true" :interval="5000">
        <el-carousel-item>
            <el-divider content-position="left">短期模型评估报告</el-divider>
            <el-descriptions size="small" :column="3">
                <el-descriptions-item label="MSE" :span="1"><br/>76.02</el-descriptions-item>
                <el-descriptions-item label="R_MSE" :span="1"><br/>1.36</el-descriptions-item>
                <el-descriptions-item label="MAE" :span="1"><br/>5.46</el-descriptions-item>
                <el-descriptions-item label="Loss" :span="1"><br/>13.06</el-descriptions-item>
                <el-descriptions-item label="Validation Loss" :span="2"><br/>20.03</el-descriptions-item>
                <el-descriptions-item label="Last Model Evaluation Time" :span="4"><br/>2023-03-21</el-descriptions-item>
            </el-descriptions>
        </el-carousel-item>
        <el-carousel-item>
            <el-divider content-position="left">长期模型评估报告</el-divider>
            <el-descriptions size="small" :column="3">
                <el-descriptions-item label="MSE" :span="1"><br/>76.02</el-descriptions-item>
                <el-descriptions-item label="R_MSE" :span="1"><br/>1.36</el-descriptions-item>
                <el-descriptions-item label="MAE" :span="1"><br/>5.46</el-descriptions-item>
                <el-descriptions-item label="Loss" :span="1"><br/>13.06</el-descriptions-item>
                <el-descriptions-item label="Validation Loss" :span="2"><br/>20.03</el-descriptions-item>
                <el-descriptions-item label="Last Model Evaluation Time" :span="4"><br/>2023-03-21</el-descriptions-item>
            </el-descriptions>
        </el-carousel-item>
    </el-carousel><br/>
</template>

<script setup>

</script>

<style scoped>

</style>