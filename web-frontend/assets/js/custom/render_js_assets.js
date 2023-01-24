let assets_data = [
    {url: "/web-frontend/assets/js/vendor/bootstrap/bootstrap.bundle.min.js", type: "script"},
    {url: current_js, type: "script"},
    {url: "/web-frontend/assets/css/vendor/bootstrap/bootstrap.min.css", type: "style"},
    {url: current_css, type: "style"}
];
let callback = () => {
    console.log("Loaded!");
};
let loader = new asyncAssetsLoader();

loader.load(assets_data, callback);