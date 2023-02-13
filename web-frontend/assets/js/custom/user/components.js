var confirm_modal   = new bootstrap.Modal(document.getElementById("delete_post_modal"), {});
var components_tab_modal = new bootstrap.Modal(document.getElementById("components_tab_list"), {});
var popover_content = document.getElementById("comment_options");
var selected_comment_element = "";
var comment_to_insert_reply = "";
var current_post_id = 3;
var current_reply_id = 5;

/* CALLBACK FUNCTIONS */
const updateMessageCount = (event, message_form) => {
    event.target.maxLength = "250";

    message_form.querySelector(".char_count").textContent = `${event.target.value.length}/250`;

}

const scrollToElement = (selected_item) => {
    let parent_container = document.getElementById("component_wrapper");
    let targetPosition = selected_item.offsetTop - parent_container.offsetTop;

    window.scroll({
        top: targetPosition,
        left: 0,
        behavior: "smooth"
    });
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
        if(post_type === "post"){
            document.getElementById("see_all_comments_btn").click();
        }

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
    selected_form.querySelector("input").addEventListener("input", (event) => {
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
        selected_form.querySelector("input").addEventListener("input", (event) => {
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
    reply_form.querySelector(".char_count").textContent = "0/250";
    reply_form.reset();

    scrollToElement(reply_item_clone);
    reply_item_clone.classList.add("newly_added_message");
    
    setTimeout(() => {
        reply_item_clone.classList.remove("newly_added_message");
    }, 1500);

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
        post_item_clone.classList.add("newly_added_message");
        document.querySelector("#component_list .post_list").prepend(post_item_clone);

        post_message_form.reset(post_item_clone);
        post_message_form.querySelector(".char_count").textContent = "0/250";

        scrollToElement(post_item_clone);

        setTimeout(() => {
            post_item_clone.classList.remove("newly_added_message");
        }, 1500);
    }

    let reply_form = post_item_clone.querySelector(".reply_form");

    /* EVENTS */
    post_item_clone.querySelector(".update_post_form").addEventListener("submit", updatePostData);
    reply_form.addEventListener("submit", submitReplyData);
    post_item_clone.querySelector(".delete_btn").addEventListener("click", removeItemData);
    post_item_clone.querySelector(".update_btn").addEventListener("click", updateItemData);
    post_item_clone.querySelector(".reply_comment").addEventListener("input", (event) => {
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
    post_form.querySelector(".post_comment").addEventListener("input", (event) => {
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

const commentPopover = (event) => {
    if(event.target.classList == "show_message_actions"){
        selected_comment_element = event.target.closest("li");
    }
}

const manipulateComment = (event) => {
    if(event.target.classList == "remove_action"){
        let post_type      = (selected_comment_element.getAttribute("class") == "post_item") ? "post" : "reply";
        let action_btn_id  = event.target.closest(".popover").getAttribute("id");
        let parent_id      = document.querySelector(`.show_message_actions[aria-describedby="${action_btn_id}"]`).closest("li").getAttribute("id");
        let message_parent = document.getElementById(parent_id);
        let parent_id_data = [];

        parent_id_data.push(parent_id);
        
        confirm_modal._element.querySelector("#post_type").textContent = post_type;
        confirm_modal.show();

        document.getElementById("confirm_button_yes").addEventListener("click", function(){
            confirm_modal.hide();
    
            if(post_type === "reply"){
                let message_details = document.getElementById(parent_id_data[0]);
                
                if(message_details){
                    let message_count   = message_details.closest(".message_details").querySelectorAll(".reply_item").length - 1;

                    message_details.closest(".message_details").querySelector(".reply_text").textContent = `${ message_count } ${ (message_count > 1) ? "Replies" : "Reply" }`;
                }
            }
            else{
                let post_count = document.querySelectorAll(".post_message_list .post_item").length - 1;
                let no_post_result_mobile = document.querySelector(".no_post_result_mobile");

                (post_count) ? no_post_result_mobile.classList.add("hidden") : no_post_result_mobile.classList.remove("hidden");

                if(post_count < 4){
                    let all_posts = document.querySelector(".post_message_list").getElementsByClassName("post_item");

                    Array.from(all_posts).forEach((post_item, index) => {
                        (index > 2) && post_item.classList.remove("hidden");
                    });

                    document.getElementById("see_all_comments_btn").classList.add("hidden");
                }
            }

            message_parent.remove();
        });
    }
    else if(event.target.classList == "edit_action"){
        let form_element = document.getElementById("post_reply_form");
        let action_type = "";
        let form_label_element = form_element.querySelector("h3");
        let comment_reply_input = form_element.querySelector(".reply_post_input");

        if(selected_comment_element.getAttribute("class") == "post_item"){
            action_type = MOBILE_COMMENT_ACTION_TYPES.edit_comment;
            form_label_element.innerHTML = "Edit Comment"
            comment_reply_input.value = selected_comment_element.querySelector(".user_post_message").textContent;
        }
        else{
            action_type = MOBILE_COMMENT_ACTION_TYPES.edit_reply;
            form_label_element.innerHTML = "Edit Reply"
            comment_reply_input.value = selected_comment_element.querySelector(".user_reply_message").textContent;
        }

        form_element.querySelector(".char_count").textContent = `${ comment_reply_input.value.length }/250`;

        /* Create cancel trigger for editing */
        let cancel_btn = document.createElement("span");
        cancel_btn.id = "cancel_btn";
        cancel_btn.innerHTML = "Cancel";
        form_label_element.appendChild(cancel_btn);

        cancel_btn.addEventListener("click", () => {
            let form_element = document.getElementById("post_reply_form");
            form_element.querySelector("h3").innerHTML = "Post"
            form_element.querySelector(".reply_post_input").value = "";
            form_element.setAttribute("data-action_id", MOBILE_COMMENT_ACTION_TYPES.create_comment);

            selected_comment_element = "";
        });

        form_element.setAttribute("data-action_id", action_type);
        form_element.querySelector(".reply_post_input").focus();
    }
}

const submitPostReplyForm = (event) => {
    event.preventDefault();

    let form_element = event.target;
    let action_type = parseInt(form_element.getAttribute("data-action_id"));
    let reply_post_input = form_element.querySelector(".reply_post_input");

    if(action_type === MOBILE_COMMENT_ACTION_TYPES.create_comment){
        let cloned_post = document.getElementById("post_item_clone").cloneNode(true);
        let see_all_comments_btn = document.getElementById("see_all_comments_btn");

        current_post_id = current_post_id + 1;
        cloned_post.id = "post_" + current_post_id;
        cloned_post.classList.remove("hidden");
        cloned_post.querySelector(".user_post_message").innerHTML = reply_post_input.value;

        document.querySelector(".post_message_list").prepend(cloned_post);

        see_all_comments_btn.classList.add("is_show");
        see_all_comments_btn.innerHTML = "See Less <span class='caret_down'></span>";

        document.querySelectorAll(".post_message_list .post_item").forEach((post_item) => {
            post_item.classList.remove("hidden");
        });
        showCommentsMenu();

        cloned_post.querySelector(".show_reply_btn").addEventListener("click", (event) => {
            comment_to_insert_reply = event.target.closest("li");
            let form_element = document.getElementById("post_reply_form");
            let form_label_element = form_element.querySelector("h3");
            form_label_element.innerHTML = "Reply to " + comment_to_insert_reply.querySelector(".user_name").textContent;
            form_element.setAttribute("data-action_id", MOBILE_COMMENT_ACTION_TYPES.create_reply);
    
            /* Create cancel trigger for editing */
            let cancel_btn = document.createElement("span");
            cancel_btn.id = "cancel_btn";
            cancel_btn.innerHTML = "Cancel";
            form_label_element.appendChild(cancel_btn);
    
            cancel_btn.addEventListener("click", () => {
                let form_element = document.getElementById("post_reply_form");

                form_element.querySelector("h3").innerHTML = "Post"
                form_element.querySelector(".reply_post_input").value = "";
                form_element.setAttribute("data-action_id", MOBILE_COMMENT_ACTION_TYPES.create_comment);
    
                comment_to_insert_reply = "";
            });
    
            form_element.querySelector(".reply_post_input").focus();
        });
    }
    else if(action_type === MOBILE_COMMENT_ACTION_TYPES.create_reply){
        let cloned_reply = document.getElementById("reply_item_clone").cloneNode(true);

        current_reply_id = current_reply_id + 1;
        cloned_reply.id = "reply_" + current_reply_id;
        cloned_reply.classList.remove("hidden");
        cloned_reply.querySelector(".user_reply_message").innerHTML = reply_post_input.value;

        comment_to_insert_reply.querySelector(".reply_list").prepend(cloned_reply);

        let more_replies_btn = comment_to_insert_reply.querySelector(".more_replies_btn");

        more_replies_btn.classList.add("is_show");
        more_replies_btn.innerHTML = "See Less <span class='caret_down'></span>";

        comment_to_insert_reply.querySelectorAll(".reply_list .reply_item").forEach((reply_item) => {
            reply_item.classList.remove("hidden");
        });

        showCommentsMenu();

        let reply_count = comment_to_insert_reply.querySelectorAll(".reply_item").length;

        comment_to_insert_reply.querySelector(".reply_text").textContent = `${ reply_count } ${ (reply_count > 1) ? "Replies" : "Reply" }`;
    }
    else{
        let message_element = (action_type === MOBILE_COMMENT_ACTION_TYPES.edit_comment) ? ".user_post_message" : ".user_reply_message";
        selected_comment_element.querySelector(message_element).textContent = reply_post_input.value;

        form_element.querySelector("h3").innerHTML = "Post"
    }

    reply_post_input.value = "";
    form_element.querySelector(".char_count").textContent = "0/250";
    return false;
}

document.addEventListener("click", commentPopover);
document.addEventListener("click", manipulateComment);
document.getElementById("post_reply_form").addEventListener("submit", submitPostReplyForm);

let all_show_replies_dropdown = document.getElementsByClassName("show_reply_btn");

Array.from(all_show_replies_dropdown).forEach((element) => {
    element.addEventListener("click", (event) => {
        comment_to_insert_reply = event.target.closest("li");

        if(comment_to_insert_reply.querySelector(".reply_list").classList.contains("hideContent")){
            comment_to_insert_reply.querySelector(".reply_list").classList.remove("hideContent");
            let form_element = document.getElementById("post_reply_form");
            let form_label_element = form_element.querySelector("h3");
            form_label_element.innerHTML = "Reply to " + comment_to_insert_reply.querySelector(".user_name").textContent;
            form_element.setAttribute("data-action_id", MOBILE_COMMENT_ACTION_TYPES.create_reply);

            /* Create cancel trigger for editing */
            let cancel_btn = document.createElement("span");
            cancel_btn.id = "cancel_btn";
            cancel_btn.innerHTML = "Cancel";
            form_label_element.appendChild(cancel_btn);

            cancel_btn.addEventListener("click", () => {
                let form_element = document.getElementById("post_reply_form");
                form_element.querySelector("h3").innerHTML = "Post"
                form_element.querySelector(".reply_post_input").value = "";
                form_element.setAttribute("data-action_id", MOBILE_COMMENT_ACTION_TYPES.create_comment);

                comment_to_insert_reply = "";
            });

            if(comment_to_insert_reply.querySelector(".see_more_btn") !== null){
                comment_to_insert_reply.querySelector(".see_more_btn").classList.remove("hidden");
            }

            form_element.querySelector(".reply_post_input").focus();
        }
        else{
            comment_to_insert_reply.querySelector(".reply_list").classList.add("hideContent");

            let form_element = document.getElementById("post_reply_form");
            form_element.querySelector("h3").innerHTML = "Post"
            form_element.querySelector(".reply_post_input").value = "";
            form_element.setAttribute("data-action_id", MOBILE_COMMENT_ACTION_TYPES.create_comment);

            if(comment_to_insert_reply.querySelector(".see_more_btn") !== null){
                comment_to_insert_reply.querySelector(".see_more_btn").classList.add("hidden");
            }

            comment_to_insert_reply = "";
        }

        let message_details = element.closest(".message_details");

        message_details.querySelector(".more_replies_btn").toggleAttribute("data-is-show-reply");

        if(message_details.querySelector(".more_replies_btn").hasAttribute("data-is-show-reply")){
            let all_reply_item = message_details.querySelector(".reply_list").getElementsByClassName("reply_item");

            Array.from(all_reply_item).forEach((reply_item, index) => {
                (index > 2) && reply_item.classList.add("hidden");
            });
        }
    });
});

const updatePostReplyInput = (event) => {
    let selected_input = event.target;

    selected_input.closest("form").querySelector(".char_count").textContent = `${selected_input.value.length}/250`;
};

const fetchAllComments = () => {
    let all_posts = document.querySelector(".post_message_list").getElementsByClassName("post_item");

    Array.from(all_posts).forEach((post_item, index) => {
        (index > 2) ? post_item.classList.add("hidden") : post_item.classList.remove("hidden");
    });
}

const seeAllComments = (event) => {
    fetchAllComments();

    let see_more_post_btn = event.target;

    see_more_post_btn.classList.toggle("is_show");
    (see_more_post_btn.textContent.trim("") === "See More") ? see_more_post_btn.innerHTML = "See Less <span class='caret_down'></span>" : see_more_post_btn.innerHTML = "See More <span class='caret_down'></span>";

    if(see_more_post_btn.getAttribute("class") === "see_more_btn is_show"){
        let all_posts = document.querySelector(".post_message_list").getElementsByClassName("post_item");

        Array.from(all_posts).forEach((post_item, index) => {
            (index > 2) && post_item.classList.toggle("hidden");
        });
    }
}

fetchAllComments();

document.getElementById("see_all_comments_btn").addEventListener("click", seeAllComments);

const seeAllReplies = (event) => {
    let see_more_btn = event.target;
    let reply_reply = see_more_btn.closest(".message_details").querySelector(".reply_list").getElementsByClassName("reply_item");

    see_more_btn.classList.toggle("is_show");
    
    (see_more_btn.textContent.trim("") === "See More") ? see_more_btn.innerHTML = "See Less <span class='caret_down'></span>" : see_more_btn.innerHTML = "See More <span class='caret_down'></span>";

    Array.from(reply_reply).forEach((reply_item, index) => {
        (index > 2) && reply_item.classList.toggle("hidden");
    });
}

let show_other_replies_btn = document.getElementsByClassName("more_replies_btn");

Array.from(show_other_replies_btn).forEach((element) => {
    element.addEventListener("click", seeAllReplies);
});

$(function(){
    $("body").on("click", ".prev_tab, .next_tab", navigateTab);
});

Drog.on(document.querySelector(".comments_block_mobile"));

document.querySelector(".reply_post_input").addEventListener("input", updatePostReplyInput);
document.querySelector(".show_tabs_btn").addEventListener("click", () => {
    components_tab_modal.show();
});
document.querySelector(".go_back_btn").addEventListener("click", () => {
    window.location.href = "/web-frontend/views/user/sections.html";
});