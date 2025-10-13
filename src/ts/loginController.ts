const loginForm = document.getElementById("loginForm") as HTMLElement
const signupForm = document.getElementById("signupForm") as HTMLElement
const messageBox = document.getElementById("message") as HTMLElement

//signup handling
signupForm.addEventListener("submit", async (i) => {
    i.preventDefault();
    const username = (document.getElementById("signupUsername") as HTMLInputElement).value;
    const email = (document.getElementById("signupEmail") as HTMLInputElement).value;
    const password = (document.getElementById("signupPassword") as HTMLInputElement).value;
    const rPassword = (document.getElementById("signupRepeatPassword") as HTMLInputElement).value;

    if (password == rPassword){
        const res = await fetch("http://localhost:3000/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password, email}),
        })
        const data = await res.json();
        messageBox.textContent = data.message || JSON.stringify(data);
    }
    else{
        messageBox.textContent = "fail"
    }

})

//login handling
loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = (document.getElementById("loginUsername") as HTMLInputElement).value.trim();
    const email = (document.getElementById("loginEmail") as HTMLInputElement).value.trim();
    const password = (document.getElementById("loginPassword") as HTMLInputElement).value.trim();

    let identifierType: "email" | "username" | null = null;
    let identifier: string = "";

    if (email && !username) {
        identifier = email;
        identifierType = "email";
    } else if (username && !email) {
        identifier = username;
        identifierType = "username";
    } else {
        messageBox.textContent = "Please fill in *either* username or email (not both).";
        return;
    }

    const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password, identifierType }),
    });

    const data = await res.json();
    messageBox.textContent = data.message || JSON.stringify(data);
});
