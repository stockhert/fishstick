function showByID(targetID, HTMLElementClass) {
    var _a;
    document.querySelectorAll(HTMLElementClass).forEach(function (element) { return element.classList.remove("active"); });
    (_a = document.getElementById(targetID)) === null || _a === void 0 ? void 0 : _a.classList.add("active");
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
