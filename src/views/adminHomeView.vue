<style lang="less" scoped>
// 调整页面布局,使页面分左右两部分
.index {
    display: flex;
}
</style>
<template>
    <main class="index">
        <LeftMenu @chuan="leftMenuArgs"></LeftMenu>
        <RightContent>
            <!-- 使用具名插槽放置内容 -->
            <template v-slot:userName>{{ userName }}</template>
            <template v-slot:components>
                <index1 v-show="tabIndex === '1'"></index1>
                <index2 v-show="tabIndex === '2'"></index2>
                <index3 v-show="tabIndex === '3'"></index3>
                <index4 v-show="tabIndex === '4'"></index4>
                <index5 v-show="tabIndex === '5'"></index5>
            </template>
        </RightContent>
    </main>
</template>
<script>
import LeftMenu from "@/components/LeftMenu.vue";
import RightContent from "@/components/RightContent.vue";
import index1 from "@/components/index1.vue";
import index2 from "@/components/index2.vue";
import index3 from "@/components/index3.vue";
import index4 from "@/components/index4.vue";
import index5 from "@/components/index5.vue";
export default {
    components: {
        LeftMenu,
        RightContent,
        index1,
        index2,
        index3,
        index4,
        index5,
    },
    data() {
        return {
            userName: "",
            token: "",
            tabIndex: "1", // 当前tab页
        };
    },
    mounted() {
        if (sessionStorage.token) {
            this.userName = sessionStorage.userName;
            this.token = sessionStorage.token;
            // 页面装载时可以获取学年列表,用于在页面显示
        } else {
            this.$router.push("/adminLogin");
        }
    },
    methods: {
        // 点击退出时调用,将sessionstorage清空,并返回登陆页
        logout() {
            sessionStorage.clear();
            this.$router.push("/adminLogin");
        },
        // 将组件LeftMenu的参数tabIndex传入主页
        leftMenuArgs(arg) {
            this.tabIndex = arg;
        },
        // 当切换menu-item时调用
        getTabIndex(index) {
            this.tabIndex = index;
        },
    },
};
</script>
