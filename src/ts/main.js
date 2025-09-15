function typeOut(text, element, delay) {
    if (delay === void 0) { delay = 50; }
    var i = 0;
    function typeCharacter() {
        if (i < text.length) {
            element.textContent += text[i];
            i++;
            setTimeout(typeCharacter, delay);
        }
    }
    typeCharacter();
}
