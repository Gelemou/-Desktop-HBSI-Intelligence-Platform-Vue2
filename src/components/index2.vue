<style lang="less">
@import "../assets/iconfont/iconfont.css";
.container {
    width: 100%;
}
// 表格内容
.content {
    height: 340px;
}
// 设置学号和姓名超链接样式
.aText {
    cursor: pointer;
    color: #66b1ff;
    text-decoration: none;
}
</style>
<template>
    <div class="container">
        <selectHeader @selectData="selectArgs" v-if="show"></selectHeader>
        <div class="content" v-if="show">
            <el-table
                :data="
                    testArr.slice(
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
                    label="序号"
                    width="50"
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
                ></el-table-column>
                <el-table-column label="学号" align="center">
                    <template v-slot="scope">
                        <span class="aText" @click="radar(scope.row)">{{
                            scope.row.xh
                        }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="学生姓名"
                    prop="studentName"
                    align="center"
                    width="120"
                >
                    <template v-slot="scope">
                        <span class="aText" @click="radar(scope.row)">{{
                            scope.row.studentName
                        }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="分数"
                    prop="score"
                    align="center"
                    width="80"
                ></el-table-column>
                <el-table-column label="操作" align="center" width="220">
                    <template v-slot="scope">
                        <el-button type="primary" size="small" plain
                            >退回辅导员</el-button
                        >
                        <el-button type="primary" size="small" plain
                            >退回学生</el-button
                        >
                        <el-button
                            type="danger"
                            size="small"
                            plain
                            @click="delScore(scope.row)"
                            >删除分数</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <div class="pagination">
                <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    layout="total, prev, pager, next"
                    :total="testArr.length"
                    :page-size="pageSize"
                >
                </el-pagination>
            </div>
        </div>
        <radar
            @radarArgs="radarArgs"
            v-if="radarShow"
            :gradeYear="gradeYear"
            :xh="xh"
            :studentName="studentName"
            :score="score"
        ></radar>
    </div>
</template>
<script>
import selectHeader from "./selectHeader.vue";
import radar from "./radar.vue";
export default {
    components: { selectHeader, radar },
    data() {
        return {
            // major: "全部", // 专业选择框
            // majorOptions: [], // 专业选择框下拉列表
            // date: "", // 年级选择框
            // dateOptions: [], // 年级选择框下拉列表
            // className: "全部", // 班级选择框
            // classOptions: [], // 班级选择框下拉列表
            // grade: "", // 学年选择框
            // gradeOptions: [], // 学年选择框下拉列表
            // xhInput: "", // 学号输入框绑定数据
            // nameInput: "", // 姓名输入框绑定数据

            // tableData: [], // 存放原始数据
            testArr: [],
            tabIndex: "",

            currentPage: 1,
            pageSize: 12, // 一页有多少条数据

            radarShow: false, // 是否显示radar组件
            show: true, // 是否显示头部和表格
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
        // 将接受从子组件selectHeader传来的值,用来显示表格数据
        selectArgs(arg1, arg2) {
            this.testArr = arg1;
            this.tabIndex = arg2;
        },
        // 当点击学号或学生姓名时调用,将个人雷达图组件显示出来,并将头部和表格隐藏
        radar(row) {
            this.gradeYear = row.scoreGradeYear;
            this.xh = row.xh;
            this.studentName = row.studentName;
            this.score = row.score;
            this.radarShow = true; // 显示雷达图
            this.show = false; // 隐藏
        },
        // 当点击返回按钮后停止渲染组件radar,并渲染原先内容
        radarArgs(arg) {
            this.show = arg;
            this.radarShow = !arg;
        },
        // 点击删除分数调用(未完成)
        delScore(row) {
            row.score = 0;
        },
    },
};
</script>
