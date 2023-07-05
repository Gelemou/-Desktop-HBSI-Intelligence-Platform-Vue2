<style lang="less" scoped>
// 左侧menu样式
.leftMenu {
    width: 213px;
    height: 576px;
    background-color: #3b424a;
}
// menu顶部的logo的样式
.top {
    width: 213px;
    height: 60px;
    display: flex;
    align-items: center;
}
.topImage {
    width: 40px;
    height: 40px;
    padding: 0 10px;
}
.topTitle {
    font-size: 16px;
    font-weight: bold;
    color: #fff;
}
// 深度选择器修改menu-item样式
/deep/.el-menu-item {
    display: flex;
    align-items: center;
    height: 48px;
    color: rgb(200, 205, 213) !important;
    // 修改el-icon的大小
    i {
        font-size: 24px;
    }
}
// 当menu-item被选中时
/deep/.is-active {
    color: #fff !important;
    background-color: #0084fd !important;
}
// menu-item标题
.leftList span {
    font-size: 15px;
    padding-left: 6px;
}
</style>
<template>
    <div class="leftMenu">
        <div class="top">
            <img class="topImage" src="/hbsi.png" alt="" />
            <span class="topTitle">第二课堂智慧平台</span>
        </div>
        <div class="leftList">
            <el-menu
                background-color="#3b424a"
                text-color="#fff"
                :default-active="tabIndex"
                @select="getTabIndex($event)"
            >
                <el-menu-item index="1">
                    <i class="el-icon-user"></i>
                    <span>辅导员配置</span>
                </el-menu-item>
                <el-menu-item index="2">
                    <i class="el-icon-refresh-left"></i>
                    <span>审核退回</span>
                </el-menu-item>
                <el-menu-item index="3">
                    <i class="el-icon-s-check"></i>
                    <span>审核管理</span>
                </el-menu-item>
                <el-menu-item index="4">
                    <i class="el-icon-collection"></i>
                    <span>分数统计</span>
                </el-menu-item>
                <el-menu-item index="5">
                    <i class="el-icon-s-data"></i>
                    <span>数字画像</span>
                </el-menu-item>
                <el-menu-item index="6" @click="logout">
                    <i class="el-icon-switch-button"></i>
                    <span>退出</span>
                </el-menu-item>
            </el-menu>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            tabIndex: "1", // 当前tab页
        };
    },
    mounted() {},
    methods: {
        // 点击退出时调用,将sessionstorage清空,并返回登陆页
        logout() {
            sessionStorage.clear();
            this.$router.push("/adminLogin");
        },
        // 当切换menu-item时调用
        getTabIndex(index) {
            this.tabIndex = index;
            // 子传父(adminHomeView) 将当前tabIndex传给父组件
            this.$emit("chuan", this.tabIndex);
            // 在main.js中创建的实例对象Index,将tabIndex传进去
            this.Index.$emit("getTabindex", this.tabIndex);
        },
    },
};
</script>
