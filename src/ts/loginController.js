// loginController.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var loginForm = document.getElementById("loginForm");
var signupForm = document.getElementById("signupForm");
var messageBox = document.getElementById("message");
// auto-redirect if already logged in
(function () { return __awaiter(_this, void 0, void 0, function () {
    var res, data, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                return [4 /*yield*/, fetch("http://localhost:3000/me", {
                        credentials: "include"
                    })];
            case 1:
                res = _b.sent();
                return [4 /*yield*/, res.json()];
            case 2:
                data = _b.sent();
                if (res.ok && data.authenticated) {
                    window.location.href = "mainPage.html";
                }
                return [3 /*break*/, 4];
            case 3:
                _a = _b.sent();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); })();
// ------------ SIGNUP ------------
signupForm.addEventListener("submit", function (e) { return __awaiter(_this, void 0, void 0, function () {
    var username, email, password, rPassword, res, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                e.preventDefault();
                username = document.getElementById("signupUsername").value;
                email = document.getElementById("signupEmail").value;
                password = document.getElementById("signupPassword").value;
                rPassword = document.getElementById("signupRepeatPassword").value;
                if (password !== rPassword) {
                    messageBox.textContent = "Passwords do not match.";
                    return [2 /*return*/];
                }
                return [4 /*yield*/, fetch("http://localhost:3000/signup", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ username: username, password: password, email: email })
                    })];
            case 1:
                res = _a.sent();
                return [4 /*yield*/, res.json()];
            case 2:
                data = _a.sent();
                messageBox.textContent = data.message || JSON.stringify(data);
                return [2 /*return*/];
        }
    });
}); });
// ------------ LOGIN ------------
loginForm.addEventListener("submit", function (e) { return __awaiter(_this, void 0, void 0, function () {
    var username, email, password, identifierType, identifier, res, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                e.preventDefault();
                username = document.getElementById("loginUsername").value.trim();
                email = document.getElementById("loginEmail").value.trim();
                password = document.getElementById("loginPassword").value.trim();
                identifierType = null;
                identifier = "";
                if (email && !username) {
                    identifierType = "email";
                    identifier = email;
                }
                else if (username && !email) {
                    identifierType = "username";
                    identifier = username;
                }
                else {
                    messageBox.textContent = "Please fill in either username OR email (not both).";
                    return [2 /*return*/];
                }
                return [4 /*yield*/, fetch("http://localhost:3000/login", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        credentials: "include",
                        body: JSON.stringify({ identifier: identifier, password: password, identifierType: identifierType })
                    })];
            case 1:
                res = _a.sent();
                return [4 /*yield*/, res.json()];
            case 2:
                data = _a.sent();
                messageBox.textContent = data.message || JSON.stringify(data);
                if (res.ok && data.success) {
                    window.location.href = "mainPage.html";
                }
                return [2 /*return*/];
        }
    });
}); });
// ------------ logout optional ------------
window.logout = function () {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetch("http://localhost:3000/logout", {
                            method: "POST",
                            credentials: "include"
                        })];
                case 1:
                    _b.sent();
                    window.location.href = "login.html";
                    return [3 /*break*/, 3];
                case 2:
                    _a = _b.sent();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
};
