var component_data = [];

/* Get params from URL of current Page */
let url_obj = new URL((window.location.href).toLowerCase());
let components_count = url_obj.searchParams.get("size") || 1;

let confirm_modal_element = document.getElementById("confirm_modal");
let confirm_modal = new bootstrap.Modal(confirm_modal_element, {});

/* CALLBACK FUNCTIONS */
const removeTab = (event) => {
    let remove_btn      = event.target;
    let component_block = remove_btn.closest(".component_block");
    let component_id    = component_block.getAttribute("data-component-id");
    let tab_id          = remove_btn.closest(".tab_item").getAttribute("data-tab-id");
    let stack_comp_id   = undefined;
   
    confirm_modal_element.querySelector("#modal_message").innerHTML = `Are you sure you want to delete `+remove_btn.previousElementSibling.innerHTML+` tab?`;
    detectConfirmationModal(remove_btn.getAttribute("data-action"));
    confirm_modal.show();

    confirm_modal_element.querySelector("#confirm_button_yes").addEventListener("click", function(){
        delete component_data[component_id].tabs[tab_id];
        stack_comp_id = component_id;

        let tab_list = document.querySelector(`.component_block[data-component-id="${stack_comp_id}"] .tab_list`);

        remove_btn.closest("li").remove();
        (tab_list.querySelectorAll("li").length === 1) && component_block.remove();
        (!tab_list.querySelectorAll("li.active").length && tab_list.querySelectorAll("li").length !== 1) && tab_list.querySelector("li:not(.active) .tab_name").click();

        confirm_modal.hide();
    });
}

const fetchSelectedTabDetails = (event, component_id, tab_id) => {
    let selected_tab_item = event.target.closest("li");
    let tab_list          = selected_tab_item.closest(".tab_list");

    tab_list.classList.add("disabled");

    setTimeout(() => {
        let active_tab_item   = tab_list.querySelector(".tab_item.active");


        if(tab_list.querySelectorAll(".tab_item.active").length){
            active_tab_item.classList.remove("active");
        }
        
        tab_list.classList.remove("disabled");
        selected_tab_item.classList.add("active");
    }, 380);

    renderRedactorX({ textarea: document.getElementById(tab_id).querySelector(".tab_description_input") });
}

const addTab = (component_item, component_id) => {
    let tab_clone      = document.querySelector("#clone_block ul .tab_item").cloneNode(true);
    let tab_pane_clone = document.querySelector("#clone_block .tab-pane").cloneNode(true);
    let random_tab_id  = "random_id" + (Math.random() + 1).toString(36).substring(5);
    let tab_name       = tab_clone.querySelector(".tab_name");

    tab_clone.setAttribute("data-tab-id", random_tab_id);
    tab_clone.querySelector("button").setAttribute("data-bs-target", "#" + random_tab_id);
    tab_pane_clone.setAttribute("id", random_tab_id);

    component_data[component_id].tabs[random_tab_id] = {
        name: "Untitled",
        description: ""
    }

    /* Insert new tab before the add tab button */
    let add_tab_btn = document.querySelector('[data-component-id="'+component_id+'"]').querySelector('.add_tab')
    component_item.querySelector(".tab_list").insertBefore(tab_clone, add_tab_btn);

    tab_pane_clone.querySelector(".update_tab_form").addEventListener("submit", (event) => {
        event.preventDefault();
        component_item.querySelector(".update_tab_form .title_tab_input").blur();
    });

    tab_pane_clone.querySelector(".update_tab_form .title_tab_input").addEventListener("keyup", (event) => {
        let tab_title_data = event.target.value;

        submitUpdateTabDetails({is_title: true, tab_title_data}, component_id, event);
    });

    component_item.querySelector(".tab-content").prepend(tab_pane_clone);
    
    /* Focus on the tab name input box when new tab is added */
    setTimeout(()=>{
        document.getElementById(random_tab_id).querySelector(".title_tab_input").select();
    }, 300)

    /* EVENTS */
    tab_clone.querySelector(".remove_tab").addEventListener("click", (event) => removeTab(event));
    tab_name.addEventListener("click", (event) => fetchSelectedTabDetails(event, component_id, random_tab_id));
    tab_name.click();

    $(".tab_list").sortable({
        opacity: 0.8,
        forceHelperSize: true,
        forcePlaceholderSize: true,
        placeholder: "draggable-placeholder",
        tolerance: "pointer",
        items: ".tab_item",
        handle: "button",
        cancel: ""
    });
}

