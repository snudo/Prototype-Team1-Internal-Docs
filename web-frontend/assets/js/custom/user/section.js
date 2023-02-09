/* Get params from URL of current Page */
let url_obj = new URL((window.location.href).toLowerCase());
let doc_count = url_obj.searchParams.get("size") || 20;

let sections_array = [
    {
        id: 1,
        title: "The red power ranger of source.",
        description: "Rey Plumb had always loved Cups San Fernando City with it Reyna the cups.",
        url: "../user/components.html?size=3&tabs=4"
    },
    {
        id: 2,
        title: "The blue power ranger of source.",
        description: "Rey Plumb had always loved Cups San Fernando City with it Reyna the cups.",
        url: "../user/components.html?size=3&tabs=4"
    },
    {
        id: 3,
        title: "The green power ranger of source.",
        description: "Rey Plumb had always loved Cups San Fernando City with it Reyna the cups.",
        url: "../user/components.html?size=3&tabs=4"
    },
    {
        id: 4,
        title: "TH11 Life Hacks",
        description: "Rey Plumb had always loved Cups San Fernando City with it Reyna the cups.",
        url: "../user/components.html?size=3&tabs=4"
    },
    {
        id: 5,
        title: "The pink power ranger of source.",
        description: "Rey Plumb had always loved Cups San Fernando City with it Reyna the cups.",
        url: "../user/components.html?size=3&tabs=4"
    },
    {
        id: 6,
        title: "Lost Ark Saga",
        description: "Rey Plumb had always loved Cups San Fernando City with it Reyna the cups.",
        url: "../user/components.html?size=3&tabs=4"
    },
    {
        id: 7,
        title: "New World Saga",
        description: "Rey Plumb had always loved Cups San Fernando City with it Reyna the cups.",
        url: "../user/components.html?size=3&tabs=4"
    },
    {
        id: 8,
        title: "Dota 2 Cheats",
        description: "Rey Plumb had always loved Cups San Fernando City with it Reyna the cups.",
        url: "../user/components.html?size=3&tabs=4"
    },
    {
        id: 9,
        title: "Creative guide to increase power.",
        description: "Rey Plumb had always loved Cups San Fernando City with it Reyna the cups.",
        url: "../user/components.html?size=3&tabs=4"
    },
    {
        id: 10,
        title: "White Magic",
        description: "Rey Plumb had always loved Cups San Fernando City with it Reyna the cups.",
        url: "../user/components.html?size=3&tabs=4"
    },
    {
        id: 11,
        title: "Black Magic",
        description: "Rey Plumb had always loved Cups San Fernando City with it Reyna the cups.",
        url: "../user/components.html?size=3&tabs=4"
    },
    {
        id: 12,
        title: "Imprisionment rules and regulations",
        description: "Rey Plumb had always loved Cups San Fernando City with it Reyna the cups.",
        url: "../user/components.html?size=3&tabs=4"
    },
    {
        id: 13,
        title: "The greedy chapter",
        description: "Rey Plumb had always loved Cups San Fernando City with it Reyna the cups.",
        url: "../user/components.html?size=3&tabs=4"
    },
    {
        id: 14,
        title: "Meow Meow",
        description: "Rey Plumb had always loved Cups San Fernando City with it Reyna the cups.",
        url: "../user/components.html?size=3&tabs=4"
    },
    {
        id: 15,
        title: "Last move Chapter",
        description: "Rey Plumb had always loved Cups San Fernando City with it Reyna the cups.",
        url: "../user/components.html?size=3&tabs=4"
    }
];

let sections_list_by_size = sections_array.slice(0, doc_count);
let searched_sections = [];

const renderSections = (sections_list) => {
    let section_container = document.getElementById("section_list_container");
    section_container.innerHTML = "";

    if(sections_list.length){
        document.getElementById("no_section_data_logo").setAttribute("hidden", "hidden");

        for(let index in sections_list){
            let section_item = sections_list[index];
            let cloned_section = document.getElementById("clone_section").cloneNode(true);

            cloned_section.id = section_item.id;
            cloned_section.querySelectorAll(".section_title")[ITEMS.first].textContent = section_item.title;
            cloned_section.querySelectorAll(".section_description")[ITEMS.first].textContent = section_item.description;
            cloned_section.querySelector("a").setAttribute("href", section_item.url);

            section_container.appendChild(cloned_section);
        }
    }
    else{
        document.getElementById("no_section_data_logo").removeAttribute("hidden");
    }
}

renderSections(sections_list_by_size);

const searchSection = (event) => {
    event.preventDefault();
    let search_input = event.target.value.toLowerCase();

    // Render all if no search_input value
    if (search_input === "") {
        renderSections(sections_list_by_size);
    }

    // Discontinue if there is no search yet
    if (search_input === null || search_input === "" || searched_sections === []) return;

    // Filter section array, depending on given size, to get the title based on search input
    searched_sections =  sections_list_by_size.filter(section => section.title.toLowerCase().includes(search_input));
    renderSections(searched_sections);
}

const showMoreText = (event) => {
    if(event.target.textContent == "See More"){
        event.target.closest("#document_description_container").querySelector(".description").classList.add("shown");
        event.target.textContent = "See Less"
    }else{
        event.target.closest("#document_description_container").querySelector(".description").classList.remove("shown");
        event.target.textContent = "See More"
    }

    (event.target.textContent == "See More") ? event.target.classList.remove("open") : event.target.classList.add("open");
}

/*Set search and add section forms stick or fixed on top*/
window.addEventListener("scroll", () => {
    let search_section_form = document.getElementById("search_section_form");
    (this.scrollY > SCROLL_POSITION.top) ? search_section_form.classList.add("floated") : search_section_form.classList.remove("floated");
});

/*EVENTS*/
document.getElementById("see_more_button").addEventListener("click", showMoreText)

document.getElementById("search_section_input").addEventListener("keyup", searchSection);
$(function() {$("#section_list_container").sortable();});