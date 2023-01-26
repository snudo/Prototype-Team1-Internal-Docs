/* CALLBACK FUNCTIONS */
const submitLoginForm = (event) => {
    event.preventDefault();

    let login_form         = new FormData(event.target);
    let login_form_entries = login_form.entries();
    let login_details      = Object.fromEntries(login_form_entries);

    if(login_details.user_type === "admin"){
        window.location.href = "/web-frontend/views/admin/docs.html";
    }
};

/* EVENTS */
document.getElementById("login_form").addEventListener("submit", submitLoginForm);