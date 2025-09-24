document.body.addEventListener("click", (ev) => {
    const titleBar = ev.target.closest(".expandable_title_bar");
    if (!titleBar) return;

    const expandable = titleBar.closest(".expandable");
    expandable.classList.toggle("expandable--open");
});
