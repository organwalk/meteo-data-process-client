<template>
    <el-dialog
            class="auth"
            v-model="openAuthView"
            width="35%"
            top="10vh"
            :show-close="false"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            destroy-on-close
    >
        <el-row>
            <el-card shadow="never" style="border-radius: 10px;margin-top: 0;" align="center" v-loading="authLoading">
                <describe-auth-des/>
                <describe-auth-service/>
            </el-card>
        </el-row>
    </el-dialog>
</template>

<script setup>
import {computed} from "vue";
import DescribeAuthDes from "@/components/body/index-pages/describe/describe-auth-des.vue";
import DescribeAuthService
    from "@/components/body/index-pages/describe/describe-auth-service.vue";
import {useStore} from "vuex";

const store = useStore()
const openAuthView = computed(()=> store.state.indexPages.keepAuthViewOpen.status)
const authLoading = computed(() => store.state.indexPages.authLoading)
</script>

<style scoped>
::v-global(.auth){
    border-radius:15px;
    background-color: transparent;
}
::v-global(.el-dialog__header) {
    display: none;
}
::v-global(.el-dialog__body){
    padding: 0;
}
</style>