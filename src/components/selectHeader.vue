<style lang="less">
@import "../assets/iconfont/iconfont.css";
.header {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 20px;
    // 设置下拉选择框属性
    .el-input__inner {
        width: 150px;
        height: 35px;
    }
    // 查询按钮
    .el-button {
        width: 80px;
        font-size: 13px;
    }
    // 设置学号姓名输入框
    .el-input {
        width: 150px;
    }
}
// 每一项
.item {
    width: 240px;
    height: 55px;
    display: flex;
    align-items: center;
    flex: 0 25%;
}
// 每一项的文字
.text {
    width: 42px;
    height: 20px;
    color: #666;
    padding-right: 10px;
}
// iconfont图标大小
.iconfont {
    font-size: 15px;
}
// 表格内容
.content {
    height: 340px;
    // overflow: scroll;
}
</style>
<template>
    <div>
        <div class="header">
            <!-- 专业 -->
            <div class="item">
                <span class="text">专业</span>
                <el-select v-model="major" placeholder="请选择">
                    <el-option :key="-1" value="全部"></el-option>
                    <el-option
                        v-for="item in majorOptions"
                        :key="item.id"
                        :value="item.majorName"
                    ></el-option>
                </el-select>
            </div>
            <!-- 年级 -->
            <div class="item">
                <span class="text">年级</span>
                <el-select v-model="date" placeholder="请选择">
                    <el-option
                        v-for="item in dateOptions"
                        :key="item.id"
                        :value="item.text"
                    ></el-option>
                </el-select>
            </div>
            <!-- 班级 -->
            <div class="item">
                <span class="text">班级</span>
                <el-select v-model="className" placeholder="请选择">
                    <el-option :key="-1" value="全部"></el-option>
                    <el-option
                        v-for="item in classOptions"
                        :key="item.classId"
                        :value="item.className"
                    ></el-option>
                </el-select>
            </div>
            <!-- 学年 -->
            <div class="item">
                <span class="text">学年</span>
                <el-select
                    v-model="grade"
                    @change="selectGradeFun"
                    placeholder="请选择"
                >
                    <el-option
                        v-for="item in gradeOptions"
                        :key="item.gradeYear"
                        :value="item.gradeYear"
                    ></el-option>
                </el-select>
            </div>
            <!-- 学号 -->
            <div class="item">
                <span class="text">学号</span>
                <el-input v-model="xhInput" placeholder="请输入学号"></el-input>
            </div>
            <!-- 姓名(当点击返回按钮后tabIndex会变成1,所以为了显示多加一条) -->
            <div
                class="item"
                v-show="
                    tabIndex === '2' || tabIndex === '4' || tabIndex === '1'
                "
            >
                <span class="text">姓名</span>
                <el-input
                    v-model="nameInput"
                    placeholder="请输入姓名"
                ></el-input>
            </div>
            <!-- 状态(当切换到审核管理时显示) -->
            <div class="item" v-show="tabIndex === '3'">
                <span class="text">状态</span>
                <el-select v-model="status" placeholder="请选择">
                    <el-option
                        v-for="item in statusOptions"
                        :key="item.id"
                        :value="item.name"
                    ></el-option>
                </el-select>
            </div>
            <!-- 查询和导出待审核(切换到审核管理时显示导出详细) -->
            <div class="item">
                <!-- 查询 -->
                <el-button type="primary" size="small" @click="doFilter"
                    ><i class="iconfont icon-search"></i> 查 询</el-button
                >
                <!-- 导出待审核 -->
                <el-button
                    v-show="tabIndex === '3'"
                    style="width: 150px; margin-left: 25px"
                    type="primary"
                    size="small"
                    ><i
                        class="iconfont icon-download"
                        style="padding-right: 5px"
                    ></i
                    >导出待审核详细</el-button
                >
                <!-- 导出总分 -->
                <download-excel
                    v-show="tabIndex === '4'"
                    :data="json_data"
                    :name="showTime()"
                    type="xls"
                >
                    <el-button
                        style="width: 100px; margin-left: 25px"
                        type="primary"
                        size="small"
                        @click="exportSummary"
                        ><i
                            class="iconfont icon-download"
                            style="padding-right: 5px"
                        ></i
                        >导出总分</el-button
                    >
                </download-excel>
            </div>
        </div>
    </div>
