const confirm_modal = document.getElementById("confirm_private_modal");
const confirm_private_modal = new bootstrap.Modal(confirm_modal, {});

let current_privacy_setting = IS_PRIVATE.yes;

/* Get params from URL of current Page */
let url_obj = new URL((window.location.href).toLowerCase());
let doc_count = url_obj.searchParams.get("size") || 5;

let sections_array = [
    {
        id: 1,
        title: "The code (formatting, style, tests)",
        description: "There should also be thought put into writing down the *cultural* guidelines for yo...",
        url: "../admin/components.html?size=3&tabs=4"
    },
    {
        id: 2,
        title: "The development process (CI, code review, deployments)",
        description: "You need a rationale so people understand the context in which these decisions ha...",
        url: "../admin/components.html?size=3&tabs=4"
    },
    {
        id: 3,
        title: "The service (flags, configs, metrics, logging)",
        description: "This is the role guidelines play. The goal is consistency. You may not agree with a p...",
        url: "../admin/components.html?size=3&tabs=4"
    },
    {
        id: 4,
        title: "Writing Your Own Guidelines",
        description: "As the first internal advocate for Go at a large technology company, I took on the ta...",
        url: "../admin/components.html?size=3&tabs=4"
    },
    {
        id: 5,
        title: "How do you eat an elephant? One bite at a time.",
        description: "Having guidelines is all good for greenfield development: As new code arrives, you...",
        url: "../admin/components.html?size=3&tabs=4"
    },
    {
        id: 6,
        title: "The code (formatting, style, tests)",
        description: "There should also be thought put into writing down the *cultural* guidelines for yo...",
        url: "../admin/components.html?size=3&tabs=4"
    },
    {
        id: 7,
        title: "The development process (CI, code review, deployments)",
        description: "You need a rationale so people understand the context in which these decisions ha...",
        url: "../admin/components.html?size=3&tabs=4"
    },
    {
        id: 8,
        title: "The service (flags, configs, metrics, logging)",
        description: "This is the role guidelines play. The goal is consistency. You may not agree with a p...",
        url: "../admin/components.html?size=3&tabs=4"
    },
    {
        id: 9,
        title: "Writing Your Own Guidelines",
        description: "As the first internal advocate for Go at a large technology company, I took on the ta...",
        url: "../admin/components.html?size=3&tabs=4"
    },
    {
        id: 10,
        title: "How do you eat an elephant? One bite at a time.",
        description: "Having guidelines is all good for greenfield development: As new code arrives, you...",
        url: "../admin/components.html?size=3&tabs=4"
    },
    {
        id: 11,
        title: "The code (formatting, style, tests)",
        description: "There should also be thought put into writing down the *cultural* guidelines for yo...",
        url: "../admin/components.html?size=3&tabs=4"
    },
    {
        id: 12,
        title: "The development process (CI, code review, deployments)",
        description: "You need a rationale so people understand the context in which these decisions ha...",
        url: "../admin/components.html?size=3&tabs=4"
    },
    {
        id: 13,
        title: "The service (flags, configs, metrics, logging)",
        description: "This is the role guidelines play. The goal is consistency. You may not agree with a p...",
        url: "../admin/components.html?size=3&tabs=4"
    },
    {
        id: 14,
        title: "Writing Your Own Guidelines",
        description: "As the first internal advocate for Go at a large technology company, I took on the ta...",
        url: "../admin/components.html?size=3&tabs=4"
    },
    {
        id: 15,
        title: "How do you eat an elephant? One bite at a time.",
        description: "Having guidelines is all good for greenfield development: As new code arrives, you...",
        url: "../admin/components.html?size=3&tabs=4"
    },
    {
        id: 16,
        title: "The code (formatting, style, tests)",
        description: "There should also be thought put into writing down the *cultural* guidelines for yo...",
        url: "../admin/components.html?size=3&tabs=4"
    },
    {
        id: 17,
        title: "The development process (CI, code review, deployments)",
        description: "You need a rationale so people understand the context in which these decisions ha...",
        url: "../admin/components.html?size=3&tabs=4"
    },
    {
        id: 18,
        title: "The service (flags, configs, metrics, logging)",
        description: "This is the role guidelines play. The goal is consistency. You may not agree with a p...",
        url: "../admin/components.html?size=3&tabs=4"
    },
    {
        id: 19,
        title: "Writing Your Own Guidelines",
        description: "As the first internal advocate for Go at a large technology company, I took on the ta...",
        url: "../admin/components.html?size=3&tabs=4"
    },
    {
        id: 20,
        title: "How do you eat an elephant? One bite at a time.",
        description: "Having guidelines is all good for greenfield development: As new code arrives, you...",
        url: "../admin/components.html?size=3&tabs=4"
    }
];

