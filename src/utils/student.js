import { POST } from "./server";

// 登陆
// 将url和参数传给POST
export const studentLogin = function (params) {
    return POST("/student/login", params);
};

// 获取学年信息
export const getGradeYears = function (params) {
    return POST("/student/listGrade", params);
};
