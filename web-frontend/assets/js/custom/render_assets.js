let assets_data = [
    /* CSS Vendor */
    {url: "/web-frontend/assets/css/vendor/bootstrap/bootstrap.min.css", type: "style"},

    /* CUSTOM CSS */
    {url: current_css, type: "style"},

    /* JS Vendor */
    {url: "/web-frontend/assets/js/vendor/bootstrap/bootstrap.bundle.min.js", type: "script"},

    /* CUSTOM JS */
    {url: current_js, type: "script"}
];

/* Call back to check if the assets is loaded. */
let callback = () => {
    console.log("Loaded!");
};

/* load the vendor for asset loader. */
let loader = new asyncAssetsLoader();

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("body").classList.remove("hidden");
    loader.load(assets_data, callback);
});