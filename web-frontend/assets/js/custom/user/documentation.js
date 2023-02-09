var popover_content = document.getElementById("document_options");
var document_id = "";

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
];

let current_filter_type = FILTER_TYPE.all;
let filtered_documents = [];
let searched_documents = [];

/* CALLBACK FUNCTIONS */

const renderDocuments = (documentations_result) => {
    document.getElementById("document_list_container").innerHTML = "";

    if(documentations_result.length){
        document.getElementById("no_data_logo").setAttribute("hidden", "hidden");

        for(let index in documentations_result){
            let document_item = documentations_result[index];
            let cloned_document = document.getElementById("clone").cloneNode(true);

            cloned_document.id = document_item.id;
            cloned_document.querySelectorAll(".document_title")[0].textContent = document_item.title;
            cloned_document.querySelectorAll(".viewers_count")[0].textContent = document_item.viewers;
            cloned_document.querySelectorAll(".editors_count")[0].textContent = document_item.editors;
            cloned_document.querySelectorAll(".document_information p")[0].textContent = document_item.description;
            cloned_document.setAttribute("title", document_item.title);

            (document_item.is_private) ? cloned_document.classList.add("is_private") : cloned_document.classList.remove("is_private");
            (document_item.is_starred) ? cloned_document.querySelector("input[type=checkbox]").checked = true : cloned_document.querySelector("input[type=checkbox]").checked = false;

            (document_item.is_starred) ? cloned_document.setAttribute("data-starred", "all_starred") : cloned_document.removeAttribute("data-star");
            (document_item.is_private) ? cloned_document.setAttribute("data-private", "all_private") : cloned_document.removeAttribute("data-private");

            document.getElementById("document_list_container").appendChild(cloned_document);
        }
    }
    else{
        document.getElementById("no_data_logo").removeAttribute("hidden");
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
        document.getElementById("no_data_logo").setAttribute("hidden", "hidden");

        let recent_documents = (!current_filter_type) ? documents_array : filtered_documents;
        renderDocuments(recent_documents);
    }

    // Discontinue if there is no search yet
    if (search_input === null || search_input === "" || searched_documents === []) return;

    // Filter documents_array to get the title based on search input
    searched_documents = (!current_filter_type) ? documents_array.filter(documentation => documentation.title.toLowerCase().includes(search_input))
        : filtered_documents.filter(documentation => documentation.title.toLowerCase().includes(search_input));

    renderDocuments(searched_documents);
}

const FilterDocuments = (event)=> {

    if(event.target.getAttribute("id") != "filter_dropdown_menu"){
        document.getElementById("search_documentation_input").value = "";
        document.getElementById("documents_category_selection").innerHTML = "Show " + event.target.innerHTML;

        if(event.target.getAttribute("data-selection") === "data-documents"){
            current_filter_type = FILTER_TYPE.all;
            renderDocuments(documents_array);
        }
        else if(event.target.getAttribute("data-selection") === "data-starred"){
            current_filter_type = FILTER_TYPE.starred;
            filtered_documents = documents_array.filter(document => document.is_starred);
            renderDocuments(filtered_documents);
        }
        else if(event.target.getAttribute("data-selection") === "data-private"){
            current_filter_type = FILTER_TYPE.private;
            filtered_documents = documents_array.filter(document => document.is_private);
            renderDocuments(filtered_documents);
        }
        else if(event.target.getAttribute("data-selection") === "data-public"){
            current_filter_type = FILTER_TYPE.public;
            filtered_documents = documents_array.filter(document => !document.is_private);
            renderDocuments(filtered_documents);
        }
        else if(event.target.getAttribute("data-selection") === "data-archive"){
            current_filter_type = FILTER_TYPE.archived;
            filtered_documents = archived_document;
            renderDocuments(filtered_documents);
        }
    }
}

/* EVENTS */
document.addEventListener("click", starredDocument);
document.getElementById("filter_dropdown_menu").addEventListener("click", FilterDocuments);
document.getElementById("search_documentation_input").addEventListener("keyup", searchDocumentation);

/*Set search and add document forms stick or fixed on top*/
window.addEventListener("scroll", () => {
    let form_container = document.getElementById("form_container");
    (this.scrollY > SCROLL_POSITION.top) ? form_container.classList.add("floated") : form_container.classList.remove("floated");
});

/* Prevent redirect to sections page when documentation menu clicked */
let documents_menus = document.getElementsByClassName("documents_menu");
for(let i = 0; i < documents_menus.length; i++) {
    documents_menus[i].addEventListener("click", function(event){
        event.preventDefault();
        return false;
    })
}

$(function() {$("#document_list_container").sortable();});