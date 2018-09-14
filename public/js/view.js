$(document).ready(function() {
    // Get the query string from url
    let eventListId = getParameterByName("id");
    console.log(eventListId);

    eventListId = Number(eventListId);


    $(document).on("click", ".cancel", function() {
        window.location.replace("/");
    });

    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
});