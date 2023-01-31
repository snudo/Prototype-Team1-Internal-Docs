const autoGrowTextArea = (document_textarea)=>{
    document_textarea.style.height = "5px";
    document_textarea.style.height = (document_textarea.scrollHeight)+"px";
}

const submitCreateSection = (event)=> {
    let cloned_section = document.getElementById("clone_section").cloneNode(true);
    let form_input = event.target.querySelector("#add_section_input");
    
    (form_input.value.length) ? form_input.closest("label").classList.remove("input_error") : form_input.closest("label").classList.add("input_error") ;
    if(form_input.value.length){
        cloned_section.id = new Date().getUTCMilliseconds();
        cloned_section.querySelector(".section_title").textContent = form_input.value;
        document.getElementById("section_list_container").append(cloned_section);

        form_input.value = "";
    }

}

const addNewSection = (event)=> {
    if(event.keyCode === 13) {
        document.getElementById("add_section_form").submit();
    }
}
autoGrowTextArea(document.getElementById("document_description_input"));

document.getElementById("document_description_input").addEventListener("keyup", function(){ autoGrowTextArea(this);});
document.getElementById("add_section_input").addEventListener("keyup", addNewSection);
document.getElementById("add_section_form").addEventListener("submit", submitCreateSection);

$(function() {$("#section_list_container").sortable();});