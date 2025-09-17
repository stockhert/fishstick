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
