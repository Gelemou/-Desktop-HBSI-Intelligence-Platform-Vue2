<style lang="less">
@import "../assets/iconfont/iconfont.css";
.container {
    width: 100%;
}
// 表格内容
.content {
    height: 340px;
}
// 下载成绩单
.downLoadScore {
    font-weight: 600;
    color: #66b1ff;
    cursor: pointer;
}
// 设置学号和姓名超链接样式
.aText {
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
                :key="renderByKey"
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
                    width="100"
                    align="center"
                ></el-table-column>
                <el-table-column
                    label="专业名称"
                    prop="majorName"
                    width="120"
                    align="center"
                ></el-table-column>
                <el-table-column
                    label="年级"
                    prop="majorGradeYear"
                    width="100"
                    align="center"
                ></el-table-column>
                <el-table-column
                    label="班级名称"
                    prop="className"
                    align="center"
                    width="110"
                ></el-table-column>
                <el-table-column
                    label="学年"
                    prop="scoreGradeYear"
                    align="center"
                    width="100"
                ></el-table-column>
                <el-table-column label="学号" width="100" align="center">
                    <template v-slot="scope">
                        <span class="aText" @click="radar(scope.row)">{{
                            scope.row.xh
                        }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="学生姓名" align="center" width="100">
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
                <el-table-column label="操作" align="center">
                    <template v-slot="scope">
                        <span
                            class="downLoadScore"
                            @click="downloadScoreReport(scope.row)"
                            >下载成绩单</span
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
import axios from "axios";
export default {
    components: { selectHeader, radar },
    data() {
        return {
            grade: "", // 学年选择框
            gradeOptions: [], // 学年选择框下拉列表

            currentPage: 1,
            pageSize: 12, // 一页有多少条数据

            renderByKey: false,
            testArr: [],

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
        // 将接受从子组件传来的值
        selectArgs(arg) {
            this.testArr = arg;
        },
        // 下载成绩单调用
        downloadScoreReport(row) {
            console.log(row);
            axios({
                url: "http://101.200.221.213:9202/score/scoreReport",
                data: { studentId: row.id, gradeYear: row.scoreGradeYear },
                method: "POST",
                params: this.params,
                responseType: "blob",
            }).then((res) => {
                if (res) {
                    const link = document.createElement("a");
                    const blob = new Blob([res.data], {
                        type: "application/pdf",
                    });
                    link.style.display = "none";
                    link.href = URL.createObjectURL(blob);
                    link.download = `${row.scoreGradeYear}${row.deptName}${row.className}${row.studentName}.pdf`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                } else {
                    this.$message.error("导出失败");
                }
            });
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
    },
};
</script>
