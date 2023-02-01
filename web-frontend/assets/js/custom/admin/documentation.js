var popover_content = document.getElementById("document_options");
var confirm_modal = document.getElementById("confirm_private_modal");
var confirm_private_modal = new bootstrap.Modal(confirm_modal, {});
var document_id = "";
var selected_document = "";

let documents_array = [
    {
        id: 105,
        title: "Hello Ruel",
        viewers: 10,
        editors: 2,
        is_private: false,
        is_starred: true,
        description: "ASUS TUF Gaming F15 is a powerful Windows 10 gaming laptop that combines gaming performance with up to a narrow bezel IPS-type panel and an extended lifespan",
        is_archived: 0
    },
    {
        id: 106,
        title: "Hello Fitz",
        viewers: 5,
        editors: 3,
        is_private: true,
        is_starred: false,
        description: "ASUS TUF Gaming F15 is a powerful Windows 10 gaming laptop that combines gaming performance with up to a narrow bezel IPS-type panel and an extended lifespan",
        is_archived: 0
    },
    {
        id: 107,
        title: "Hello Stan",
        viewers: 1,
        editors: 1,
        is_private: true,
        is_starred: false,
        description: "ASUS TUF Gaming F15 is a powerful Windows 10 gaming laptop that combines gaming performance with up to a narrow bezel IPS-type panel and an extended lifespan",
        is_archived: 0
    }
];

let archived_document = [
    {
        id: 34,
        title: "Archived Document",
        viewers: 1,
        editors: 1,
        is_private: true,
        is_starred: false,
        description: "ASUS TUF Gaming F15 is a powerful Windows 10 gaming laptop that combines gaming performance with up to a narrow bezel IPS-type panel and an extended lifespan",
        is_archived: 1
    },
    {
        id: 35,
        title: "Archived Document 2",
        viewers: 1,
        editors: 1,
        is_private: true,
        is_starred: false,
        description: "ASUS TUF Gaming F15 is a powerful Windows 10 gaming laptop that combines gaming performance with up to a narrow bezel IPS-type panel and an extended lifespan",
        is_archived: 1
    }
]

const renderDocuments = (documents_list) => {
    document.getElementById("document_list_container").innerHTML = "";
    documents_list = [...new Map(documents_list.map(item => [item["id"], item])).values()];

    if(documents_list.length){
        document.getElementById("no_data_logo").setAttribute("hidden", "hidden");

        documents_list = [...new Map(documents_list.map(item => [item["id"], item])).values()];

        for(let index in documents_list){
            let document_item = documents_list[index];
            let cloned_document = document.getElementById("clone").cloneNode(true);

            cloned_document.id = document_item.id;
            cloned_document.querySelectorAll(".document_title")[ITEMS.first].textContent = document_item.title;
            cloned_document.querySelectorAll(".viewers_count")[ITEMS.first].textContent = document_item.viewers;
            cloned_document.querySelectorAll(".editors_count")[ITEMS.first].textContent = document_item.editors;
            cloned_document.querySelectorAll(".document_information p")[ITEMS.first].textContent = document_item.description;

            (document_item.is_private) ? cloned_document.classList.add("is_private") : cloned_document.classList.remove("is_private");
            (document_item.is_starred) ? cloned_document.querySelector("input[type=checkbox]").checked = true : cloned_document.querySelector("input[type=checkbox]").checked = false;

            (document_item.is_starred) ? cloned_document.setAttribute("data-starred", "all_starred") : cloned_document.removeAttribute("data-star");
            (document_item.is_private) ? cloned_document.setAttribute("data-private", "all_private") : cloned_document.removeAttribute("data-private");

            document.getElementById("document_list_container").appendChild(cloned_document);

            new bootstrap.Popover(cloned_document.querySelector(".documents_menu"), {
                animation: true,
                container: "body",
                content: popover_content,
                html: true,
                trigger: "focus",
                delay: {"hide": ANIMATION_TIME.hide}
            });
        }
    }
    else{
        document.getElementById("no_data_logo").removeAttribute("hidden");
    }
}

renderDocuments(documents_array);

/* CALLBACK FUNCTIONS */

const getDocumentValue = (event) => {
    event.preventDefault();
    if(event.keyCode === 13) {
        if(event.target.value.length){
            let timestamp = new Date().getUTCMilliseconds();

            documents_array.push({
                id: timestamp,
                title: event.target.value,
                viewers: 0,
                editors: 0,
                is_private: false,
                is_starred: false,
                description:"",
            });

            event.target.value = "";
            document.getElementById("documents_category_selection").innerHTML = "Show All";
            renderDocuments(documents_array);
        }
        else{
            event.target.closest("label").classList.add("input_error");
        }
    }
}

