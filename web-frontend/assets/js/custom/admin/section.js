let confirm_modal_element = document.getElementById("confirm_modal");
let confirm_modal = new bootstrap.Modal(confirm_modal_element, {});

let current_privacy_setting = IS_PRIVATE.yes;

/* Get params from URL of current Page */
let url_obj = new URL((window.location.href));
let doc_count = url_obj.searchParams.get("size") || 5;
let is_invite_modal_open = url_obj.searchParams.get("invite_open") || false;

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
        let new_section_id = new Date().getUTCMilliseconds();
        sections_list_by_size.splice(doc_count, 0, {
            id: new_section_id,
            title: form_input.value,
            description: "",
            url: "../user/components.html?size=3&tabs=4"
        });

        form_input.value = "";

        renderSections(sections_list_by_size);
        setNewSectionActive(new_section_id)
    }

    return false;
}

/* Adds active state to new or duplicated section */
const setNewSectionActive = (new_section_id)=> {
    document.getElementById(new_section_id).classList.add("active");
}

const changePrivacySettings = (event) => {
    event.preventDefault();

    let private_setting_btn = document.getElementById("private_setting_block").children[ITEMS.first];

    if(current_privacy_setting){
        confirm_modal_element.querySelector("#modal_message").innerHTML = "Are you sure you want to update it to public?"
        confirm_modal.show();

        confirm_modal_element.querySelector("#confirm_button_yes").addEventListener("click", function(){
            current_privacy_setting = IS_PRIVATE.no;
            private_setting_btn.innerHTML = "Set as Private";

            confirm_modal.hide();
        });
    }
    else{
        current_privacy_setting = IS_PRIVATE.yes;
        private_setting_btn.innerHTML = "Set as Public";
    }

    return false;
}

window.addEventListener("scroll", () => {
    if(this.scrollY > 40){
        document.getElementById("add_section_form").classList.add("floated");
    }else{
        document.getElementById("add_section_form").classList.remove("floated");
    }
});

const deleteSection = (event) => {
    let delete_section_btn = event.target;
    let section_element = delete_section_btn.closest("li");

    if(delete_section_btn.classList.value === "delete_section"){
        confirm_modal_element.querySelector("#modal_message").innerHTML = `Are you sure you want to delete
           ${section_element.querySelectorAll(".section_title")[ITEMS.first].textContent}
        section?`;

        confirm_modal.show();

        confirm_modal_element.querySelector("#confirm_button_yes").addEventListener("click", function(){
            let section_id = parseInt(section_element.getAttribute("id"));

            let section_list_new_data = sections_list_by_size.filter((section_item) => {
                if(section_item.id !== section_id){
                    return section_item
                }

                return false;
            });

            sections_list_by_size = section_list_new_data;

            renderSections(sections_list_by_size);

            confirm_modal.hide();
        });
    }
}

const duplicateSection = (event) => {
    let duplicate_section_btn = event.target;

    if(duplicate_section_btn.classList.value  === "duplicate_section"){
        /* Duplicate the Section */
        let section_to_duplicate = event.target.closest("li");
        let section_new_id = new Date().getUTCMilliseconds();

        let duplicated_section_obj = {
            id: section_new_id,
            title: section_to_duplicate.querySelectorAll(".section_title")[ITEMS.first].textContent,
            description: section_to_duplicate.querySelectorAll(".section_description")[ITEMS.first].textContent,
            url: section_to_duplicate.querySelector("a").getAttribute("href")
        }

        sections_list_by_size.push(duplicated_section_obj);
        renderSections(sections_list_by_size);

        setNewSectionActive(section_new_id);
    }
}

const selectAddedEmailStatus = (event, selected_class_item) => {
    let selected_status = event.target;

    selected_status.closest(".dropdown").querySelector(selected_class_item).textContent = selected_status.textContent;
    selected_status.closest(".dropdown-menu").querySelector(".dropdown-item.active").classList.remove("active");
    selected_status.classList.add("active");
}

