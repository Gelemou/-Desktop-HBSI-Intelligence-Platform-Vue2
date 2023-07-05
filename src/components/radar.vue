<style lang="less" scoped>
.item {
    .iText {
        font-size: 18px;
    }
}
.exportButton {
    display: flex;
    justify-content: center;
    margin: 5px 0;
}
</style>
<template>
    <div class="container" style="height: 470px">
        <div class="header">
            <div class="item">
                <span class="iText">学年: {{ gradeYear }}</span>
            </div>
            <div class="item">
                <span class="iText">学号: {{ xh }}</span>
            </div>
            <div class="item">
                <span class="iText">姓名: {{ studentName }}</span>
            </div>
            <div class="item">
                <span class="iText">总分: {{ score }}</span>
                <el-button
                    type="primary"
                    size="medium"
                    style="margin-left: 80px"
                    @click="goBack"
                    >返回</el-button
                >
            </div>
        </div>
        <!-- echarts雷达图 -->
        <div
            id="echarts"
            style="width: 500px; height: 400px; margin: 0 auto"
        ></div>
        <div class="table" style="margin-top: -30px">
            <el-table
                :data="currentResult"
                height="373px"
                style="width: 100%"
                :border="true"
                :header-cell-style="{
                    background: 'rgb(250, 250, 250)',
                    textAlign: 'center',
                }"
                :span-method="spanMethod"
            >
                <el-table-column
                    label="项目"
                    prop="itemName"
                    align="center"
                    width="120"
                ></el-table-column>
                <el-table-column
                    label="指标点"
                    prop="pointName"
                    align="center"
                    width="160"
                ></el-table-column>
                <el-table-column
                    label="评分标准"
                    prop="pointMemo"
                    align="center"
                    width="320"
                ></el-table-column>
                <el-table-column
                    label="佐证资料"
                    align="center"
                    prop="files"
                ></el-table-column>
                <el-table-column label="得分" align="center">
                    <template v-slot="scope">
                        <span>自评得分</span>
                        <el-input
                            v-model="scope.row.selfScore"
                            :disabled="true"
                            style="width: 90px; margin-left: 10px"
                        ></el-input>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="exportButton">
            <el-button type="primary" @click="exportButton">导出</el-button>
        </div>
    </div>
</template>
<script>
import { radarChart } from "@/utils/student";
import { detailToStatistic } from "@/utils/manage";
import axios from "axios";
export default {
    props: ["xh", "gradeYear", "studentName", "score"],
    data() {
        return {
            echartsArr: {
                // 鼠标悬浮显示数据
                tooltip: {
                    trigger: "axis",
                },
                // 图例组件
                // legend: {
                //     data: [this.name],
                // },
                radar: {
                    // 设置维度
                    indicator: [
                        { name: "思想政治素养", max: 100 },
                        { name: "职业技能特长", max: 100 },
                        { name: "身心健康发展", max: 100 },
                        { name: "文化艺术修养", max: 100 },
                        { name: "劳动育人实践", max: 100 },
                    ],
                },
                emphasis: {},
                series: [
                    {
                        name: "项目雷达图",
                        type: "radar",
                        tooltip: {
                            trigger: "item",
                        },
                        data: [{ value: [] }],
                        // 设置中心颜色,空则自动填充
                        areaStyle: {},
                    },
                ],
            },
            currentResult: [],
            show: false,

            newArr: [],
        };
    },
    mounted() {
        this.radarChartFun();
        this.detailToStatisticFun();
    },
    methods: {
        // 雷达图渲染
        radarChartFun() {
            radarChart({
                studentId: this.xh,
                gradeYear: this.gradeYear,
            }).then((res) => {
                if (res.msg === "成功") {
                    this.echartsArr.series[0].data[0].value = res.data;
                    const myChart = this.$echarts.init(
                        document.getElementById("echarts")
                    );
                    myChart.setOption(this.echartsArr);
                }
            });
        },
        // 取出表格数据
        detailToStatisticFun() {
            detailToStatistic({
                studentId: this.xh,
                gradeYear: this.gradeYear,
            }).then((res) => {
                if (res.msg === "成功") {
                    this.currentResult.push(...res.data.list);
                }
            });
        },
        // 点击返回按钮隐藏当前组件并显示index2
        goBack() {
            this.show = true;
            this.$emit("radarArgs", this.show);
        },
        // 合并列和每一项的最后一行
        spanMethod({ row, column, rowIndex, columnIndex }) {
            // 合并 "该项目...."
            // if (
            //     rowIndex === 5 ||
            //     rowIndex === 11 ||
            //     rowIndex === 17 ||
            //     rowIndex === 21 ||
            //     rowIndex === 27
            // ) {
            //     if (columnIndex === 0) {
            //         return [1, 5];
            //     } else {
            //         return [0, 0];
            //     }
            // }
            let rowitemindex = row.itemName.slice(0, 1);
            if (rowitemindex == "该") {
                if (columnIndex == 0) {
                    return [1, 5];
                } else {
                    return [0, 0];
                }
            } else {
                if (columnIndex == 0) {
                    if (
                        rowIndex == 0 ||
                        rowIndex == 6 ||
                        rowIndex == 12 ||
                        rowIndex == 22
                    ) {
                        return [5, 1];
                    } else if (rowIndex == 18) {
                        return [3, 1];
                    } else {
                        return [0, 0];
                    }
                }
            }
        },
        // 当点击导出按钮时将
        exportButton() {
            axios({
                method: "post",
                url: "http://101.200.221.213:9202/score/export",
                headers: {},
                data: {
                    studentId: this.xh,
                    gradeYear: this.gradeYear,
                },
                responseType: "blob",
            }).then((res) => {
                const link = document.createElement("a");
                const blob = new Blob([res.data], {
                    type: "application/vnd.ms-excel",
                });
                link.style.display = "none";
                link.href = URL.createObjectURL(blob);
                link.download = "评分详细表.xls";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });
        },
    },
};
</script>
