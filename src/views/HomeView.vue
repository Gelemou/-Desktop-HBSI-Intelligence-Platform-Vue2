<style lang="less" scoped>
.index {
    display: flex;
}
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
.el-menu-item {
    display: flex;
    align-items: center;
    height: 48px;
    color: rgb(200, 205, 213) !important;
    i {
        font-size: 24px;
    }
}
// 当menu-item选中时
.is-active {
    color: #fff !important;
    background-color: #0084fd !important;
}
/* 列表标题 */
.leftList span {
    font-size: 15px;
    padding-left: 6px;
}

.rightContent {
    background-color: #f3f3f3;
    overflow: hidden;
    flex: 1;
}
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
/* 设置学号姓名样式 */
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
    height: 100%;
}
.boxContent {
    height: 100%;
    padding: 15px 30px;
    background-color: #fff;
}
.boxContentHeader {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #666;
}
/* 选择年份框 */
.el-select {
    width: 175px;
    padding: 0 25px 0 15px;
}
// 设置选择年份框的高度
/deep/.el-input__inner {
    height: 33px;
}
// 设置选择年份框的箭头
/deep/.el-input__icon {
    height: auto;
}
// primary类型按钮
.priButton {
    width: 80px;
    height: 33px;
    padding-top: 10px;
    padding-left: 20px;
}
/* 总分 */
.percent {
    font-size: large;
    color: #000;
}
/* 表格 */
.boxContentTable {
    margin-top: 20px;
}
// 设置得分框宽度
.el-input-number {
    width: 140px;
}
// 设置文本域宽度
.el-textarea {
    width: 202px;
    min-height: 78px;
}
// 得分
.percents {
    display: flex;
    align-items: center;
    padding-left: 25px;
    gap: 10px;
}
// 得分依据
.percentReason {
    display: flex;
    margin-top: 20px;
    gap: 10px;
}
// 上传按钮
.uploadButton {
    height: 33px;
    padding-top: 10px;
    margin-left: -50px;
}
// 保存和提交按钮
.saveAndCommit {
    margin-top: 10px;
    display: flex;
    justify-content: center;
}
// 保存按钮
.save {
    margin-right: 40px;
}
// 雷达图
#echarts {
    width: 600px;
    height: 404px;
    margin: 10px auto;
}
</style>
<template>
    <main class="index">
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
                    <el-menu-item index="7" @click="logout">
                        <i class="el-icon-s-home"></i>
                        <span>退出</span>
                    </el-menu-item>
                </el-menu>
            </div>
        </div>
        <div class="rightContent">
            <div class="topHeader">
                <span class="id">学号: {{ xh }}</span>
                <span class="name">姓名: {{ name }}</span>
            </div>
            <div class="box">
                <div class="boxContent">
                    <div class="boxContentHeader">
                        <div>
                            <span class="year">学年</span>
                            <el-select
                                v-model="value"
                                placeholder="Select"
                                @change="yearChange($event)"
                            >
                                <el-option
                                    v-for="item in options"
                                    :key="item.gradeYear"
                                    :value="item.gradeYear"
                                ></el-option>
                            </el-select>
                            <el-button
                                type="primary"
                                class="priButton"
                                @click="getEvaluateByYearFun()"
                                >查询</el-button
                            >
                        </div>
                        <span class="percent" v-show="show"
                            >总分:{{ total }}</span
                        >
                    </div>
                    <div class="boxContentTable" v-show="show">
                        <el-table
                            :data="currentResult"
                            ref="tableRef"
                            height="373px"
                            style="width: 100%"
                            :border="true"
                            :header-cell-style="{
                                background: 'rgb(250, 250, 250)',
                                textAlign: 'center',
                            }"
                            :span-method="arrSpanMethod"
                        >
                            <el-table-column
                                prop="pointName"
                                label="指标点"
                                width="160"
                                align="center"
                            />
                            <el-table-column
                                prop="pointMemo"
                                label="评分标准"
                                width="380"
                                align="center"
                            />
                            <el-table-column
                                prop=""
                                label="佐证资料"
                                width="200"
                                align="center"
                            >
                                <template v-slot="scope">
                                    <div
                                        v-for="item in scope.row.attachmentList"
                                        :key="item.url"
                                    >
                                        <a
                                            target="_blank"
                                            :href="`${SERVER_BASE_URL}/${item.url}`"
                                            >{{ item.fileName }}</a
                                        >
                                        <i
                                            class="iconfont icon-roundclose"
                                            style="cursor: pointer"
                                            @click="
                                                deleteUpload(
                                                    scope.row,
                                                    item,
                                                    fileList
                                                )
                                            "
                                        ></i>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="操作"
                                width="300"
                                align="center"
                            >
                                <el-form slot-scope="scope">
                                    <el-form-item label="得分">
                                        <div class="percents">
                                            <el-input-number
                                                v-model="scope.row.selfScore"
                                                :min="0"
                                                :max="100"
                                                :disabled="
                                                    scope.row.status == 1
                                                "
                                                controls-position="right"
                                            />
                                        </div>
                                    </el-form-item>
                                    <el-form-item label="">
                                        <div class="percentReason">
                                            得分依据
                                            <el-input
                                                v-model="scope.row.detail"
                                                :rows="2"
                                                type="textarea"
                                                :disabled="
                                                    scope.row.status == 1
                                                "
                                            />
                                        </div>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-upload
                                            :file-list="fileList"
                                            :show-file-list="false"
                                            class="upload-demo"
                                            :action="uploadurl"
                                            multiple
                                            :on-success="
                                                (res, file, fileList) => {
                                                    uploadSuccess(
                                                        res,
                                                        file,
                                                        fileList,
                                                        scope.row
                                                    );
                                                }
                                            "
                                            :on-exceed="exceed"
                                            :headers="myheader"
                                            :limit="3"
                                        >
                                            <el-button
                                                type="success"
                                                class="uploadButton"
                                                icon="el-icon-upload"
                                                >上传文件</el-button
                                            >
                                        </el-upload>
                                    </el-form-item>
                                </el-form>
                            </el-table-column>
                        </el-table>
                        <div class="saveAndCommit">
                            <el-button
                                type="primary"
                                class="save priButton"
                                :loading="isSaving"
                                @click="saveData()"
                                >保存</el-button
                            >
                            <el-button
                                type="primary"
                                class="priButton"
                                :loading="isCommit"
                                @click="commitData()"
                                >提交</el-button
                            >
                        </div>
                    </div>
                    <div id="echarts" v-show="!show"></div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import { getGradeYears } from "@/utils/student";
