// loginController.ts

const loginForm = document.getElementById("loginForm") as HTMLFormElement;
const signupForm = document.getElementById("signupForm") as HTMLFormElement;
const messageBox = document.getElementById("message") as HTMLElement;

// auto-redirect if already logged in
(async () => {
    try {
        const res = await fetch("http://localhost:3000/me", {
            credentials: "include"
        });
        const data = await res.json();

        if (res.ok && data.authenticated) {
            window.location.href = "mainPage.html";
        }
    } catch {}
})();

// ------------ SIGNUP ------------
signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = (document.getElementById("signupUsername") as HTMLInputElement).value;
    const email = (document.getElementById("signupEmail") as HTMLInputElement).value;
    const password = (document.getElementById("signupPassword") as HTMLInputElement).value;
    const rPassword = (document.getElementById("signupRepeatPassword") as HTMLInputElement).value;

    if (password !== rPassword) {
        messageBox.textContent = "Passwords do not match.";
        return;
    }

    const res = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, email })
    });

    const data = await res.json();
    messageBox.textContent = data.message || JSON.stringify(data);
});

// ------------ LOGIN ------------
loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = (document.getElementById("loginUsername") as HTMLInputElement).value.trim();
    const email = (document.getElementById("loginEmail") as HTMLInputElement).value.trim();
    const password = (document.getElementById("loginPassword") as HTMLInputElement).value.trim();

    let identifierType: "email" | "username" | null = null;
    let identifier = "";

    if (email && !username) {
        identifierType = "email";
        identifier = email;
    } else if (username && !email) {
        identifierType = "username";
        identifier = username;
    } else {
        messageBox.textContent = "Please fill in either username OR email (not both).";
        return;
    }

    const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ identifier, password, identifierType })
    });

    const data = await res.json();
    messageBox.textContent = data.message || JSON.stringify(data);

    if (res.ok && data.success) {
        window.location.href = "mainPage.html";
    }
});

// ------------ logout optional ------------
(window as any).logout = async function () {
    try {
        await fetch("http://localhost:3000/logout", {
            method: "POST",
            credentials: "include"
        });
        window.location.href = "login.html";
    } catch {}
};
