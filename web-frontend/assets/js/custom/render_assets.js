let assets_data = [
    /* JS Vendor */
    {url: "/web-frontend/assets/js/vendor/bootstrap/bootstrap.bundle.min.js", type: "script"},

    /* CUSTOM JS */
    {url: current_js, type: "script"},

    /* CSS Vendor */
    {url: "/web-frontend/assets/css/vendor/bootstrap/bootstrap.min.css", type: "style"},

    /* CUSTOM CSS */
    {url: current_css, type: "style"}
];
let callback = () => {
    console.log("Loaded!");
};
let loader = new asyncAssetsLoader();

loader.load(assets_data, callback);