import {
    getEvaluateByYear,
    saveResult,
    commitResult,
    radarChart,
} from "@/utils/student";
import { SERVER_BASE_URL } from "@/utils/server";
import "@/assets/iconfont/iconfont.css";
export default {
    name: "HomeView",
    components: {},
    data() {
        return {
            // 学年
            options: [],
            value: "", // 年份选择框v-model
            tableData: [],
            num: 0, // 得分
            textarea: "", // 文本域
            fileList: [], // 上传文件
            SERVER_BASE_URL: SERVER_BASE_URL,
            uploadurl: SERVER_BASE_URL + "/attachment/upload", // 上传文件的url
            myheader: { token: sessionStorage.token },

            xh: "",
            name: "",
            token: "",
            gradeYear: "2023-2024学年",
            show: 1, // 当接口有数据时显示表格内容
            result: "", // 存放从接口获取的所有数据
            tabIndex: "1", // menu当前选择的index
            total: "", // 总分
            currentResult: [], // 存放接口数据截取完的数据,将数据展示在页面
            isSaving: false, // 是否正在保存
            isCommit: false, // 是否正在提交
            echartsArr: [], // 用于接收分数
        };
    },
    mounted() {
        if (sessionStorage.token) {
            this.xh = sessionStorage.xh;
            this.name = sessionStorage.name;
            this.token = sessionStorage.token;
            // 页面装载时可以获取学年列表,用于在页面显示
            this.getGradeYearsFun();
            this.getEvaluateByYearFun();
        } else {
            this.$router.push("/login");
        }
        // echarts雷达图设置
        var myChart = this.$echarts.init(document.getElementById("echarts"));
        var option = {
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
                    name: `${this.name}`,
                    type: "radar",
                    tooltip: {
                        trigger: "item",
                    },
                    data: [{ value: [] }],
                    // 设置中心颜色,空则自动填充
                    areaStyle: {},
                },
            ],
        };
        option && myChart.setOption(option);
    },
    // 监听表格数据,当发生变化时表格滚动到顶部
    watch: {
        currentResult: {
            handler() {
                this.$nextTick(() => {
                    // 滚动到顶部
                    this.$refs.tableRef.bodyWrapper.scrollTop = 0;
                });
            },
        },
    },
    methods: {
        // 获取学年列表
        getGradeYearsFun() {
            getGradeYears({ studentId: this.xh }).then((res) => {
                if (res.msg === "成功") {
                    this.options = res.data;
                }
                // 当接口有数据时,选择年份框自动选择第一个
                if (this.options.length > 0) {
                    this.value = this.options[0].gradeYear;
                }
            });
        },
        // 点击查询按钮后执行,将接口数据存放到result里,将总分存放到total,并调用截取数据selectData()函数
        getEvaluateByYearFun() {
            getEvaluateByYear({
                studentId: this.xh,
                gradeYear: this.gradeYear,
            }).then((res) => {
                if (res.msg === "成功") {
                    this.result = res.data.list;
                    this.total = res.data.score;
                    this.echartsArr = [];
                    this.selectData();
                }
            });
        },
        // 当选择学年时执行,将年份赋值为当前选择的年份,gradeYear用于动态选择学年
        yearChange(e) {
            this.gradeYear = e;
        },
        // 当切换menu-item时执行,tabIndex用于函数selectData()判断接口数据的首字符,并且当切换时调用接口数据显示在页面上
        getTabIndex(index) {
            this.tabIndex = index;
            this.getEvaluateByYearFun();
        },
        // 当切换menu-item和点击查询按钮时执行,将原数据result根据所选menu-item的index截取,截取后的数据currenResult展示在页面
        selectData() {
            // 获取当前选择的menu-item的index,用于后面的check函数
            let index = Number.parseInt(this.tabIndex);
            // 作为slice()方法的参数
            let start, end;
            // 使用startsWith()方法判断接口的itemName是否是menu-item当前选择的index,结果会返回boolean值
            function check(item) {
                return item.itemName.startsWith(index);
            }
            // findIndex()方法有一个参数是check函数,返回第一个符合参数验证的下标
            start = this.result.findIndex(check);
            index++;
            end = this.result.findIndex(check);
            this.currentResult = this.result.slice(start, end);
            // 当切换到学生画像时不显示表格
            if (this.currentResult.length === 0) {
                this.show = 0;
            } else {
                this.show = 1;
            }
            // 如果是学生画像调用函数,对数据进行二次处理
            if (this.tabIndex == 6) {
                this.echartsData();
            }
        },
        // 点击退出时调用,将sessionstorage清空,并返回登陆页
        logout() {
            sessionStorage.clear();
            this.$router.push("/login");
        },
        // 当上传文件超出规定的个数后弹出提示
        exceed(files, fileList) {
            this.$message.warning(
                `需要的佐证材料最多三个,已上传${fileList.length}个`
            );
        },
        // 上传文件成功时
        uploadSuccess(res, files, fileList, row) {
            row.attachmentList.push({
                fileName: res.data.fileName,
                url: res.data.url,
                id: fileList.length,
            });
        },
        // 上传文件后点击删除按钮进行删除
        deleteUpload(row, item) {
            for (let i = 0; i < row.attachmentList.length; i++) {
                if (row.attachmentList[i].id === item.id) {
                    row.attachmentList.splice(i, 1);
                    return;
                } else {
                    continue;
                }
            }
        },
        // 将表格最后一行合并
        arrSpanMethod({ row, column, rowIndex, columnIndex }) {
            // 如果是最后一行
            if (rowIndex === this.currentResult.length - 1) {
                // 最后一行的第一列合并四列单元格
                if (columnIndex === 0) {
                    return [1, 4];
                } else {
                    return [0, 0];
                }
            }
        },
        // 点击保存时调用
        saveData() {
            this.isSaving = true;
            this.saveText = "正在保存";
            this.$confirm("确认要保存吗", "提示", {
                confirmButtonText: "保存",
                cancelButtonText: "取消保存",
            })
                .then(() => {
                    let data = {
                        studentId: this.xh,
                        gradeYear: this.gradeYear,
                        scoreList: this.result,
                    };
                    saveResult(data).then((res) => {
                        this.$message.success("保存成功");
                        this.isSaving = false;
                        this.saveText = "保存";
                    });
                })
                .catch(() => {
                    this.$message.warning("保存已取消");
                    this.isSaving = false;
                    this.saveText = "保存";
                });
        },
        // 点击提交时调用
        commitData() {
            this.isCommit = true;
            this.$confirm("确认要提交吗", "提示", {
                confirmButtonText: "提交",
                cancelButtonText: "取消提交",
            })
                .then(() => {
                    let data = {
                        studentId: this.xh,
                        gradeYear: this.gradeYear,
                        scoreList: this.result,
                    };
                    commitResult(data).then((res) => {
                        this.$message.success("提交成功");
                        this.isCommit = false;
                        this.saveText = "提交";
                    });
                })
                .catch(() => {
                    this.$message.warning("提交已取消");
                    this.isCommit = false;
                    this.saveText = "提交";
                });
        },
        // 当切换到学生画像时调用,将echarts雷达图静态数据换成动态数据
        echartsData() {
            radarChart({ studentId: this.xh, gradeYear: this.gradeYear }).then(
                (res) => {
                    if (res.msg === "成功") {
                        this.echartsArr.push(...res.data);
                        let map = this.$echarts.init(
                            document.getElementById("echarts")
                        );
                        let option = map.getOption();
                        option.series[0].data[0].value = this.echartsArr;
                        map.setOption(option, true);
                    } else {
                        return;
                    }
                }
            );
        },
    },
};
</script>
