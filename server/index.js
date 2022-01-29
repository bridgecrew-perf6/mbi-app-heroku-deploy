"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const express_1 = __importDefault(require("express"));
const env_1 = require("./env");
const mbi_1 = require("./mbi");
const app = express_1.default();
app.use(express_1.default.json());
app.get(['/'], (req, res) => {
    fs_1.default.createReadStream('./client/index.html').pipe(res);
});
app.get('/app.js', (req, res) => {
    res.setHeader("Content-Type", "application/javascript");
    fs_1.default.createReadStream('./client/app.js').pipe(res);
});
app.get('/app.css', (req, res) => {
    res.setHeader("Content-Type", "text/css");
    fs_1.default.createReadStream('./client/app.css').pipe(res);
});
app.get('/format.pdf', (req, res) => {
    res.setHeader("Content-Type", "application/pdf");
    fs_1.default.createReadStream('./client/format.pdf').pipe(res);
});
app.get('/generate', (req, res) => {
    const mbi = mbi_1.MBI.Generate();
    const response = { mbi };
    return res.send(response);
});
app.post('/verify', (req, res) => {
    const request = req.body;
    const mbi = request.mbi;
    const isValid = mbi_1.MBI.Verify(mbi);
    const response = { mbi, isValid };
    return res.send(response);
});
app.listen(env_1.env.port, () => {
    console.log(`App listening at http://${env_1.env.hostname}:${env_1.env.port}`);
});
//# sourceMappingURL=index.js.map