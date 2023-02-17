"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routers_1 = require("./routers");
const apicache = __importDefault(require("./apicache"));
class App {
  constructor() {
    this.cache = apicache.default.options({
      debug: false,
      trackPerformance: false,
    }).middleware;
    this.app = (0, express_1.default)();
    this.app.use((0, cors_1.default)({ origin: true }));
    //this.app.use(this.cache("5 seconds"));
    this.routes();
  }
  listen() {
    const PORT = process.env.PORT || 8080;
    this.app.listen(PORT, () => {
      console.log(`App listening on the port ${PORT}`);
    });
  }
  routes() {
    (0, routers_1.initRoutes)(this.app);
  }
}
exports.default = App;
//# sourceMappingURL=app.js.map
