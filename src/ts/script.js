function showByID(formID) {
    var _a;
    document.querySelectorAll(".loginContainer").forEach(function (form) { return form.classList.remove("active"); });
    (_a = document.getElementById(formID)) === null || _a === void 0 ? void 0 : _a.classList.add("active");
}
