
    document.querySelector(".container_contact").addEventListener("submit", function(e) {
    e.preventDefault(); // stops the page from reloading
    const form = e.target;
    const msg = document.createElement("p");
    msg.textContent = "Message sent! We'll reply as soon as we can!";
    msg.style.color = "#C2FCF7";
    msg.style.marginTop = "10px";
    form.appendChild(msg);

    form.reset(); // clear inputs

    // fade out the message after 3 seconds
    setTimeout(() => msg.remove(), 3000);
});