let sections_list_by_size = sections_array.slice(0, doc_count);

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

const autoGrowTextArea = (document_textarea)=>{
    document_textarea.style.height = "5px";
    document_textarea.style.height = (document_textarea.scrollHeight)+"px";
}

const submitCreateSection = (event)=> {
    event.preventDefault();

    let form_input = event.target.querySelector("#add_section_input");

    (form_input.value.length) ? form_input.closest("label").classList.remove("input_error") : form_input.closest("label").classList.add("input_error") ;
    if(form_input.value.length){
        sections_list_by_size.splice(doc_count, 0, {
            id: new Date().getUTCMilliseconds(),
            title: form_input.value,
            description: "",
            url: "../user/components.html?size=3&tabs=4"
        });

        form_input.value = "";

        renderSections(sections_list_by_size);
    }

    return false;
}

const changePrivacySettings = () => {
    let private_setting_btn = document.getElementById("private_setting_block").children[ITEMS.first];

    if(current_privacy_setting){
        confirm_private_modal.show();

        confirm_modal.querySelector("#confirm_button_yes").addEventListener("click", function(){
            current_privacy_setting = IS_PRIVATE.no;
            private_setting_btn.innerHTML = "Set as Public";

            confirm_private_modal.hide();
        });
    }
    else{
        current_privacy_setting = IS_PRIVATE.yes;
        private_setting_btn.innerHTML = "Set as Private";
    }
}

const deleteSection = (event) => {
    let delete_section_btn = event.target;

    if(delete_section_btn.classList.value === "delete_section"){
        let section_id = parseInt(event.target.closest("li").getAttribute("id"));
        let selected_section = sections_list_by_size.find(obj_id => obj_id.id === section_id);

        sections_list_by_size.splice(sections_list_by_size.map((obj_index) => obj_index.id).indexOf(selected_section.id), 1);
        renderSections(sections_list_by_size);
    }
}

const duplicateSection = (event) => {
    let duplicate_section_btn = event.target;

    if(duplicate_section_btn.classList.value  === "duplicate_section"){
        /* Duplicate the Section */
        let section_to_duplicate = event.target.closest("li");

        let duplicated_section_obj = {
            id: new Date().getUTCMilliseconds(),
            title: section_to_duplicate.querySelectorAll(".section_title")[ITEMS.first].textContent,
            description: section_to_duplicate.querySelectorAll(".section_description")[ITEMS.first].textContent,
            url: section_to_duplicate.querySelector("a").getAttribute("href")
        }

        sections_list_by_size.push(duplicated_section_obj);
        renderSections(sections_list_by_size);
    }
}

const selectAddedEmailStatus = (event) => {
    let selected_status = event.target;

    selected_status.closest(".dropdown").querySelector("#added_email_status").textContent = selected_status.textContent;
    selected_status.closest(".dropdown-menu").querySelector(".dropdown-item.active").classList.remove("active");
    selected_status.classList.add("active");
}

const showFilterDropdownEmailData = (event) => {
    let add_email_block     = event.target.closest(".add_email_block");
    let filter_email_search = add_email_block.querySelector(".filter_email_search");

    if(event.target.value.length){
        filter_email_search.classList.remove("hidden");
        filter_email_search.style.cssText = `margin-top: ${add_email_block.querySelector(".added_email_list").offsetHeight}px`;
    }
    else{
        filter_email_search.classList.add("hidden");
    }
}

autoGrowTextArea(document.getElementById("document_description_input"));

document.getElementById("document_description_input").addEventListener("keyup", function(){ autoGrowTextArea(this);});
document.getElementById("add_section_form").addEventListener("submit", submitCreateSection);
document.getElementById("private_setting_block").addEventListener("click", changePrivacySettings);
document.addEventListener("click", deleteSection);
document.addEventListener("click", duplicateSection);
document.getElementById("viewers_editors_count").addEventListener("click", () => {
    let example_modal =  new bootstrap.Modal(document.getElementById("invite_user_modal"));

    example_modal.show();
});
document.querySelectorAll("#invite_user_modal .dropdown-item").forEach((selected_status) => {
    selected_status.addEventListener("click", selectAddedEmailStatus);
});
document.querySelector(".add_email_input").addEventListener("keyup", showFilterDropdownEmailData);

let example_modal =  new bootstrap.Modal(document.getElementById("invite_user_modal"));

    example_modal.show();

$(function() {
    $("#section_list_container").sortable();

    /* Onload focus Add Sections input box and clear description if no data */
    document.getElementById("add_section_input").focus();
    
    if(doc_count < 1){
        document.getElementById("document_description_input").textContent = "Add description. . .";
        document.querySelector("#viewers_editors_count span").textContent = "0 viewer and 0 editor";
    }
});