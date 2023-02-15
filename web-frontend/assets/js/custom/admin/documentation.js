var popover_content = document.getElementById("document_options");
var confirm_modal = document.getElementById("confirm_modal");
var confirm_action_modal = new bootstrap.Modal(confirm_modal, {});
var document_id = "";
var selected_document = "";

/* Get params from URL of current Page */
let url_obj = new URL((window.location.href).toLowerCase());
let doc_count = url_obj.searchParams.get("size") || 3;
let documents_array = [
    {
        id: 105,
        title: "Ruel's Document",
        viewers: 10,
        editors: 2,
        is_private: false,
        is_starred: true,
        is_archived: 0,
        description: "My Experience in Village88 they taught me how to design a web UI/UX in 3 months."
    },
    {
        id: 106,
        title: "Fitz's Document",
        viewers: 5,
        editors: 3,
        is_private: true,
        is_starred: true,
        is_archived: 0,
        description: "Village88 gave me an opportunity to start a new career as a Software Engineer."
    },
    {
        id: 107,
        title: "Stan's Document",
        viewers: 1,
        editors: 1,
        is_private: true,
        is_starred: true,
        is_archived: 0,
        description: "The way to Village88 was not easy. Every task during my training was always under time pressure."
    },
    {
        id: 108,
        title: "Jessie's Document",
        viewers: 7,
        editors: 1,
        is_private: false,
        is_starred: true,
        is_archived: 0,
        description: "I had previous jobs before Village88, but then I felt like I wasn't learning anything from it anymore."
    },
    {
        id: 109,
        title: "Bylaws",
        viewers: 17,
        editors: 12,
        is_private: true,
        is_starred: false,
        is_archived: 0,
        description: "Bylaws are the laws that the company has established to keep the organisation in control and in regulation. A company’s bylaws are the direct guidance given by the authority of a company."
    },
    {
        id: 110,
        title: "Non-Disclosure Agreement",
        viewers: 2,
        editors: 1,
        is_private: false,
        is_starred: false,
        is_archived: 0,
        description: "This information is very critical to the company and if leaked could cost a fortune. Companies, therefore, ask employees to handle confidential company information to sign a non-disclosure agreement."
    },
    {
        id: 111,
        title: "Operating Agreement",
        viewers: 107,
        editors: 25,
        is_private: true,
        is_starred: false,
        is_archived: 0,
        description: "An Operating Agreement LLC is a key legal document that is necessary for every LLC with more than 2 or 3 members. Though it is not a legal document, it helps define the process of decision making among key operating authorities."
    },
    {
        id: 112,
        title: "Minutes of Meeting",
        viewers: 17,
        editors: 12,
        is_private: true,
        is_starred: false,
        is_archived: 0,
        description: "Minutes of the meeting captures the happenings of a meeting in detail and used as a referring document for the consecutive meetings."
    },
    {
        id: 113,
        title: "Employment Agreement",
        viewers: 170,
        editors: 2,
        is_private: false,
        is_starred: false,
        is_archived: 0,
        description: "This agreement sets the ground rules of the relationship between the organisation and the employee. The culture and the vision of the company can be seen in action in the employee agreement."
    },
    {
        id: 114,
        title: "Business plans",
        viewers: 10,
        editors: 1,
        is_private: true,
        is_starred: false,
        is_archived: 0,
        description: "A business plan, as the name suggests, is the plan for your business on paper. Before creating a business plan do thorough research, analyze the market, your competitors, understand how you will target the customers in your market. It offers clarity on what your business is, its opportunities and the roadmap that will lead you there."
    },
    {
        id: 115,
        title: "Business Reports",
        viewers: 17,
        editors: 1,
        is_private: false,
        is_starred: false,
        is_archived: 0,
        description: "Business reports are facts and figures about certain departments. It includes aspects of your business that exist as company data, which, after analysis can derive outcomes and projections."
    },
    {
        id: 116,
        title: "Financial Agreement",
        viewers: 20,
        editors: 12,
        is_private: true,
        is_starred: false,
        is_archived: 0,
        description: "As a business owner, you must have a strong grasp of your company’s finances. It is important to know whether you are within budget, making profits or spiralling losses."
    },
    {
        id: 117,
        title: "Transactional Documents",
        viewers: 17,
        editors: 12,
        is_private: true,
        is_starred: false,
        is_archived: 0,
        description: "One of the key factors in keeping your company’s financial statements organised is through the maintenance of transactional documents."
    },
    {
        id: 118,
        title: "Business Insurance",
        viewers: 107,
        editors: 3,
        is_private: false,
        is_starred: false,
        is_archived: 0,
        description: "Businesses are prone to risks all the time and having business insurance gives you the safety net for the same."
    },
    {
        id: 119,
        title: "Partnership Agreement",
        viewers: 18,
        editors: 1,
        is_private: true,
        is_starred: false,
        is_archived: 0,
        description: "The agreement essentially keeps all the partners in tandem to the agreed terms of working without any deviation and disagreements."
    },
    {
        id: 120,
        title: "Co-founder Agreement",
        viewers: 5,
        editors: 2,
        is_private: false,
        is_starred: false,
        is_archived: 0,
        description: "The Co-founder agreement is prepared across more than one founder and highlights the rules and obligations and share of each of the partners."
    },
    {
        id: 121,
        title: "Business Pitch Deck",
        viewers: 50,
        editors: 2,
        is_private: false,
        is_starred: false,
        is_archived: 0,
        description: "New companies should create a powerful and insightful pitch deck that will essentially capture the essence of the company."
    },
    {
        id: 122,
        title: "Investor Agreement",
        viewers: 5,
        editors: 2,
        is_private: false,
        is_starred: false,
        is_archived: 0,
        description: "Investments are critical to companies along with their different growth phases. An investor agreement is prepared for documenting subscription of shares against the investments done."
    },
    {
        id: 123,
        title: "Board Resolutions",
        viewers: 25,
        editors: 7,
        is_private: false,
        is_starred: false,
        is_archived: 0,
        description: "Board Resolutions are decisions taken in a board meeting and form a part of the documentation for further reference."
    },
    {
        id: 124,
        title: "ESOPs Agreement",
        viewers: 5,
        editors: 2,
        is_private: false,
        is_starred: false,
        is_archived: 0,
        description: "Employee stock option plans, also known as ESOPsare the stocks offered by a company to its employees at a discounted price."
    },
    {
        id: 125,
        title: "Accounting Agreement",
        viewers: 3,
        editors: 1,
        is_private: true,
        is_starred: false,
        is_archived: 0,
        description: "Accounting agreement is a document of mutual understanding between the bookkeeper and the company, discussing services and arrangements."
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
        is_archived: 1,
        description: "ASUS TUF Gaming F15 is a powerful Windows 10 gaming laptop that combines gaming performance with up to a narrow bezel IPS-type panel and an extended lifespan"
    },
    {
        id: 35,
        title: "Archived Document 2",
        viewers: 1,
        editors: 1,
        is_private: true,
        is_starred: false,
        is_archived: 1,
        description: "ASUS TUF Gaming F15 is a powerful Windows 10 gaming laptop that combines gaming performance with up to a narrow bezel IPS-type panel and an extended lifespan"
    }
]

