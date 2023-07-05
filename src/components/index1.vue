<style lang="less">
@import "../assets/iconfont/iconfont.css";
// 顶部添加、导入辅导员
.topButton {
    margin-right: 10px;
    // 设置iconfont图标
    i {
        padding-right: 5px;
    }
}
// el-table表格
.table {
    margin-top: 30px;
}
.pagination {
    margin-top: 40px;
    display: flex;
    justify-content: right;
    align-items: center;
}
// 添加辅导员按钮输入框
.addTeacher {
    // 设置弹框的标题和输入框样式
    .el-message-box__container {
        display: inline-block;
        font-size: 15px;
    }
    .el-message-box__input {
        width: 170px;
        display: inline-block;
        margin-left: 20px;
    }
    // 设置确定和取消按钮样式,将两个按钮位置调换
    .el-message-box__btns {
        padding: 5px 15px 0;
        display: flex;
        justify-content: center;
        flex-direction: row-reverse;
        gap: 30px;
        .el-button {
            width: 80px;
            height: 40px;
            font-size: 15px;
        }
    }
}
.importTeacher {
    width: 540px;
}
</style>
<template>
    <div>
        <div>
            <el-button
                class="topButton"
                size="small"
                type="primary"
                @click="addTeacher"
            >
                <i class="iconfont icon-baseline-add_circle_outline-px"></i>
                添加辅导员</el-button
            >
            <el-button
                class="topButton"
                size="small"
                type="primary"
                @click="importTeacher"
                ><i class="iconfont icon-upload"></i>导入辅导员</el-button
            >
        </div>
        <div>
            <el-table
                class="table"
                :data="
                    tableData.slice(
                        (currentPage - 1) * pageSize,
                        currentPage * pageSize
                    )
                "
                style="width: 100%"
                :border="true"
                :header-cell-style="{
                    background: 'rgb(250, 250, 250)',
                    textAlign: 'center',
                }"
            >
                <!-- 添加递增序列号 -->
                <el-table-column
                    type="index"
                    :index="indexMethod"
                    label="序列号"
                    width="80"
                    align="center"
                ></el-table-column>
                <el-table-column
                    prop="deptName"
                    label="系部名称"
                    align="center"
                ></el-table-column>
                <el-table-column
                    prop="userName"
                    label="教工号"
                    align="center"
                ></el-table-column>
                <el-table-column
                    prop="col1"
                    label="姓名"
                    align="center"
                ></el-table-column>
                <el-table-column prop="d" label="操作" align="center">
                    <el-button type="primary" size="small" plain
                        >修改</el-button
                    >
                    <el-button type="danger" size="small" plain>删除</el-button>
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
                    :total="tableData.length"
                    :page-size="pageSize"
                >
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import { saveTeacher, listTeacher } from "@/utils/manage";
export default {
    data() {
        return {
            // 表格静态数据
            tableData: [],
            currentPage: 1, // 当前选择的页数
            pageSize: 5, // 每页的条数
        };
    },
    mounted() {
        setTimeout(() => {
            this.listTeacherFun();
        }, 200);
    },
    methods: {
        // 从接口取出辅导员列表
        listTeacherFun() {
            listTeacher({ deptId: -1 }).then((res) => {
                // 将每一项添加到本地数组tableData中 使用了ES6扩展运算符
                this.tableData.push(...res.content);
            });
        },
        // pageSize(每页的条数)改变时调用 val:每页条数
        handleSizeChange(val) {
            this.pageSize = val;
        },
        // currentPage(当前页)改变时调用 val:当前页
        handleCurrentChange(val) {
            this.currentPage = val;
        },
        // 算出当前序列号 index:把当前页的数据看成一个数组,每一项的下标是index currentPage:当前选择的页数, pageSize:每页显示的个数
        indexMethod(index) {
            return (this.currentPage - 1) * this.pageSize + index + 1;
        },
        // 当点击添加辅导员时调用
        addTeacher() {
            this.$prompt("辅导员名:", "增加新辅导员", {
                customClass: "addTeacher",
                cancelButtonText: "取 消",
                confirmButtonText: "确 定",
                center: true,
                inputPlaceholder: "请输入辅导员名",
            })
                .then(({ value }) => {
                    this.$message({
                        type: "success",
                        message: "辅导员增加成功",
                    });
                })
                .catch(() => {});
        },
        // 当点击导入辅导员时调用
        importTeacher() {
            const url = "../../public/teacherImport.png";
            this.$alert(
                `<table style='align-content: center; width: 100%; font-size: 16px'><tr><td align='right' style='width: 100px'>选择文件</td><td align='left'><input type='file' accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'></td></tr><tr><td align='right'>文件模板</td><td align='left'><img src='../../teacherImport.png' style='width: 90%'></td></tr></table>`,
                "导入辅导员",
                {
                    center: true,
                    customClass: "importTeacher",
                    showCancelButton: true,
                    showConfirmButton: false,
                    dangerouslyUseHTMLString: true,
                }
            ).catch(() => {});
        },
    },
};
</script>
