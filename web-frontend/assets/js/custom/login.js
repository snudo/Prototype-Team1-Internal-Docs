/* CALLBACK FUNCTIONS */
const submitLoginForm = (event) => {
    event.preventDefault();

    /* 
    let login_form         = new FormData(event.target);
    let login_form_entries = login_form.entries();
    let login_details      = Object.fromEntries(login_form_entries);
    */

    /* Get params from URL of current Page */
    let url_obj = new URL((window.location.href).toLowerCase());

    window.location.href = (url_obj.searchParams.get("type") === "admin") ? "/web-frontend/views/admin/docs.html?size=7" : "/web-frontend/views/user/docs.html?size=7";
};

/* EVENTS */
document.getElementById("login_form").addEventListener("submit", submitLoginForm);