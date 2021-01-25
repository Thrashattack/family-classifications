"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var app_1 = __importDefault(require("./app"));
var port = process.env.PORT || 3333;
try {
    app_1["default"].listen(port, function () {
        console.log("\u26A1\uFE0F Server listening on http://localhost:" + port);
    });
}
catch (e) {
    console.log(JSON.stringify(e) || e);
}
