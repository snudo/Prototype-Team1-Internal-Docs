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

    message_item.querySelector(".show_reply_btn").innerHTML = `<span class="caret_arrow"></span> ${ reply_count } ${ (reply_count > 1) ? "Replies" : "Reply" }`;
    selected_item.closest("li").remove();
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
        post_message_form.querySelector(".char_count").textContent = "0/250"
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
}

/* EVENTS */
document.querySelectorAll(".add_post_form").forEach((post_form) => {
    post_form.addEventListener("submit", submitAddPost);
    post_form.querySelector(".post_comment").addEventListener("keydown", (event) => {
        updateMessageCount(event, post_form);
    });
});

document.querySelectorAll(".tab_item .nav-link").forEach((item_link) => {
    item_link.addEventListener("click", selectActiveTab);
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