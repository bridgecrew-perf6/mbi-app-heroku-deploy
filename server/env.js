"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const hostname = process.env.HOSTNAME || "localhost";
const port = process.env.PORT || 3000;
exports.env = {
    hostname,
    port
};
//# sourceMappingURL=env.js.map