import { POST } from "./server";

// 将url和参数传给POST
export let studentLogin = function (params) {
    return POST("/student/login", params);
};
