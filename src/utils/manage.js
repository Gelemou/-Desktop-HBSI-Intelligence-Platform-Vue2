import { POST } from "./server";

// 管理员登陆
export const adminLogin = (params) => {
    return POST("/manager/adminLogin", params);
};
// 新增辅导员
export const saveTeacher = (params) => {
    return POST("/manager/saveTeacher", params);
};
// 辅导员配置列表
export const listTeacher = (params) => {
    return POST("/manager/listTeacher", params);
};
// 根据系部id获取专业列表
export const majorList = (params) => {
    return POST("/major/list", params);
};
// 获取年级列表
export const currentDate = (params) => {
    return POST("/manager/currentDate", params);
};
// 根据年级获取班级列表
export const listByYear = (params) => {
    return POST("/classes/listByYear", params);
};
// 获取学年列表(假定给一个studentId)
export const listGrade = (params) => {
    return POST("/student/listGrade", params);
};
// 获取审核列表(index3)
export const applyList = (params) => {
    return POST("/student/applyList", params);
};
// 获取个人成绩单
export const scoreReport = (params) => {
    return POST("/score/scoreReport", params);
};
// 分值统计列表(index2, index4)
export const summaryList = (params) => {
    return POST("/summary/list", params);
};
// 柱状图—按班级
export const barClass = (params) => {
    return POST("/summary/barClass", params);
};
// 获取学生的基本信息(个人雷达图使用)
export const gradeById = (params) => {
    return POST("/student/gradeById", params);
};
// 获取某学生某年份的评分详情(表格数据)
export const detailToStatistic = (params) => {
    return POST("/score/detailToStatistics", params);
};
// 导出分值统计列表
export const summaryExport = (params) => {
    return POST("/summary/list", params);
};
