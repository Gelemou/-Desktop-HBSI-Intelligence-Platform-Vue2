<style lang="less" scoped>
.leftMenu {
    width: 213px;
    height: 576px;
    background-color: #3b424a;
}
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
/deep/.el-menu-item {
    display: flex;
    align-items: center;
    height: 48px;
    color: rgb(200, 205, 213) !important;
    i {
        font-size: 24px;
    }
}
/deep/.is-active {
    color: #fff !important;
    background-color: #0084fd !important;
}
/* 列表标题 */
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
            <el-menu background-color="#3b424a" text-color="#fff">
                <el-menu-item index="1">
                    <i class="el-icon-s-flag"></i>
                    <span>思想政治素养</span>
                </el-menu-item>
                <el-menu-item index="2">
                    <i class="el-icon-s-flag"></i>
                    <span>职业技能特长</span>
                </el-menu-item>
                <el-menu-item index="3">
                    <i class="el-icon-s-flag"></i>
                    <span>身心健康发展</span>
                </el-menu-item>
                <el-menu-item index="4">
                    <i class="el-icon-s-flag"></i>
                    <span>文化艺术修养</span>
                </el-menu-item>
                <el-menu-item index="5">
                    <i class="el-icon-s-flag"></i>
                    <span>劳动育人实践</span>
                </el-menu-item>
                <el-menu-item index="6">
                    <i class="el-icon-picture"></i>
                    <span>学生画像</span>
                </el-menu-item>
                <el-menu-item index="7">
                    <i class="el-icon-s-home"></i>
                    <span>退出</span>
                </el-menu-item>
            </el-menu>
        </div>
    </div>
</template>
<script></script>
