var confirm_modal   = new bootstrap.Modal(document.getElementById("delete_post_modal"), {});
var popover_content = document.getElementById("comment_options");

/* CALLBACK FUNCTIONS */
const updateMessageCount = (event, message_form) => {
    event.target.maxLength = "249";

    message_form.querySelector(".char_count").textContent = `${event.target.value.length + 1}/250`;
}

const selectActiveTab = (event) => {
    let selected_tab = event.target.closest(".tab_item");

    event.target.closest(".tab_list").querySelector(".tab_item.active").classList.remove("active");
    selected_tab.classList.add("active");
}

const removeItemData = (event) => {
    let selected_item = event.target;
    let message_item  = selected_item.closest(".post_item");
    let reply_count   = message_item.querySelectorAll(".reply_list li").length - 1;
    let post_type     = (selected_item.closest("ul").getAttribute("class") == "post_list") ? "post" : "reply" ;

    confirm_modal._element.querySelector("#post_type").textContent = post_type;

    confirm_modal.show(); 

    document.getElementById("confirm_button_yes").addEventListener("click", function(){
        selected_item.closest("li").remove();
        message_item.querySelector(".show_reply_btn").innerHTML = `<span class="caret_arrow"></span> ${ reply_count } ${ (reply_count > 1) ? "Replies" : "Reply" }`;
        confirm_modal.hide();
    });
}

const updateItemData = (event) => {
    let message_item   = event.target.closest("li");
    let selected_input = message_item.querySelector("form input");
    let char_count     = message_item.querySelector("form .char_count");
    let selected_form  = message_item.querySelector("form");

    message_item.querySelector("p").classList.add("hidden");
    selected_form.classList.remove("hidden");
    char_count.textContent = `${ selected_input.value.length }/250`;

    /* EVENT */
    selected_form.querySelector("input").addEventListener("keydown", (event) => {
        updateMessageCount(event, selected_form);
    });
}

const updatePostReplyData = (event, update_value, item_message) => {
    if(update_value){
        let selected_message = event.target.closest("li").querySelector(item_message);
        let selected_form    = selected_message.closest("li").querySelector("form");

        selected_message.textContent = update_value;
        selected_message.classList.remove("hidden");
        selected_form.classList.add("hidden");

        /* EVENT */
        selected_form.querySelector("input").addEventListener("keydown", (event) => {
            updateMessageCount(event, selected_form);
        });
    }
} 

const updateReplyData = (event) => {
    event.preventDefault();
    let update_reply_value = event.target.querySelector(".update_reply_input").value;

    updatePostReplyData(event, update_reply_value, ".user_reply_message");
}

const submitReplyData = (event) => {
    event.preventDefault();

    let reply_form        = event.target;
    let reply_item_clone  = document.getElementById("clone_block").querySelector(".reply_item").cloneNode(true);
    let update_post_value = reply_form.querySelector(".reply_comment").value;

    reply_item_clone.querySelector(".user_reply_message").textContent = update_post_value;
    reply_item_clone.querySelector(".update_reply_input").value = update_post_value;
    reply_form.closest(".reply_details").querySelector(".reply_list").prepend(reply_item_clone);
    reply_form.reset();

    let message_item = reply_form.closest(".message_item");
    let reply_count  = message_item.querySelectorAll(".reply_list li").length;

    message_item.querySelector(".show_reply_btn").innerHTML = `<span class="caret_arrow"></span> ${ reply_count } ${ (reply_count > 1) ? "Replies" : "Reply" }`;

    /* EVENTS */
    reply_item_clone.querySelector(".update_reply_form").addEventListener("submit", updateReplyData);
    reply_item_clone.querySelector(".delete_btn").addEventListener("click", removeItemData);
    reply_item_clone.querySelector(".update_btn").addEventListener("click", updateItemData);
    showCommentsMenu();
}

const updatePostData = (event) => {
    event.preventDefault();
    let update_post_value = event.target.querySelector(".update_post_input").value;

    updatePostReplyData(event, update_post_value, ".user_post_message");
}