const DuplicateDocument = (event)=> {
    if(event.target.classList == "documents_menu"){
        let document_id = parseInt(event.target.closest("li").getAttribute("id"));

        selected_document = documents_array.find(obj_id => obj_id.id === document_id);
        document.getElementById(event.target.getAttribute("aria-describedby")).querySelector(".public_document input[type=checkbox]").checked = !selected_document.is_private;
    }
}

const applySettings = (event)=> {
    if(event.target.classList == "duplicate_document"){
        let duplicated_object = {
            id: new Date().getUTCMilliseconds(),
            title: selected_document.title,
            viewers: selected_document.viewers,
            editors: selected_document.editors,
            is_private: selected_document.is_private,
            is_starred: selected_document.is_starred,
            description: selected_document.description,
        };

        confirm_modal.querySelector(".public_private_content").textContent = "duplicate "+selected_document.title;
        confirm_private_modal.show();

        confirm_modal.querySelector("#confirm_button_yes").addEventListener("click", function(){
            documents_array.push(duplicated_object);

            confirm_private_modal.hide();
            renderDocuments(documents_array);
        });
    }else if(event.target.classList == "archive_document"){
        documents_array.splice(documents_array.map((obj_index) => obj_index.id).indexOf(selected_document.id), 1);
        renderDocuments(documents_array);
    }else if(event.target.classList == "remove_document"){
        documents_array.splice(documents_array.map((obj_index) => obj_index.id).indexOf(selected_document.id), 1);
        renderDocuments(documents_array);
    }else if(event.target.classList == "public_document"){
        let is_private = event.target.closest("li").querySelector(".public_checkbox_setting").checked;

        confirm_modal.querySelector(".public_private_content").textContent = (is_private) ? "private" : "public";
        confirm_private_modal.show();

        confirm_modal.querySelector("#confirm_button_yes").addEventListener("click", function(){
            let selected_document_index = documents_array.map((obj_index) => obj_index.id).indexOf(selected_document.id);

            (is_private) ? documents_array[selected_document_index].is_private = true : documents_array[selected_document_index].is_private = false;

            renderDocuments(documents_array);
            confirm_private_modal.hide();
        });
    }
}

const starredDocument = (event)=> {
    if(event.target.classList.contains("star_toggle_button")){
        let starred_id = parseInt(event.target.closest("li").getAttribute("id"));
        let selected_document_id = documents_array.find(obj_id => obj_id.id === starred_id);
        let selected_document_index = documents_array.map((obj_index) => obj_index.id).indexOf(starred_id);

        if(selected_document_index !== -1) {
            selected_document_id.is_starred = !event.target.closest("label").querySelector("input[type=checkbox]").checked;

            /* If Starred, put to starred group at the start of array */
            documents_array.splice(selected_document_index, 1);

            /* Get last index of starred */
            let last_starred_index = documents_array.findLastIndex((doc_obj) => doc_obj.is_starred);
            documents_array.splice(last_starred_index+1, 0, selected_document_id);

            renderDocuments(documents_array);
        }
    }
}

const FilterDocuments = (event)=> {
    let filtered_documents = [];
    document.getElementById("documents_category_selection").innerHTML = "Show " + event.target.innerHTML;

    if(event.target.getAttribute("data-selection") === "data-documents"){
        renderDocuments(documents_array);
    }
    else if(event.target.getAttribute("data-selection") === "data-starred"){
        filtered_documents = documents_array.filter(document => document.is_starred);
        renderDocuments(filtered_documents);
    }
    else if(event.target.getAttribute("data-selection") === "data-private"){
        filtered_documents = documents_array.filter(document => document.is_private);
        renderDocuments(filtered_documents);
    }
    else if(event.target.getAttribute("data-selection") === "data-public"){
        filtered_documents = documents_array.filter(document => !document.is_private);
        renderDocuments(filtered_documents);
    }
    else if(event.target.getAttribute("data-selection") === "data-archive"){
        renderDocuments(archived_document);
    }
}

/* EVENTS */
document.addEventListener("click", applySettings);
document.addEventListener("click", starredDocument);
document.addEventListener("click", DuplicateDocument);
document.getElementById("filter_dropdown_menu").addEventListener("click", FilterDocuments);
document.getElementById("add_documentation_input").addEventListener("keyup", getDocumentValue);

$(function() {$("#document_list_container").sortable();});