let documentations_list_by_size = documents_array.slice(0, doc_count);
let filtered_documents = [];

/*Set search and add document forms stick or fixed on top*/
window.addEventListener("scroll", () => {
    let form_container = document.getElementById("form_container");
    (this.scrollY > 40) ? form_container.classList.add("floated") : form_container.classList.remove("floated");
});

const renderDocuments = (documents_list, active_index = false) => {
    document.getElementById("document_list_container").innerHTML = "";

    if(documents_list.length && doc_count > 0){
        document.getElementById("no_data_logo").setAttribute("hidden", "hidden");
        document.getElementById("documents_category_selection").removeAttribute("hidden");
        let documents_index = [...new Map(documents_list.map(item => [item["id"], item])).values()];

        for(let index in documents_index){
            let document_item = documents_index[index];
            let cloned_document = document.getElementById("clone").cloneNode(true);

            cloned_document.id = document_item.id;
            cloned_document.querySelectorAll(".document_title")[ITEMS.first].textContent = document_item.title;
            cloned_document.querySelectorAll(".viewers_count")[ITEMS.first].textContent = document_item.viewers;
            cloned_document.querySelectorAll(".editors_count")[ITEMS.first].textContent = document_item.editors;
            cloned_document.querySelectorAll(".document_information p")[ITEMS.first].textContent = document_item.description;

            cloned_document.setAttribute("title", document_item.title);

            (document_item.is_private) ? cloned_document.classList.add("is_private") : cloned_document.classList.remove("is_private");
            (document_item.is_starred) ? cloned_document.querySelector("input[type=checkbox]").checked = true : cloned_document.querySelector("input[type=checkbox]").checked = false;

            (document_item.is_starred) ? cloned_document.setAttribute("data-starred", "all_starred") : cloned_document.removeAttribute("data-star");
            (document_item.is_private) ? cloned_document.setAttribute("data-private", "all_private") : cloned_document.removeAttribute("data-private");

            (parseInt(index) === active_index) ? cloned_document.classList.add("active") : null;

            document.getElementById("document_list_container").appendChild(cloned_document);

            new bootstrap.Popover(cloned_document.querySelector(".documents_menu"), {
                animation: true,
                container: "body",
                content: popover_content,
                html: true,
                trigger: "focus",
                delay: {"hide": ANIMATION_TIME.hide}
            });

            cloned_document.querySelector(".document_cards").addEventListener('click', (event) => {
                if(event.target.classList.contains("all_access_count")){
                    window.location.href = "/web-frontend/views/admin/sections.html?size=7&invite_open=true";
                }
                else if(event.target.classList.contains("star_toggle_button")){
                    event.preventDefault();
                    event.stopPropagation();
                    starredDocument(event);
                    return false;
                }
                else if(event.target.classList.contains("documents_menu")){
                    event.preventDefault();
                    event.stopPropagation();

                    let document_id = parseInt(event.target.closest("li").getAttribute("id"));
                    selected_document = documentations_list_by_size.find(obj_id => obj_id.id === document_id);

                    return false;
                }
                else{
                    window.location.href = "/web-frontend/views/admin/sections.html?size=7";
                }
            });
        }
    }
    else{
        document.getElementById("documents_category_selection").setAttribute("hidden", "hidden");
        document.getElementById("no_data_logo").removeAttribute("hidden");
    }
}