const submitUpdateTabDetails = (tab_details_data, component_id, event) => {
    event.preventDefault();

    let selected_title = event.target || undefined;
    let { is_title }   = tab_details_data;
    let tab_title      = (is_title) && tab_details_data.tab_title_data;
    let component_tab  = `.component_block[data-component-id="${ component_id }"]`
    let active_tab     = document.querySelector(`${ component_tab } .tab_item.active`);
    let active_tab_id  = active_tab.getAttribute("data-tab-id");

    (selected_title.value) ? selected_title.classList.remove("input_error") : selected_title.classList.add("input_error");

    if(!document.querySelectorAll(`${ component_tab } .input_error`).length){
        active_tab.querySelector(".tab_name").textContent = tab_title;
        
        component_data[component_id].tabs[active_tab_id].name = tab_title;
    }

    return false;
}

const addComponentItem = () => {
    let component_item_clone = document.querySelector("#clone_block .component_block").cloneNode(true);
    let random_component_id  = (Math.random() + 1).toString(36).substring(7);
    let random_tab_id        = "random_id" + (Math.random() + 1).toString(36).substring(5);
    let tab_name             = component_item_clone.querySelector(".tab_name");
    let tab_item             = component_item_clone.querySelector(".tab_item");

    component_item_clone.setAttribute("data-component-id", random_component_id);
    tab_item.setAttribute("data-tab-id", random_tab_id);

    /* Add component data */
    component_data[random_component_id] = {
        tabs: []
    }

    /* Add tabs data */
    component_data[random_component_id].tabs[random_tab_id] = {
        name: "Untitled",
        description: ""
    }

    tab_item.querySelector("button").setAttribute("data-bs-target", "#" + random_tab_id);
    component_item_clone.querySelector(".tab-pane").setAttribute("id", random_tab_id);

    document.getElementById("component_list").append(component_item_clone);
    
    /* EVENTS */
    component_item_clone.querySelector(".add_tab_btn").addEventListener("click", () => addTab(component_item_clone, random_component_id));
    component_item_clone.querySelector(".remove_tab").addEventListener("click", (event) => removeTab(event));

    component_item_clone.querySelector(".update_tab_form").addEventListener("submit", (event) => {
        event.preventDefault();
        component_item_clone.querySelector(".update_tab_form .title_tab_input").blur();
    });

    component_item_clone.querySelector(".update_tab_form .title_tab_input").addEventListener("keyup", (event) => {
        let tab_title_data = event.target.value;        
        submitUpdateTabDetails({is_title: true, tab_title_data}, random_component_id, event);
    });

    tab_name.addEventListener("click", (event) => fetchSelectedTabDetails(event, random_component_id, random_tab_id));

    setTimeout(() => {
        tab_name.click();
        document.getElementById(random_tab_id).querySelector(".title_tab_input").select();
    }, 400);
};

const renderRedactorX = (params) => {
    RedactorX(params.textarea, {
        placeholder: "Enter Description...",
        subscribe: {
            "editor.keydown": () => {
                // setTimeout(() => {
                //     const { textarea, random_component_id } = params;
                //     let tab_id = document.querySelector(`.component_block[data-component-id="${random_component_id}"] .tab_item.active`).getAttribute("data-tab-id");
    
                //     component_data[random_component_id].tabs[tab_id].description = textarea.value;
                // }, 380);
            }
        }
    });
}

const updateSectionTitle = () => {
    let section_title = document.getElementById("section_title");
    
    section_title.style.width = section_title.value.length * 11.5 + "px";
}

/* Hide/Unhide Comments section */
const toggleComments = (event)=> {
    if(event.target.classList.contains("allow_comments")){
        if(event.target.checked){
            event.target.closest("div").querySelector(".input_field").removeAttribute("hidden");
        }
        else{
            event.target.closest("div").querySelector(".input_field").setAttribute("hidden", "hidden");
        }
    }
}

const focusInput = (input)=> {
    input.classList.add("input_focused");
}

const blurInput = (input)=> {
    input.classList.remove("input_focused");
}

updateSectionTitle();

/* EVENTS */
document.addEventListener("click", toggleComments);
document.getElementById("add_component").addEventListener("click", addComponentItem);
document.getElementById("section_title").addEventListener("keyup", updateSectionTitle);
document.querySelector(".title_block button").addEventListener("click", () => {
    window.location.href = "/web-frontend/views/admin/component_preview.html";

    // Temporary for User Testing only
    // window.location.href = "/web-frontend/views/user/components.html";
});

$(function(){
    /* Onload focus Description textarea if 0 size */
    if(components_count < 1){
        document.getElementById("add_component").click();
    }
    
    document.getElementById("section_details").focus();

    /* Focus the description/content when Enter key is pressed from tab title input box */
    $("body").on("keypress", ".title_tab_input", function(e) {
        /* When enter key is pressed */
        if(e.which === 13){
            $(this).closest(".update_tab_form").find(".rx-editor").focus();
            return false;  
        }
    });
});

document.getElementById("section_title").addEventListener("focus", function(){
    focusInput(this);
});
document.getElementById("section_title").addEventListener("blur", function(){
    blurInput(this);
});