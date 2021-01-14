const APP_NAME = "gas-vue-template"

function include(filename) {
    return HtmlService.createTemplateFromFile(filename).evaluate().getContent()
}

function doGet() {
    return HtmlService
        .createTemplateFromFile("index.html")
        .evaluate()
        .setTitle(APP_NAME)
        .addMetaTag("viewport", "width=device-width,initial-scale=1")
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
}
