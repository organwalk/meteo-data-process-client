<template>
    <el-dialog
            class="auth"
            v-model="openAuthView"
            width="35%"
            top="10vh"
            :show-close="false"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
    >
        <el-row>
            <el-card shadow="never" style="border-radius: 15px;margin-top: 0;" align="center" v-loading="authLoading">
                <br/>
                <el-row>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <img src="@/assets/auth.png" style="width: 40%" alt="not photo">
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <span style="font-weight: bolder;font-size: 30px;font-family: 微软雅黑,system-ui">
                            气象数据分析预测系统
                        </span>
                    </el-col>
                </el-row>
                <br/>
                <el-row>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <span style="font-weight: bolder;font-size: 20px;font-family: 微软雅黑,system-ui">登录</span>
                    </el-col>
                </el-row>
                <br/>
                <el-row>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <span>请使用您在本系统注册的账号进行登录</span>
                    </el-col>
                </el-row>
                <el-card shadow="never" style="border: none" class="xeno-handle-area">
                    <el-row>
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" center>
                            <el-input maxlength="11"
                                      show-word-limit
                                      autofocus
                                      v-model="username"
                                      placeholder="请输入用户名"
                                      :prefix-icon="User"
                                      @keyup.enter="login()"
                                      size="large"/>
                        </el-col>
                    </el-row>
                    <br/>
                    <el-row>
                        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" align="left">
                            <el-popover
                                    placement="bottom"
                                    :width="200"
                                    trigger="click"
                            >
                                <template #reference>
                                    <el-button text style="color: #2C6AE3">了解详情</el-button>
                                </template>
                                <span>授权服务由<strong>信创技术下气象数据分析预测系统--用户服务</strong>提供</span>
                            </el-popover>
                        </el-col>
                        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" align="right">
                            <el-button plain @click="closeAuthView()">取消</el-button>
                            <el-button type="primary" color="#2C6AE3" @click="closeAuthView()">登录</el-button>
                        </el-col>
                    </el-row>
                </el-card>
            </el-card>
        </el-row>
    </el-dialog>
</template>

<script setup>
import {computed, defineProps, defineEmits} from "vue";
import {
    User
} from '@element-plus/icons-vue'


const props = defineProps({
    openAuthView:Boolean
})
const emit = defineEmits(['closeAuthView'])

const openAuthView = computed(()=>props.openAuthView)
const closeAuthView = () => {
    emit('closeAuthView', false)
}

const authLoading = false

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