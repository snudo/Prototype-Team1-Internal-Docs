var popover_content = document.getElementById("document_options");
var document_id = "";

let documents_array = [
    {
        id: 105,
        title: "Hello Ruel",
        viewers: 10,
        editors: 2,
        is_private: false,
        is_starred: false,
        description: "ASUS TUF Gaming F15 is a powerful Windows 10 gaming laptop that combines gaming performance with up to a narrow bezel IPS-type panel and an extended lifespan"
    },
    {
        id: 106,
        title: "Hello Fitz",
        viewers: 5,
        editors: 3,
        is_private: true,
        is_starred: false,
        description: "ASUS TUF Gaming F15 is a powerful Windows 10 gaming laptop that combines gaming performance with up to a narrow bezel IPS-type panel and an extended lifespan"
    },
    {
        id: 107,
        title: "Hello Stan",
        viewers: 1,
        editors: 1,
        is_private: true,
        is_starred: true,
        description: "ASUS TUF Gaming F15 is a powerful Windows 10 gaming laptop that combines gaming performance with up to a narrow bezel IPS-type panel and an extended lifespan"
    },
    {
        id: 108,
        title: "Engineering Guide",
        viewers: 1,
        editors: 1,
        is_private: false,
        is_starred: true,
        description: "ASUS TUF Gaming F15 is a powerful Windows 10 gaming laptop that combines gaming performance with up to a narrow bezel IPS-type panel and an extended lifespan"
    },
    {
        id: 109,
        title: "V88 Paradox",
        viewers: 10,
        editors: 2,
        is_private: false,
        is_starred: true,
        description: "ASUS TUF Gaming F15 is a powerful Windows 10 gaming laptop that combines gaming performance with up to a narrow bezel IPS-type panel and an extended lifespan"
    }
];

let searched_documents = [];

/* CALLBACK FUNCTIONS */

const renderDocuments = (documentations_result) => {
    document.getElementById("document_list_container").innerHTML = "";

    for(let index in documentations_result){
        let document_item = documentations_result[index];
        let cloned_document = document.getElementById("clone").cloneNode(true);

        cloned_document.id = document_item.id;
        cloned_document.querySelectorAll(".document_title")[0].textContent = document_item.title;
        cloned_document.querySelectorAll(".viewers_count")[0].textContent = document_item.viewers;
        cloned_document.querySelectorAll(".editors_count")[0].textContent = document_item.editors;
        cloned_document.querySelectorAll(".document_information p")[0].textContent = document_item.description;

        (document_item.is_private) ? cloned_document.classList.add("is_private") : cloned_document.classList.remove("is_private");
        (document_item.is_starred) ? cloned_document.querySelector("input[type=checkbox]").checked = true : cloned_document.querySelector("input[type=checkbox]").checked = false;

        (document_item.is_starred) ? cloned_document.setAttribute("data-starred", "all_starred") : cloned_document.removeAttribute("data-star");
        (document_item.is_private) ? cloned_document.setAttribute("data-private", "all_private") : cloned_document.removeAttribute("data-private");

        document.getElementById("document_list_container").appendChild(cloned_document);
    }
}

renderDocuments(documents_array);

const starredDocument = (event)=> {
    if(event.target.classList.contains("star_toggle_button")){
        let starred_id = parseInt(event.target.closest("li").getAttribute("id"));
        let selected_document_id = documents_array.find(obj_id => obj_id.id === starred_id);
        let selected_document_index = documents_array.map((obj_index) => obj_index.id).indexOf(starred_id);

        if(selected_document_index !== -1) {
            selected_document_id.is_starred = !event.target.closest("label").querySelector("input[type=checkbox]").checked;
            documents_array[selected_document_index] = selected_document_id;
        }
    }
}

const searchDocumentation = (event) => {
    event.preventDefault();
    let search_input = event.target.value.toLowerCase();

    // Render all if no search_input value
    if (search_input === "") {
        renderDocuments(documents_array);
    }

    // Discontinue if there is no search yet
    if (search_input === null || search_input === "" || searched_documents === []) return;

    // Filter documents_array to get the title based on search input
    searched_documents = documents_array.filter(documentation => documentation.title.toLowerCase().includes(search_input));
    renderDocuments(searched_documents);
}

/* EVENTS */
document.addEventListener("click", starredDocument);
document.getElementById("search_documentation_input").addEventListener("keyup", searchDocumentation);

$(function() {$("#document_list_container").sortable();});