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
.eContent {
    display: inline-block;
    width: 300px;
    height: 300px;
    margin: 0;
}
</style>
<template>
    <div class="container">
        <div class="header">
            <!-- 专业 -->
            <div class="item">
                <span class="text">专业</span>
                <el-select v-model="major" placeholder="请选择">
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
            <!-- 学年 -->
            <div class="item">
                <span class="text">学年</span>
                <el-select v-model="grade" placeholder="请选择">
                    <el-option
                        v-for="item in gradeOptions"
                        :key="item.gradeYear"
                        :value="item.gradeYear"
                    ></el-option>
                </el-select>
            </div>
            <!-- 查询 -->
            <div class="item">
                <el-button type="primary" size="small" @click="barClassFun"
                    ><i class="iconfont icon-search"></i> 查 询</el-button
                >
            </div>
        </div>
        <div class="eContent" v-for="(item, index) in echartsArr" :key="index">
            <div
                :id="`echarts${index}`"
                style="width: 300px; height: 300px"
            ></div>
        </div>
    </div>
</template>
<script>
import { majorList, currentDate, listGrade, barClass } from "@/utils/manage";
export default {
    data() {
        return {
            major: "", // 专业选择框
            majorOptions: [], // 专业选择框下拉列表
            date: "", // 年级选择框
            dateOptions: [], // 年级选择框下拉列表
            grade: "2023-2024学年", // 学年选择框
            gradeOptions: [], // 学年选择框下拉列表

            echartsArr: [], // 用于存放echarts图标需要的数据
        };
    },
    mounted() {
        this.majorListFun();
        this.currentDateFun();
        this.listGradeFun();
    },
    methods: {
        // 根据系别id取出专业
        majorListFun() {
            majorList({ deptId: -1 }).then((res) => {
                this.majorOptions.push(...res.content);
                this.major = this.majorOptions[0].majorName;
            });
        },
        // 获取年级列表
        currentDateFun() {
            currentDate().then((res) => {
                if (res.msg === "成功") {
                    this.dateOptions.push(...res.data);
                    this.date = this.dateOptions[0].text;
                    // 取完年级后初始化echarts
                    this.barClassFun();
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
        // 按专业获取柱状图
        barClassFun() {
            this.echartsArr = [];
            barClass({
                majorId: "0209",
                majorGradeYear: this.date,
                gradeYear: this.grade,
            }).then((res) => {
                if (res.msg === "成功") {
                    this.echartsArr.push(...res.data);
                    this.$nextTick(() => {
                        this.initChart();
                    });
                }
            });
        },
        // 初始化echarts
        initChart() {
            this.echartsArr.forEach((val, index) => {
                const myChart = this.$echarts.init(
                    document.getElementById(`echarts${index}`)
                );
                this.echartsArr[index] = {
                    // 设置标题
                    title: {
                        textStyle: {
                            fontSize: "20",
                            color: "#5b9bd5",
                        },
                        text: this.echartsArr[index].title,
                    },
                    // 设置x轴
                    xAxis: {
                        type: "category",
                        data: [this.echartsArr[index].xAxis],
                    },
                    // 设置y轴
                    yAxis: {
                        type: "value",
                    },
                    series: [
                        {
                            data: [this.echartsArr[index].series[0]],
                            type: "bar",
                            // 在柱体上显示数值
                            label: {
                                show: true,
                            },
                        },
                    ],
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            type: "shadow",
                        },
                        formatter: function (params) {
                            var tar = params[0];
                            return tar.name + "<br>" + "平均分:" + tar.value;
                        },
                    },
                };
                myChart.setOption(this.echartsArr[index]);
            });
        },
    },
};
</script>
