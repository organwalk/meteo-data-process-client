<template>
    <el-row>
        <el-card shadow="never" id="data-analyze-container" body-style="padding-left:0;padding-right:0">
            <el-row>
                <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1"/>
                <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22">
                    <container-view/>
                </el-col>
                <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1"/>
            </el-row>
        </el-card>
    </el-row>


</template>

<script setup>
import ContainerView from "@/components/body/data-analyze-pages/container/container-view.vue";

</script>

<style scoped>
#data-analyze-container{
    border-left: none;
    border-right: none;
    border-bottom: none;
    width: 100%;
}
</style>