renderDocuments(documentations_list_by_size);

/* CALLBACK FUNCTIONS */
const getDocumentValue = (event) => {
    event.preventDefault();
    let add_document_input_field = document.querySelector("#add_documentation_label");

    /* Remove red border */
    add_document_input_field.classList.remove("input_error");
    let form_input = document.querySelector("#add_documentation_input");
    
    if(form_input.value.length){
        window.location.href = "/web-frontend/views/admin/sections.html?size=0&title="+encodeURIComponent(form_input.value);
        let timestamp = new Date().getUTCMilliseconds();

        /* UX Changed
        documentations_list_by_size.splice(doc_count, 0, {
            id: timestamp,
            title: form_input.value,
            viewers: 0,
            editors: 0,
            is_private: false,
            is_starred: false,
            description:"",
        });

        form_input.value = "";
        document.getElementById("documents_category_selection").innerHTML = "Show All";
        doc_count++;

        renderDocuments(documentations_list_by_size);
        preventPageRedirect();
        setPopUpPrivate();
        */
    }
    else{
        add_document_input_field.classList.add("input_error");
    }

    return false;
}

const fixInputOnScroll = ()=> {
    window.onscroll = function() {

    }
};
fixInputOnScroll();

const DuplicateDocument = (event)=> {
    if(event.target.classList == "documents_menu"){
        let document_id = parseInt(event.target.closest("li").getAttribute("id"));

        selected_document = documentations_list_by_size.find(obj_id => obj_id.id === document_id);
        document.getElementById(event.target.getAttribute("aria-describedby")).querySelector(".public_document input[type=checkbox]").checked = !selected_document.is_private;
    }
}

