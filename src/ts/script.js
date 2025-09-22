function showByID(formID) {
    var _a;
    document.querySelectorAll(".loginContainer").forEach(function (form) { return form.classList.remove("active"); });
    (_a = document.getElementById(formID)) === null || _a === void 0 ? void 0 : _a.classList.add("active");
}
function typeOut(element, delay) {
    if (delay === void 0) { delay = 100; }
    var i = 0;
    var text = element.textContent;
    element.textContent = "";
    function typeCharacter() {
        if (i < text.length) {
            element.textContent += text[i];
            i++;
            setTimeout(typeCharacter, delay);
        }
    }
    typeCharacter();
}
