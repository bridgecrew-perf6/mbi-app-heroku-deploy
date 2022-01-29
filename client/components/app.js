"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const react_1 = __importDefault(require("react"));
const use_immer_1 = require("use-immer");
const mbi_1 = require("../../server/mbi");
const api_1 = require("../api");
function App() {
    const [state, setState] = use_immer_1.useImmer({
        mbis: [],
        generating: false,
        verifyText: "",
        verifiedMbis: [],
        verifying: false
    });
    return react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("h2", null, "Welcome to MBI App!"),
        react_1.default.createElement("span", null,
            "This app generates and validates Medicare Benficiary Identifiers (MBIs) according to the following specification:",
            react_1.default.createElement("div", null,
                react_1.default.createElement("a", { href: "/format.pdf", target: "_blank" }, "Understanding the Medicare Beneficiary Identifier (MBI) Format"))),
        react_1.default.createElement("div", { style: { border: "1px solid black", marginTop: "1rem", padding: "1rem" } },
            react_1.default.createElement("button", { onClick: generateMBI, disabled: state.generating },
                "Generate a new MBI",
                state.generating ? ' (Generating...)' : ''),
            state.mbis.length > 0 && react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("h3", null, "You've generated the following MBIs:"),
                react_1.default.createElement("ul", null, state.mbis.map((mbi, i) => react_1.default.createElement("li", { key: i, className: i == 0 ? 'most-recent-mbi' : '' }, mbi_1.MBI.Format(mbi)))))),
        react_1.default.createElement("div", { style: { border: "1px solid black", marginTop: "1rem", padding: "1rem" } },
            react_1.default.createElement("button", { onClick: verifyMBI, disabled: state.verifying, style: { marginRight: "0.5rem" } },
                "Verify an MBI:",
                state.verifying ? ' (Verifying...)' : ''),
            react_1.default.createElement("input", { type: "text", placeholder: 'XXXX-XXX-XXXX', onChange: e => { const value = e.currentTarget.value; setState(state => { state.verifyText = value; }); } }),
            state.verifiedMbis.length > 0 && react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("h3", null, "You've verified the following MBIs:"),
                react_1.default.createElement("ul", null, state.verifiedMbis.map((mbi, i) => react_1.default.createElement("li", { key: i, className: `${mbi.isValid ? "valid-mbi" : "invalid-mbi"} ${i == 0 ? 'most-recent-mbi' : ''}` },
                    mbi_1.MBI.Format(mbi.mbi),
                    " is ",
                    mbi.isValid ? "" : "NOT",
                    " valid!"))))));
    async function generateMBI() {
        if (state.generating)
            return;
        setState(state => { state.generating = true; });
        const mbi = await api_1.GetJson("/generate");
        setState(state => {
            state.generating = false;
            state.mbis.unshift(mbi.mbi);
        });
    }
    async function verifyMBI() {
        if (state.generating)
            return;
        setState(state => { state.verifying = true; });
        const mbi = await api_1.PostJson("/verify", { mbi: mbi_1.MBI.Parse(state.verifyText) });
        setState(state => {
            state.verifying = false;
            state.verifiedMbis.unshift(mbi);
        });
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map