autoGrowTextArea(document.getElementById("document_description_input"));

document.getElementById("document_description_input").addEventListener("keyup", function(){ autoGrowTextArea(this);});
document.getElementById("add_section_form").addEventListener("submit", submitCreateSection);
document.getElementById("private_setting_block").addEventListener("click", changePrivacySettings);
document.addEventListener("click", deleteSection);
document.addEventListener("click", duplicateSection);

$(function() {
    $("#section_list_container").sortable();

    /* Onload focus Add Sections input box and clear description if no data */
    document.getElementById("add_section_input").focus();

    if(doc_count < 1){
        let new_doc_title = url_obj.searchParams.get("title"); 
        document.getElementById("document_description_input").textContent = "";
        document.querySelector("#viewers_editors_count span").textContent = "0 viewer and 0 editor";
        document.getElementById("documents_title").value = url_obj.searchParams.get("title");     
        $("#document_description_input").css("height", "460px").focus();   
        $("#current_page").text(new_doc_title);
    }
    else{
        $("#current_page").text("Engineering Guide");
        document.getElementById("documents_title").value = "Engineering Guide";
        $("#document_description_input").css("height", "460px").text("Engineering Guidelines are a collection of your an organizations’ Best Practices; a distillation of the institutional knowledge around “how things should be done here”. They are a cross between a Mission Statement, Company Values, and an Employee Handbook for your engineering department. You need a rationale so people understand the context in which these decisions have been made. \n\nThis allows exceptions when these base assumptions do not hold, or updating the guidelines when the larger context changes. It’s about making decisions once for consistency. It’s about avoiding known issues or edge cases. It’s about choosing a specific technique with known tradeoffs for dealing with problems.");
    }
});

/* Script for Invite Documentations modal */
let listOfValidEmails = [];
let invite_user_modal_element = document.getElementById("invite_user_modal");
let invite_user_modal =  new bootstrap.Modal(invite_user_modal_element);

document.getElementById("viewers_editors_count").addEventListener("click", () => {
    invite_user_modal.show();
});

if(is_invite_modal_open){
    invite_user_modal.show();
}

/* Removes active class on sections when click anything */
document.getElementById("create_section_block").addEventListener("click", function(){
    document.querySelectorAll("#section_list_container li").forEach(function(section){
        section.classList.remove("active");
    })
})

let inputContainerNode = document.querySelector('.added_email_list');
EmailsInput(inputContainerNode, {
    limitEmailsToDomain: 'village88',
    validEmailClass: 'valid-email',
});

invite_user_modal_element.addEventListener('hidden.bs.modal', () => {
    listOfValidEmails = [];

    inputContainerNode.innerHTML = "";
    EmailsInput(inputContainerNode, {
        limitEmailsToDomain: 'village88',
        validEmailClass: 'valid-email',
    });
});

function isValidEmail(email, limitEmailsToDomain) {
    const expression = new RegExp(
        '^([a-zA-Z0-9_\\-\\.]+)@' +
        (limitEmailsToDomain || '([a-zA-Z0-9_\\-\\.]+)') +
        '\\.([a-zA-Z]{2,5})$'
    );

    return expression.test(email);
}

function getEmailsList() {
    return listOfValidEmails;
}

function addEmailToList(emailsContainer, email, options) {
    email = email.trim();
    if (!email || listOfValidEmails.indexOf(email) > -1 || !isValidEmail(email, options.limitEmailsToDomain)) return;

    const emailBlock = document.createElement('li');
    emailBlock.classList.add("email_input_block");
    emailBlock.innerText = email;

    listOfValidEmails.push(email);

    /* Stop propagation to enable selection email block */
    emailBlock.addEventListener('click', function (event) {
        event.stopPropagation();
    });

    /* Add remove button */
    const removeBtn = document.createElement('button');
    removeBtn.classList.add('btn-close');

    removeBtn.addEventListener('click', function () {
        if (this.parentElement.className.indexOf('invalid-email') === -1) {
            listOfValidEmails.splice(parseInt(this.parentElement.getAttribute('data-value')), 1);
        }

        this.parentElement.parentNode.removeChild(this.parentElement);
    });
    emailBlock.appendChild(removeBtn);

    emailsContainer.insertBefore(emailBlock, emailsContainer.firstChild);
    clearSearchSuggestion();
}

