/* CALLBACK FUNCTIONS */
const removeItemData = (event) => {
    event.target.closest("li").remove();
}

const updatePostReplyData = (event, update_value, item_message) => {
    if(update_value){
        event.target.closest("li").querySelector(item_message).textContent = update_value;
    }
} 

const updateReplyData = (event) => {
    event.preventDefault();
    let update_reply_value = event.target.querySelector(".user_reply_input").value;

    updatePostReplyData(event, update_reply_value, ".user_reply_message");
}

const submitReplyData = (event) => {
    event.preventDefault();
    let reply_form = event.target;
    let reply_item_clone = document.getElementById("clone_block").querySelector(".reply_item").cloneNode(true);
    let update_post_value = reply_form.querySelector(".reply_comment").value;

    reply_item_clone.querySelector(".user_reply_message").textContent = update_post_value;
    reply_item_clone.querySelector(".user_reply_input").value = update_post_value;
    reply_form.closest(".reply_details").querySelector(".reply_list").prepend(reply_item_clone);
    reply_form.reset();

    /* EVENTS */
    reply_item_clone.querySelector(".update_reply_form").addEventListener("submit", updateReplyData);
    reply_item_clone.querySelector(".delete_btn").addEventListener("click", removeItemData);
}

const updatePostData = (event) => {
    event.preventDefault();
    let update_post_value = event.target.querySelector(".user_post_input").value;

    updatePostReplyData(event, update_post_value, ".user_post_message");
}

const submitAddPost = (event) => {
    event.preventDefault();
    let post_message_form = event.target;
    let post_item_clone   = document.getElementById("clone_block").querySelector(".post_item").cloneNode(true);
    let post_message_data = post_message_form.querySelector(".post_comment").value;

    if(post_message_data){
        post_item_clone.querySelector(".user_post_message").textContent = post_message_data;
        post_item_clone.querySelector(".user_post_input").value = post_message_data;
    
        document.querySelector("#component_list .post_list").prepend(post_item_clone);
        post_message_form.reset();
    }

    /* EVENTS */
    post_item_clone.querySelector(".update_post_form").addEventListener("submit", updatePostData);
    post_item_clone.querySelector(".reply_form").addEventListener("submit", submitReplyData);
    post_item_clone.querySelector(".delete_btn").addEventListener("click", removeItemData);
}

/* EVENTS */
document.querySelectorAll(".add_post_form").forEach((post_form) => {
    post_form.addEventListener("submit", submitAddPost);
    post_form.querySelector(".post_comment").addEventListener("keydown", (event) => {
        event.target.maxLength = "249";

        post_form.querySelector(".char_count").textContent = `${event.target.value.length + 1}/250`;
    });
});