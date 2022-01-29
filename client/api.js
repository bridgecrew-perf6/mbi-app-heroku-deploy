"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostJson = exports.GetJson = void 0;
async function GetJson(url) {
    return (await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "same-origin"
    })).json();
}
exports.GetJson = GetJson;
async function PostJson(url, body) {
    return (await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "same-origin",
        body: JSON.stringify(body)
    })).json();
}
exports.PostJson = PostJson;
//# sourceMappingURL=api.js.map