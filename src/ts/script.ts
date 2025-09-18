function showByID(formID: string): void {
    document.querySelectorAll<HTMLElement>(".loginContainer").forEach(form => form.classList.remove("active"));
    document.getElementById(formID)?.classList.add("active");
}