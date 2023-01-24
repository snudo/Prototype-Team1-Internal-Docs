let selected_assets = [
    "/web-frontend/assets/css/vendor/bootstrap/bootstrap.min.css"
];

for(let index in selected_assets){
    document.getElementsByTagName("head")[ITEMS.first].innerHTML += `<link rel="stylesheet" href="${ selected_assets[index] }"></link>`;
}