const applySettings = (event)=> {
    if(event.target.classList == "duplicate_document"){
        let duplicated_object = {
            id: new Date().getUTCMilliseconds(),
            title: "Copy of " + selected_document.title,
            viewers: selected_document.viewers,
            editors: selected_document.editors,
            is_private: selected_document.is_private,
            is_starred: selected_document.is_starred,
            description: selected_document.description,
        };

        detectConfirmationModal(event.target.getAttribute("data-action"));
        confirm_modal.querySelector(".message_content").textContent = "duplicate "+selected_document.title;
        confirm_action_modal.show();

        confirm_modal.querySelector("#confirm_button_yes").addEventListener("click", function(){
            let index = documentations_list_by_size.map((obj_index) => obj_index.id).indexOf(selected_document.id) + 1;
            documentations_list_by_size.splice(index, ITEMS.first, duplicated_object);
            renderDocuments(documentations_list_by_size, index);

            confirm_action_modal.hide();
            document.getElementById("documents_category_selection").innerHTML = "Show All";
        });
    }else if(event.target.classList == "archive_document"){
        confirm_modal.querySelector(".message_content").textContent = `archive ${selected_document.title} documentation`;
        detectConfirmationModal(event.target.getAttribute("data-action"));
        confirm_action_modal.show();

        confirm_modal.querySelector("#confirm_button_yes").addEventListener("click", function(){
            archived_document.push(selected_document);
            documentations_list_by_size.splice(documentations_list_by_size.map((obj_index) => obj_index.id).indexOf(selected_document.id), 1);
            renderDocuments(documentations_list_by_size);
            detectConfirmationModal(event.target.getAttribute("data-action"));
            confirm_action_modal.hide();
            document.getElementById("documents_category_selection").innerHTML = "Show All";
        });
    }else if(event.target.classList == "remove_document"){
        confirm_modal.querySelector(".message_content").textContent = `remove ${selected_document.title} documentation`;
        detectConfirmationModal(event.target.getAttribute("data-action"));
        confirm_action_modal.show();

        confirm_modal.querySelector("#confirm_button_yes").addEventListener("click", function(){
            documentations_list_by_size.splice(documentations_list_by_size.map((obj_index) => obj_index.id).indexOf(selected_document.id), 1);
            renderDocuments(documentations_list_by_size);

            confirm_action_modal.hide();
            document.getElementById("documents_category_selection").innerHTML = "Show All";
        });
    }else if(event.target.classList == "public_document"){
        let is_private = event.target.closest("li").querySelector(".public_checkbox_setting").checked;
        let private_public_type = (selected_document.is_private) ? "public" : "private";

        confirm_modal.querySelector(".message_content").textContent = `set ${selected_document.title} to ${private_public_type}`;
        detectConfirmationModal(private_public_type);
        confirm_action_modal.show();
        
        confirm_modal.querySelector("#confirm_button_yes").addEventListener("click", function(){
            let selected_document_index = documentations_list_by_size.map((obj_index) => obj_index.id).indexOf(selected_document.id);
            (is_private) ? documentations_list_by_size[selected_document_index].is_private = true : documentations_list_by_size[selected_document_index].is_private = false;
            renderDocuments(documentations_list_by_size);

            confirm_action_modal.hide();
            document.getElementById("documents_category_selection").innerHTML = "Show All";
        });
    }else if(event.target.classList == "favorite_document"){
        let starred_id = selected_document.id;
        let selected_document_id = documentations_list_by_size.find(obj_id => obj_id.id === starred_id);
        let selected_document_index = documentations_list_by_size.map((obj_index) => obj_index.id).indexOf(starred_id);
        
        if(selected_document_index !== -1) {
            selected_document_id.is_starred = !$("#document_list_container").find("#"+starred_id).find("input[type=checkbox]").is(":checked");

            /* If Starred, put to starred group at the start of array */
            documentations_list_by_size.splice(selected_document_index, 1);

            /* Get last index of starred */
            let last_starred_index = documentations_list_by_size.findLastIndex((doc_obj) => doc_obj.is_starred);
            documentations_list_by_size.splice(last_starred_index+1, 0, selected_document_id);

            renderDocuments((!filtered_documents.length) ? documentations_list_by_size : filtered_documents);
        }
    }
}

