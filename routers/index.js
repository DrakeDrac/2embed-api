"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initRoutes = void 0;
const home_1 = __importDefault(require("./api/home"));
const details_1 = __importDefault(require("./api/details"));
const search_1 = __importDefault(require("./api/search"));
const episodes_1 = __importDefault(require("./api/episodes"));
const get_source_1 = __importDefault(require("./api/get_source"));
const initRoutes = (app) => {
    app.use("/api", home_1.default);
    app.use("/api", details_1.default);
    app.use("/api", search_1.default);
    app.use("/api", episodes_1.default);
    app.use("/api", get_source_1.default);
};
exports.initRoutes = initRoutes;
//# sourceMappingURL=index.js.map