const removePeopleAccess = (event) => {
    event.target.closest(".dropdown").closest("li").remove();
}

function createTextBox(emailsContainer, options) {
    const input = document.createElement('input');
    input.classList.add('add_email_input');
    input.setAttribute('name', 'add_email_input');
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', 'Enter email...');

    const input_li = document.createElement('li');
    input_li.appendChild(input);

    /* Create email block in case user press 'Enter' or comma */
    input.addEventListener('keypress', function (e) {
        if (e.key === ',' || e.key === 'Tab') {
            if (e.target.value !== '') {
                addEmailToList(emailsContainer, e.target.value, options);
            }

            e.target.value = '';
        }
        else if (e.key === 'Enter') {
            let all_emails = [];
            let email_inputs = document.getElementsByClassName("email_input_block");

            if(email_inputs.length > 0){
                Array.from(email_inputs).forEach((email_input) => {
                    all_emails.push(email_input.textContent);
                });
            }

            if (e.target.value !== '') {
                all_emails.push(e.target.value);
            }

            if(all_emails.length > 0){
                all_emails.forEach( (email) => {
                    let clone_invited_user = document.getElementById("clone_invited_user").cloneNode(true);
                    clone_invited_user.classList.remove("id");

                    let email_address        = clone_invited_user.querySelector("#invited_email");
                    let selected_status_data = e.target.closest(".add_email_block").querySelector(".dropdown-item.active").textContent;
                    let invited_user_name    = clone_invited_user.querySelector(".invited_user_name");

                    invited_user_name.textContent = all_users_obj.filter(selected_item => selected_item.email === email)[0].full_name;
                    email_address.innerHTML = email;
                    email_address.setAttribute("href", "mailto:" + email);

                    clone_invited_user.querySelector(`.dropdown-item[data-selector-text="${ selected_status_data }"]`).classList.add("active");
                    clone_invited_user.querySelector(".update_status").textContent = selected_status_data;

                    document.querySelector(".with_access_list").appendChild(clone_invited_user);
                });
            }

            e.target.value = '';
            all_emails = [];
            listOfValidEmails = [];

            inputContainerNode.innerHTML = "";
            EmailsInput(inputContainerNode, {
                limitEmailsToDomain: 'village88',
                validEmailClass: 'valid-email',
            });
            e.preventDefault();

            /* EVENTS */
            document.querySelectorAll(".remove_access_btn").forEach((selected_btn) => {
                selected_btn.addEventListener("click", removePeopleAccess);
            });

            document.querySelectorAll(".dropdown-item").forEach((selected_btn) => {
                selected_btn.addEventListener("click", (event) => selectAddedEmailStatus(event, ".update_status"));
            });

            document.querySelector('.add_email_input').addEventListener('keyup', searchHandler);
        }
    });

    /* Create email block in case user lose focus */
    input.addEventListener('blur', function (e) {
        if (e.target.value !== '') {
            addEmailToList(emailsContainer, e.target.value, options);
            e.target.value = '';
        }
    });

    /* Listen to the paste event to split and show emails blocks */
    input.addEventListener('paste', function (e) {
        setTimeout(function () {
            const pastedContent = e.target.value.split(',');

            pastedContent.forEach(function (element) {
                addEmailToList(emailsContainer, element, options);
                e.target.value = '';
            });
        }, 50);
    });

    return input_li;
}

