<style lang="less" scoped>
.container {
    height: 100vh;
    display: flex;
    justify-content: center;
    background: url(/public/b12.458b67f.gif) 50%;
    background-size: 100% 100%;
    overflow: hidden;
}
// 登陆容器
.loginContainer {
    display: flex;
    flex-direction: column;
    margin-top: 60px;
}
.top {
    margin: 0 auto;
}
// 顶部图片
.top img {
    width: 400px;
}
.box {
    width: 432px;
    height: 340px;
    text-align: center;
    background-color: #fff;
    margin-top: 25px;
    border-radius: 3px;
}
// 标题
.box h3 {
    color: #666;
    margin: 35px auto;
    font-size: 18px;
}
.input {
    width: 70%;
    height: 40px;
    margin: 0 auto;
}
// 设置报错提醒位置
:deep(.el-form-item__error) {
    padding-left: 65px;
}
.button {
    width: 70%;
    height: 40px;
    font-size: 15px;
    margin-top: 25px;
}
</style>
<template>
    <div class="container">
        <div class="loginContainer">
            <div class="top">
                <img src="/logo.079fa1f.png" alt="" />
            </div>
            <div class="box">
                <h3>管理员登录</h3>
                <el-form ref="ruleForm" :rules="rules" :model="formData">
                    <el-form-item prop="userName">
                        <el-input
                            class="input"
                            v-model="formData.userName"
                            placeholder="请输入账号"
                            :clearable="true"
                            autofocus="true"
                        >
                            <i
                                slot="prefix"
                                class="el-input__icon el-icon-edit"
                            >
                            </i>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="userPwd">
                        <el-input
                            class="input"
                            type="password"
                            v-model="formData.userPwd"
                            placeholder="请输入密码"
                            :clearable="true"
                            @keyup.enter.native="onSubmit"
                        >
                            <i
                                slot="prefix"
                                class="el-input__icon el-icon-more-outline"
                            >
                            </i>
                        </el-input>
                    </el-form-item>
                </el-form>
                <el-button
                    class="button"
                    type="primary"
                    @click="login('ruleForm')"
                    >登 录</el-button
                >
            </div>
        </div>
    </div>
</template>
<script>
import { adminLogin } from "@/utils/manage";

export default {
    data() {
        return {
            components: { adminLogin },
            formData: {
                userName: "",
                userPwd: "",
            },
            rules: {
                userName: [
                    { required: true, message: "请输入账号", trigger: "blur" },
                    {
                        min: 5,
                        max: 12,
                        message: "不是正确的账号",
                        trigger: "blur",
                    },
                ],
                userPwd: [
                    {
                        required: true,
                        message: "密码不能为空",
                        trigger: "blur",
                    },
                    {
                        min: 3,
                        max: 12,
                        message: "密码格式不对",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    methods: {
        // 点击登陆按钮时调用
        login(ruleForm) {
            this.$refs["ruleForm"].validate((valid) => {
                if (valid) {
                    adminLogin(this.formData).then((res) => {
                        if (res.msg === "成功") {
                            sessionStorage.userName = res.data.userName;
                            sessionStorage.name = res.data.studentName;
                            sessionStorage.token = res.data.token;
                            this.$router.push("/adminHome");
                        } else {
                            alert(res.msg);
                        }
                    });
                }
            });
        },
        // 当在密码框按回车时调用,提交表单
        onSubmit(ruleForm) {
            this.$refs["ruleForm"].validate((valid) => {
                if (valid) {
                    adminLogin(this.formData).then((res) => {
                        if (res.msg === "成功") {
                            sessionStorage.userName = res.data.userName;
                            sessionStorage.name = res.data.studentName;
                            sessionStorage.token = res.data.token;
                            this.$router.push("/adminHome");
                        } else {
                            alert(res.msg);
                        }
                    });
                }
            });
        },
    },
};
</script>