</template>
<script>
import { summaryExport } from "@/utils/manage";
import {
    majorList,
    currentDate,
    listByYear,
    listGrade,
    applyList,
    summaryList,
} from "@/utils/manage";
import axios from "axios";
export default {
    data() {
        return {
            major: "全部", // 专业选择框
            majorOptions: [], // 专业选择框下拉列表
            date: "", // 年级选择框
            dateOptions: [], // 年级选择框下拉列表
            className: "全部", // 班级选择框
            classOptions: [], // 班级选择框下拉列表
            grade: "2023-2024学年", // 学年选择框
            gradeOptions: [], // 学年选择框下拉列表
            xhInput: "", // 学号输入框绑定数据
            nameInput: "", // 姓名输入框绑定数据
            status: "等待审核",
            statusOptions: [
                {
                    id: 0,
                    name: "等待审核",
                },
                {
                    id: 1,
                    name: "从未提交数据",
                },
            ],

            tabIndex: "1", // 存储当前tabIndex的值,用于判断输入框是否显示
            tableData: [],

            exportData: [], // 存放excel表json数据
            json_data: [], // 存放excel数据
            testArr: [], // 存放
            applyArr: [], // 存放审核列表的数据(index3)
        };
    },
    created() {
        // 接受由LeftMenu传出的tabIndex
        this.Index.$on("getTabindex", (tabIndex) => {
            this.tabIndex = tabIndex;
        });
    },
    mounted() {
        this.majorListFun();
        this.currentDateFun();
        this.listByYearFun();
        this.listGradeFun();
    },
    watch: {
        tabIndex: function (val) {
            if (val === "3") {
                this.applyListFun();
                return;
            } else if (val === "2" || val === "4") {
                this.summaryListFun();
                return;
            } else {
                return;
            }
        },
    },
    methods: {
        // 根据系别id取出专业
        majorListFun() {
            majorList({ deptId: -1 }).then((res) => {
                this.majorOptions.push(...res.content);
            });
        },
        // 获取年级列表
        currentDateFun() {
            currentDate().then((res) => {
                if (res.msg === "成功") {
                    this.dateOptions.push(...res.data);
                    this.date = this.dateOptions[0].text;
                } else {
                    return;
                }
            });
        },
        // 根据年级获取班级列表
        listByYearFun() {
            listByYear({ deptId: -1, gradeYear: 2021 }).then((res) => {
                if (res.msg === "成功") {
                    this.classOptions.push(...res.data);
                } else {
                    return;
                }
            });
        },
        // 获取学年列表
        listGradeFun() {
            listGrade({ studentId: 211302002 }).then((res) => {
                if (res.msg === "成功") {
                    this.gradeOptions.push(...res.data);
                    this.grade = this.gradeOptions[0].gradeYear;
                }
            });
        },
        // 获取审核列表(index3)
        applyListFun() {
            this.applyArr = [];
            applyList({
                deptId: -1,
                majorGradeYear: "",
                majorId: null,
                classesId: "01341701",
                gradeYear: this.grade,
                status: 0,
                xh: "",
                pageSize: 59,
                pageNumber: 0,
            }).then((res) => {
                this.applyArr.push(...res.content);
                // 替换状态栏内容
                for (let i = 0; i < this.applyArr.length; i++) {
                    if (this.applyArr[i].status === 0) {
                        this.applyArr[i].status = "从未提交数据";
                    } else {
                        this.applyArr[i].status = "等待审核";
                    }
                }
                this.toData();
            });
        },
        // 获取分值统计列表(index2,4)
        summaryListFun() {
            this.tableData = [];
            this.testArr = [];
            summaryList({
                deptId: -1,
                majorId: null,
                classesId: "01341701",
                xh: "",
                studentName: "",
                gradeYear: this.grade,
                majorGradeYear: "",
                pageSize: 59,
                pageNumber: 0,
            }).then((res) => {
                if (res.msg === "成功") {
                    this.tableData.push(...res.data.content);
                    this.testArr = this.tableData;
                    this.toData();
                }
            });
        },
        doFilter() {
            this.testArr = [];
            // 将筛选后的数据放入testArr中,并且每次查询时清空testArr
            for (let i = 0; i < this.tableData.length; i++) {
                // if (
                //     this.tableData[i].studentName.includes(this.nameInput) ||
                //     this.tableData[i].xh.includes(this.xhInput)
                // ) {
                //     this.testArr.push(this.tableData[i]);
                //     console.log("if");
                //     return;
                // } else {
                //     this.testArr = this.tableData;
                //     console.log(21);
                //     return;
                // }

                // 如果学号和姓名都为空,则取出所有数据
                if (this.xhInput === "" && this.nameInput === "") {
                    this.testArr = this.tableData;
                    this.toData();
                    return;
                    // 当学号为空时,根据输入的姓名筛选数据
                } else if (this.xhInput === "") {
                    if (
                        this.tableData[i].studentName.indexOf(this.nameInput) >
                        -1
                    ) {
                        this.testArr.push(this.tableData[i]);
                    }
                    // 当姓名为空时,根据输入的学号筛选数据
                } else if (this.nameInput === "") {
                    if (this.tableData[i].xh.indexOf(this.xhInput) > -1) {
                        this.testArr.push(this.tableData[i]);
                    }
                    // 按两个数据进行筛选
                } else {
                    if (
                        this.tableData[i].studentName.indexOf(this.nameInput) >
                            -1 &&
                        this.tableData[i].xh.indexOf(this.xhInput) > -1
                    ) {
                        this.testArr.push(this.tableData[i]);
                    }
                }
            }
            this.toData();
        },
        // 将表格的数据传给父组件
        toData() {
            this.$emit(
                "selectData",
                this.testArr,
                this.applyArr,
                this.tabIndex
            );
        },
        // 当切换学年后调用,将当前选择的学年赋值给this.grade,并把原数组清空,获取新的学年数据
        selectGradeFun(arg) {
            this.grade = arg;
            this.xhInput = "";
            this.nameInput = "";
            this.tableData = [];
            // if (this.tabIndex === "3") {
            //     this.applyListFun();
            // } else if (this.tabIndex === "2" || this.tabIndex === "4") {
            //     this.summaryListFun();
            // } else {
            //     return 0;
            // }
        },
        // 当点击导出总分后调用,下载总分excel表(index4)
        exportSummary() {
            // axios({
            //     method: "post",
            //     url: "http://101.200.221.213:9202/summary/export",
            //     header: {
            //         "Content-Type": "application/json;charset=UTF-8",
            //     },
            //     data: {
            // deptId: "206",
            // majorId: -1,
            // classesId: -1,
            // xh: "",
            // studentName: "",
            // gradeYear: this.grade,
            // majorGradeYear: this.date,
            // pageSize: 9999,
            // pageNumber: 0,
            //     },
            //     responseType: "blob",
            // }).then((res) => {
            //     if (res) {
            //         const link = document.createElement("a");
            //         const blob = new Blob([res.data], {
            //             type: "application/vnd.ms-excel",
            //         });
            //         link.style.display = "none";
            //         link.href = URL.createObjectURL(blob);
            //         link.download = "分数统计表.xlsx";
            //         // link.setAttribute("pingfen", `.xlsx`);
            //         document.body.appendChild(link);
            //         link.click();
            //         document.body.removeChild(link);
            //     } else {
            //         this.$message.error("导出失败");
            //     }
            // });
            summaryExport({
                deptId: "206",
                majorId: -1,
                classesId: -1,
                xh: "",
                studentName: "",
                gradeYear: this.grade,
                majorGradeYear: this.date,
                pageSize: 9999,
                pageNumber: 0,
            }).then((res) => {
                this.exportData = res.data.content;
                for (let i of this.exportData) {
                    this.json_data.push({
                        系部名称: i.deptName,
                        专业名称: i.majorName,
                        年级: i.majorGradeYear,
                        班级名称: i.className,
                        学号: i.xh,
                        学生姓名: i.studentName,
                        学年: i.scoreGradeYear,
                        分数: i.score,
                    });
                }
            });
        },
        // 配合导出总分功能,修改文件名
        showTime() {
            let date = new Date();
            // 年月日
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            // 时分秒
            let hour = date.getHours();
            let minute = date.getMinutes();
            let second = date.getSeconds();
            return (
                "分数统计" +
                year +
                month +
                day +
                hour +
                minute +
                second +
                ".xls"
            );
        },
    },
};
</script>