const toggleShowReply = (event) => {
    let message_item  = event.target.closest(".message_item");
    let is_show_reply = message_item.querySelectorAll(".reply_details.hidden");
    let reply_details = message_item.querySelector(".reply_details");

    event.target.classList.toggle("rotate");
    (is_show_reply.length) ? reply_details.classList.remove("hidden") : reply_details.classList.add("hidden");
}

const submitAddPost = (event) => {
    event.preventDefault();
    let post_message_form = event.target;
    let post_item_clone   = document.getElementById("clone_block").querySelector(".post_item").cloneNode(true);
    let post_message_data = post_message_form.querySelector(".post_comment").value;

    if(post_message_data){
        post_item_clone.querySelector(".user_post_message").textContent = post_message_data;
        post_item_clone.querySelector(".update_post_input").value = post_message_data;
    
        document.querySelector("#component_list .post_list").prepend(post_item_clone);
        post_message_form.reset();
        post_message_form.querySelector(".char_count").textContent = "0/250";  
    }

    let reply_form = post_item_clone.querySelector(".reply_form");

    /* EVENTS */
    post_item_clone.querySelector(".update_post_form").addEventListener("submit", updatePostData);
    reply_form.addEventListener("submit", submitReplyData);
    post_item_clone.querySelector(".delete_btn").addEventListener("click", removeItemData);
    post_item_clone.querySelector(".update_btn").addEventListener("click", updateItemData);
    post_item_clone.querySelector(".reply_comment").addEventListener("keydown", (event) => {
        updateMessageCount(event, reply_form);
    });
    post_item_clone.querySelector(".show_reply_btn").addEventListener("click", toggleShowReply);

    showCommentsMenu();
}

const showCommentsMenu = () => {
    document.querySelector(".post_message_list").querySelectorAll(".show_message_actions").forEach(function(comments){
        new bootstrap.Popover(comments, {
            animation: true,
            container: "body",
            content: popover_content,
            html: true,
            trigger: "focus"
        });
    });
}

showCommentsMenu();

const showSectionDetails = (event) => {
    event.target.classList.toggle("is_show");
    event.target.closest(".section_details").querySelector("p").classList.toggle("is_hide");
}

const showComponentsDetails = (event) => {
    document.querySelectorAll(".component_block").forEach(component_item => {
        component_item.classList.add("is_hide");
    })
    event.target.closest(".component_block").classList.remove("is_hide");
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
document.querySelectorAll(".add_post_form").forEach((post_form) => {
    post_form.addEventListener("submit", submitAddPost);
    post_form.querySelector(".post_comment").addEventListener("keydown", (event) => {
        updateMessageCount(event, post_form);
    });
});

document.addEventListener("click", function(event){
    (event.target.classList == "toggle_right_panel") ? document.getElementById("right_panel").classList.toggle("show_right_panel") : "";
    (event.target.classList == "toggle_right_panel") ? document.getElementById("overlay").classList.toggle("show_overlay") : "";
});

document.addEventListener("click", function(event){
    (event.target.id == "overlay") ? document.getElementsByTagName("nav")[0].classList.remove("show_mobile_menu") : "";
    (event.target.id == "overlay") ? event.target.classList.remove("show_overlay") : "";
    (event.target.id == "overlay") ? document.getElementById("right_panel").classList.remove("show_right_panel") : "";
});



document.querySelectorAll(".tab_item .nav-link").forEach((item_link) => {
    item_link.addEventListener("click", selectActiveTab);
});

document.querySelectorAll(".component_block .tab_title").forEach(tab_item => {
    tab_item.addEventListener("click", showComponentsDetails);
});

document.querySelector(".see_more_btn").addEventListener("click", showSectionDetails);
document.querySelectorAll(".show_comments_mobile").forEach((show_item) => {
    show_item.addEventListener("click", () => {
        document.querySelector(".comments_block_mobile").classList.remove("hidden");
    });
});

$(function(){
    $("body").on("click", ".prev_tab, .next_tab", navigateTab);
});

Drog.on(document.querySelector(".comments_block_mobile"));