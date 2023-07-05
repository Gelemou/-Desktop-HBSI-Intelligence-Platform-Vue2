<style lang="less">
// 右侧内容
.rightContent {
    background-color: #f3f3f3;
    flex: 1;
}
// 右侧内容顶部信息容器
.topHeader {
    height: 54px;
    display: flex;
    align-items: center;
    /* 固定在顶部 */
    position: sticky;
    top: 0;
    z-index: 100;
    background-color: #fff;
    border-bottom: 1px solid #e4e7ed;
    box-shadow: 0 6px 6px 0 rgba(0, 0, 0, 0.1);
}
// 设置顶部
.topHeader span {
    font-size: 17px;
    color: #666;
}
.id {
    padding: 0 22px;
}
/* 内容容器 */
.box {
    padding: 10px;
}
.boxContent {
    padding: 15px 30px;
    background-color: #fff;
    box-shadow: 0 0.1rem 0.1rem 0 rgba(0, 0, 0, 0.1);
    overflow: auto;
}
.boxContentHeader {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #666;
}
</style>
<template>
    <div class="rightContent">
        <div class="topHeader">
            <span class="id">欢迎: <slot name="userName"></slot></span>
        </div>
        <div class="box">
            <div class="boxContent">
                <div class="boxContentHeader"></div>
                <slot name="components"></slot>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {};
    },
};
</script>
