<style lang="less">
@import "../assets/iconfont/iconfont.css";
.container {
    width: 100%;
}
// 表格内容
.content {
    height: 340px;
}
</style>
<template>
    <div class="container">
        <selectHeader @selectData="selectArgs"></selectHeader>
        <div class="content">
            <el-table
                :data="
                    applyArr.slice(
                        (currentPage - 1) * pageSize,
                        currentPage * pageSize
                    )
                "
                ref="tableRef"
                :border="true"
                :header-cell-style="{
                    background: 'rgb(250, 250, 250)',
                    textAlign: 'center',
                }"
            >
                <el-table-column
                    type="index"
                    :index="indexMethod"
                    label="序列号"
                    width="70"
                    align="center"
                ></el-table-column>
                <el-table-column
                    label="系部名称"
                    prop="deptName"
                    align="center"
                ></el-table-column>
                <el-table-column
                    label="专业名称"
                    prop="majorName"
                    align="center"
                ></el-table-column>
                <el-table-column
                    label="班级名称"
                    prop="className"
                    align="center"
                    width="230"
                ></el-table-column>
                <el-table-column
                    label="状态"
                    prop="status"
                    align="center"
                    width="120"
                ></el-table-column>
                <el-table-column label="学号" prop="xh" align="center">
                </el-table-column>
                <el-table-column
                    label="学生姓名"
                    prop="studentName"
                    align="center"
                    width="120"
                ></el-table-column>
            </el-table>
            <!-- 分页 -->
            <div class="pagination">
                <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    layout="total, prev, pager, next"
                    :total="applyArr.length"
                    :page-size="pageSize"
                >
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import selectHeader from "./selectHeader.vue";
export default {
    components: { selectHeader },
    // 从父组件adminHomeView中接受参数index(当前tabIndex)
    data() {
        return {
            currentPage: 1,
            pageSize: 12, // 一页有多少条数据

            applyArr: [],
        };
    },
    mounted() {},
    methods: {
        // pageSize(每页的条数)改变时调用 val:每页条数
        handleSizeChange(val) {
            this.pageSize = val;
        },
        // currentPage(当前页)改变时调用 val:当前页
        handleCurrentChange(val) {
            this.currentPage = val;
            this.$nextTick(() => {
                // 滚动到顶部
                this.$refs.tableRef.scrollTop = 0;
            });
        },
        // 算出表格每项数据的序号
        indexMethod(index) {
            return (this.currentPage - 1) * this.pageSize + index + 1;
        },
        // 将接受从子组件传来的值
        selectArgs(testArr, applyArr, tabIndex) {
            this.applyArr = applyArr;
        },
    },
};
</script>
