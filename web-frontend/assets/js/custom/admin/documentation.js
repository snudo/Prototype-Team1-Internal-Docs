var popover_content = document.getElementById("document_options");

/* CALLBACK FUNCTIONS */
const showPopover = (item) => {
    new bootstrap.Popover(item, {
        animation: true,
        container: "body",
        content: popover_content,
        html: true,
    });
}

const getDocumentValue = (event) => {
    if(event.keyCode === 13) {
        let cloned_document = document.getElementById("clone").cloneNode(true);
        let document_title  = document.createElement("span"); 

        if(event.target.value.length){
            event.target.closest("label").classList.remove("input_error");
            document_title.textContent = event.target.value;

            cloned_document.querySelectorAll("h2")[0].prepend(document_title);
            document.getElementById("document_list_container").append(cloned_document);
            event.target.value = "";

            showPopover(cloned_document.querySelector(".documents_menu"));
        }
        else{
            event.target.closest("label").classList.add("input_error");
        }
    }
}


/* EVENTS */
document.addEventListener("click", function(event){
    if(event.target.closest(".star_toggle_button")){
        event.target.classList.toggle("starred");
    }
})

document.querySelectorAll(".documents_menu").forEach((item) => showPopover(item));

document.getElementById("add_documentation_input").addEventListener("keyup", getDocumentValue);