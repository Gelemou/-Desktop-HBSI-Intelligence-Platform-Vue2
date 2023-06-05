<style lang="less" scoped>
.rightContent {
    background-color: #f3f3f3;
    overflow: hidden;
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
// 查询按钮
/deep/.el-button {
    height: 33px;
    padding-top: 10px;
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
    margin-left: -50px;
}
</style>
<template>
    <div class="rightContent">
        <div class="topHeader">
            <span class="id">学号:</span>
            <span class="name">姓名: aaa</span>
        </div>
        <div class="box">
            <div class="boxContent">
                <div class="boxContentHeader">
                    <div>
                        <span class="year">学年</span>
                        <el-select v-model="value" placeholder="Select">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                        <el-button type="primary">查询</el-button>
                    </div>
                    <span class="percent">总分:92</span>
                </div>
                <div class="boxContentTable">
                    <el-table
                        :data="tableData"
                        height="373px"
                        style="width: 100%"
                        :border="true"
                        :header-cell-style="{
                            background: 'rgb(250, 250, 250)',
                            textAlign: 'center',
                        }"
                    >
                        <el-table-column
                            prop="date"
                            label="指标点"
                            width="160"
                            align="center"
                        />
                        <el-table-column
                            prop="name"
                            label="评分标准"
                            width="380"
                            align="center"
                        />
                        <el-table-column
                            prop="address"
                            label="佐证资料"
                            width="200"
                            align="center"
                        />
                        <el-table-column
                            prop="address"
                            label="操作"
                            width="300"
                            align="center"
                        >
                            <div class="percents">
                                得分
                                <el-input-number
                                    v-model="num"
                                    :min="0"
                                    :max="100"
                                    controls-position="right"
                                ></el-input-number>
                            </div>
                            <div class="percentReason">
                                得分依据
                                <el-input
                                    v-model="textarea"
                                    :rows="2"
                                    type="textarea"
                                />
                            </div>
                            <el-upload
                                v-model:file-list="fileList"
                                class="upload-demo"
                                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                            >
                                <el-button type="success" class="uploadButton"
                                    >上传文件</el-button
                                >
                            </el-upload>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            options: [
                {
                    value: "option1",
                },
                {
                    value: "option2",
                },
                {
                    value: "option3",
                },
                {
                    value: "option4",
                },
                {
                    value: "option5",
                },
            ],
            value: "",
            tableData: [
                {
                    date: "2016-05-03",
                    name: "Tom",
                    address: "No. 189, Grove St, Los Angeles",
                },
                {
                    date: "2016-05-02",
                    name: "Tom",
                    address: "No. 189, Grove St, Los Angeles",
                },
                {
                    date: "2016-05-04",
                    name: "Tom",
                    address: "No. 189, Grove St, Los Angeles",
                },
                {
                    date: "2016-05-01",
                    name: "Tom",
                    address: "No. 189, Grove St, Los Angeles",
                },
                {
                    date: "2016-05-08",
                    name: "Tom",
                    address: "No. 189, Grove St, Los Angeles",
                },
                {
                    date: "2016-05-06",
                    name: "Tom",
                    address: "No. 189, Grove St, Los Angeles",
                },
                {
                    date: "2016-05-07",
                    name: "Tom",
                    address: "No. 189, Grove St, Los Angeles",
                },
                {
                    date: "2016-05-07",
                    name: "Tom",
                    address: "No. 189, Grove St, Los Angeles",
                },
                {
                    date: "2016-05-07",
                    name: "Tom",
                    address: "No. 189, Grove St, Los Angeles",
                },
                {
                    date: "2016-05-07",
                    name: "Tom",
                    address: "No. 189, Grove St, Los Angeles",
                },
                {
                    date: "2016-05-07",
                    name: "Tom",
                    address: "No. 189, Grove St, Los Angeles",
                },
            ],
            num: 0,
            textarea: "",
            fileList: "",
        };
    },
};
</script>