function EmailsInput(selector, options) {
    if (!options) options = {};

    const input = createTextBox(selector, options);

    selector.addEventListener('click', function () {
        input.focus();
    });

    selector.appendChild(input);

    return {
        getEmailsList,
        addEmail: function (email) {
            addEmailToList(selector, email, options);
        },
    };
}

document.querySelector('.add_email_input').addEventListener('keyup', searchHandler);
document.querySelector('.filter_email_search').addEventListener('click', useSuggestion);

const all_users_obj = [
    {profile_pic: "../../assets/images/Image.png", full_name: "Fitz Gerald Villegas", email: "fvillegas@village88.com"},
    {profile_pic: "../../assets/images/Image.png", full_name: "Jessie De Leon", email: "jdeleon@village88.com"},
    {profile_pic: "../../assets/images/Image.png", full_name: "Ruelito Ytac", email: "ruelito-ytac@village88.com"},
    {profile_pic: "../../assets/images/Image.png", full_name: "Stan Bernie Nudo", email: "snudo@village88.com"},
]

function search(input_string) {
    const val = input_string.toLowerCase();
    let results = all_users_obj.filter(user => new RegExp(`^${val}`).test(user.email.toLowerCase()));
    return results;
}

function searchHandler(event) {
    const inputVal = event.currentTarget.value;
    let results = [];

    if (inputVal.length > 0) {
        results = search(inputVal);
    }

    showSuggestions(results);
}

function useSuggestion(event) {
    let input = document.querySelector(".add_email_input");
    let suggestions = document.querySelector(".filter_email_search");

    input.value = event.target.closest("li").getAttribute("data-email");
    input.focus();
    input.blur();
    input.focus();
    suggestions.innerHTML = "";
    suggestions.classList.add("hidden");
}

function showSuggestions(results) {
    let suggestions = document.querySelector('.filter_email_search');
    suggestions.innerHTML = '';

    let add_email_block     = document.querySelector(".add_email_block");
    suggestions.style.cssText = `margin-top: ${add_email_block.querySelector(".added_email_list").offsetHeight}px`;

    if (results.length > 0) {
        for (i = 0; i < results.length; i++) {
            let item = results[i];
            suggestions.innerHTML += `
                <li data-email="${item.email}">
                    <img src="${item.profile_pic}" alt="User Profile">
                    <div class="user_details">
                        <h3>${item.full_name}</h3>
                        <a href="#">${item.email}</a>
                    </div>
                </li>
            `;
        }

        suggestions.classList.remove('hidden');
    }
    else {
        results = [];
        suggestions.innerHTML = '';
        suggestions.classList.add("hidden");
    }
}

function clearSearchSuggestion() {
    let suggestions = document.querySelector('.filter_email_search');

    suggestions.innerHTML = '';
    suggestions.classList.add("hidden");
}

const copyLink = () => {
    let temp_input   = document.createElement("input");
    let modal_footer = document.querySelector("#invite_user_modal .modal-footer");

    temp_input.value = window.location.href;
    modal_footer.appendChild(temp_input);
    temp_input.select();
    document.execCommand("copy");
    modal_footer.removeChild(temp_input);

    var exampleTriggerEl = document.querySelector(".copy_link");
    var popover = new bootstrap.Popover(exampleTriggerEl);

    popover.show();

    setTimeout(() => {
        popover.hide();
    }, 1000);
}

document.querySelector("#invite_user_modal .copy_link").addEventListener("click", copyLink);

document.querySelectorAll(".remove_access_btn").forEach((selected_btn) => {
    selected_btn.addEventListener("click", removePeopleAccess);
});

document.querySelectorAll(".with_access_list .dropdown-item").forEach((selected_btn) => {
    selected_btn.addEventListener("click", (event) => selectAddedEmailStatus(event, ".update_status"));
});

document.querySelectorAll(".add_email_block .dropdown-item").forEach((selected_status) => {
    selected_status.addEventListener("click", (event) => selectAddedEmailStatus(event, "#added_email_status"));
});