/* CALLBACK FUNCTIONS */
const selectActiveTab = (event) => {
    let selected_tab = event.target.closest(".tab_item");

    event.target.closest(".tab_list").querySelector(".tab_item.active").classList.remove("active");
    selected_tab.classList.add("active");
}

function navigateTab(){
    let this_btn = $(this);
    let active_tab_btn = this_btn.closest(".component_block").find(".tab_item.active");

    /* Next Tab */
    if(this_btn.hasClass("next_tab")){
        active_tab_btn.next().children().click();
        (this_btn.closest(".component_block").find(".tab_item.active").next().children().length == 0) ? this_btn.removeClass("active") : this_btn.addClass("active");
        (this_btn.closest(".component_block").find(".tab_item.active").prev().children().length == 0) ? this_btn.siblings(".prev_tab").removeClass("active") : this_btn.siblings(".prev_tab").addClass("active");
    }
    /* Previous Tab */
    else{
        active_tab_btn.prev().children().click();
        (this_btn.closest(".component_block").find(".tab_item.active").prev().children().length == 0) ? this_btn.removeClass("active") : this_btn.addClass("active");
        (this_btn.closest(".component_block").find(".tab_item.active").next().children().length == 0) ? this_btn.siblings(".next_tab").removeClass("active") : this_btn.siblings(".next_tab").addClass("active");
    }
}

/* EVENTS */
document.querySelectorAll(".tab_item .nav-link").forEach((item_link) => {
    item_link.addEventListener("click", selectActiveTab);
});
document.querySelector(".title_block button").addEventListener("click", () => {
    window.location.href = "/web-frontend/views/admin/components.html";
});

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

$(function(){
    $("body").on("click", ".prev_tab, .next_tab", navigateTab);
})