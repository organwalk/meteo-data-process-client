<template>
    <el-card shadow="never" style="border: none">
        <el-row>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" center>
                <form>
                    <el-input maxlength="11"
                              show-word-limit
                              v-model="authServiceData.auth.username"
                              v-show="!authServiceData.showPassword"
                              :placeholder="config.describe.auth.service.username_place"
                              :prefix-icon="User"
                              @keyup.enter="authServiceData.showPassword = checkOnlyEngAndNumber(authServiceData.auth.username)"
                              size="large"/>
                    <el-input
                              class="password-input"
                              :class="{ 'slide-in-from-right': authServiceData.showPassword }"
                              v-model="authServiceData.auth.password"
                              v-show="authServiceData.showPassword"
                              :placeholder="config.describe.auth.service.password_place"
                              :prefix-icon="Check"
                              @keyup.enter="loginToSystem()"
                              type="password"
                              show-password
                              size="large"/>
                </form>
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
                        <el-button text style="color: #2C6AE3" v-html="config.describe.auth.service.detail_button"/>
                    </template>
                    <span v-html="config.describe.auth.service.detail_des"/>
                </el-popover>
            </el-col>
            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" align="right">
                <el-button @click="store.dispatch('updateKeepAuthViewOpen', false)"
                           v-html="config.describe.auth.service.cancel_button" plain />
                <el-button @click="authServiceData.showPassword = checkOnlyEngAndNumber(authServiceData.auth.username)"
                           v-show="!authServiceData.showPassword"
                           v-html="config.describe.auth.service.next_button" type="primary" color="#2C6AE3" />
                <el-button @click="authToSystem()"
                           v-show="authServiceData.showPassword"
                           v-html="auth_button" type="primary" color="#2C6AE3" />
            </el-col>
        </el-row>
    </el-card>

</template>

<script setup>
import {User, Check} from "@element-plus/icons-vue";
import config from "@/config/index-page-config.json";
import {computed, reactive, ref, watchEffect} from "vue";
import {useStore} from "vuex";
import {checkOnlyEngAndNumber} from "@/utils/utils";
import {loginToSystem, registerToSystem} from "@/service/auth-service";

const store = useStore()
const authServiceData = reactive({
    auth:{
        username:'',
        password:''
    },
    showPassword:false,
    isLogin:false
})
const isLogin = computed(()=>authServiceData.isLogin)
watchEffect(()=>{
    if (isLogin.value){
        store.dispatch('updateAuthLoading',true)
    }else {
        store.dispatch('updateAuthLoading',false)
    }
})
const auth_button = ref()
const type = store.state.indexPages.keepAuthViewOpen.type
if (type === "login"){
    auth_button.value = config.describe.auth.service.login_button
}else if (type === "register"){
    auth_button.value = config.describe.auth.service.register_button
}
const authToSystem = () => {
    if (type === "login") {
        loginToSystem(authServiceData)
    }else if (type === "register"){
        registerToSystem(authServiceData)
    }
}

</script>

<style scoped>
.password-input {
    position: relative;
    overflow: hidden;
}

.slide-in-from-right {
    animation: slideInFromRight 0.5s forwards;
}

@keyframes slideInFromRight {
    from {
        transform: translateX(100%);
    }
    to {
        transform: translateX(0);
    }
}
</style>