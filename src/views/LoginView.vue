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
                <h3>学生登录</h3>
                <el-form ref="ruleForm" :rules="rules" :model="formData">
                    <el-form-item prop="xh">
                        <el-input
                            class="input"
                            v-model="formData.xh"
                            placeholder="请输入学号"
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
                    <el-form-item prop="studentPwd">
                        <el-input
                            class="input"
                            type="password"
                            v-model="formData.studentPwd"
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
import { studentLogin } from "@/utils/student";

export default {
    data() {
        return {
            components: { studentLogin },
            formData: {
                xh: "",
                studentPwd: "",
            },
            rules: {
                xh: [
                    { required: true, message: "请输入学号", trigger: "blur" },
                    {
                        min: 9,
                        max: 9,
                        message: "不是正确的学号",
                        trigger: "blur",
                    },
                ],
                studentPwd: [
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
                    studentLogin(this.formData).then((res) => {
                        if (res.msg === "成功") {
                            sessionStorage.xh = res.data.xh;
                            sessionStorage.name = res.data.studentName;
                            sessionStorage.token = res.data.token;
                            this.$router.push("/");
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
                    studentLogin(this.formData).then((res) => {
                        if (res.msg === "成功") {
                            sessionStorage.xh = res.data.xh;
                            sessionStorage.name = res.data.studentName;
                            sessionStorage.token = res.data.token;
                            this.$router.push("/");
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