const starredDocument = (event)=> {
    if(event.target.classList.contains("star_toggle_button")){
        let starred_id = parseInt(event.target.closest("li").getAttribute("id"));
        let selected_document_id = documentations_list_by_size.find(obj_id => obj_id.id === starred_id);
        let selected_document_index = documentations_list_by_size.map((obj_index) => obj_index.id).indexOf(starred_id);

        if(selected_document_index !== -1) {
            selected_document_id.is_starred = !event.target.closest("label").querySelector("input[type=checkbox]").checked;

            /* If Starred, put to starred group at the start of array */
            documentations_list_by_size.splice(selected_document_index, 1);

            /* Get last index of starred */
            let last_starred_index = documentations_list_by_size.findLastIndex((doc_obj) => doc_obj.is_starred);
            documentations_list_by_size.splice(last_starred_index+1, 0, selected_document_id);

            renderDocuments((!filtered_documents.length) ? documentations_list_by_size : filtered_documents);
        }
    }
}

const FilterDocuments = (event)=> {
    if(event.target.getAttribute("id") != "filter_dropdown_menu"){

        document.getElementById("documents_category_selection").innerHTML = "Show " + event.target.innerHTML;

        if(event.target.getAttribute("data-selection") === "data-documents"){
            filtered_documents = [];
            renderDocuments(documentations_list_by_size);
        }
        else if(event.target.getAttribute("data-selection") === "data-starred"){
            filtered_documents = documentations_list_by_size.filter(document => document.is_starred);
            renderDocuments(filtered_documents);
        }
        else if(event.target.getAttribute("data-selection") === "data-private"){
            filtered_documents = documentations_list_by_size.filter(document => document.is_private);
            renderDocuments(filtered_documents);
        }
        else if(event.target.getAttribute("data-selection") === "data-public"){
            filtered_documents = documentations_list_by_size.filter(document => !document.is_private);
            renderDocuments(filtered_documents);
        }
        else if(event.target.getAttribute("data-selection") === "data-archive"){
            renderDocuments(archived_document);
        }
    }
}

const setPopUpPrivate = ()=> {
    document.querySelectorAll(".documents_menu").forEach((documents) => {
        documents.addEventListener("click", function(event){
            event.target.focus();
            let selected_document_index = documentations_list_by_size.map((obj_index) => obj_index.id).indexOf(parseInt(this.closest("li").id));
            document.getElementById(this.getAttribute("aria-describedby")).querySelector(".public_checkbox_setting").checked = documentations_list_by_size[selected_document_index].is_private;
        });
    });
}

setPopUpPrivate();


/* EVENTS */
document.addEventListener("click", applySettings);
document.addEventListener("click", starredDocument);
document.addEventListener("click", DuplicateDocument);
document.getElementById("filter_dropdown_menu").addEventListener("click", FilterDocuments);
document.getElementById("create_document_form").addEventListener("submit", getDocumentValue);

/* Reset active state of a Document card when click outside of list */
document.addEventListener("click", (event) => {
    if(event.target.id === ""){
        let document_list_container = document.querySelector("#document_list_container");

        document_list_container.childNodes.forEach((element) => {
            element.classList.remove('active');
        });
    }
});

/* Prevent redirect to sections page when documentation menu clicked */
const preventPageRedirect = ()=> {
    let documents_menus = document.getElementsByClassName("documents_menu");
    for(let i = 0; i < documents_menus.length; i++) {
        documents_menus[i].addEventListener("click", function(event){
            event.preventDefault();
            event.stopPropagation();

            let document_id = parseInt(event.target.closest("li").getAttribute("id"));
            selected_document = documentations_list_by_size.find(obj_id => obj_id.id === document_id);

            return false;
        })
    }
}

let document_card_elements = document.getElementsByClassName("document_cards");
for (var i = 0; i < document_card_elements.length; i++) {
    document_card_elements[i].addEventListener('click', (event) => {
        if(event.target.classList.contains("all_access_count")){
            window.location.href = "/web-frontend/views/admin/sections.html?size=7&invite_open=true";
        }
        else if(event.target.classList.contains("star_toggle_button")){
            event.preventDefault();
            event.stopPropagation();

            starredDocument(event);

            return false;
        }
        else{
            window.location.href = "/web-frontend/views/admin/sections.html?size=7";
        }
    });
}

preventPageRedirect();

$(function(){
    $("#document_list_container").sortable();

    $("body").on("click", ".edit_document", function(){
        window.location.href = "/web-frontend/views/admin/sections.html?size=7"
    });

    /* Onload focus Add Documentation input box */
    document.getElementById("add_documentation_input").focus();
});