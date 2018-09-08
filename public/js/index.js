$(document).ready(function() {
    $(document).on("click", ".view", function() {
        window.location.replace("/view");
    });

    $(document).on("click", ".update", function() {
        window.location.replace("/update");
    });

    $(document).on("click", "#create", function() {
        window.location.replace("/create");
    });

    $("#newEventSubmit").on("click", function(event) {
        event.preventDefault();
    
        console.log("You clicked me!");
        //Make a newEvent object
        var newEvent = {
            eventName: $("#newEventName").val().trim(),
            contactName: $("#newContactName").val().trim(),
            eventDate: $("#date").val().trim(),
            description: $("#newEventDescription").val().trim(),
            // additionalInfo: $("additionalInfo").val().trim(),
            // created_at: moment().format("YYYY-MM-DD HH:mm:ss")
        };
    
        // Send an AJAX POST-request with jQuery
        $.post("/api/eventlist", newEvent)
            // On success, run the following code
            .then(function() {
                console.log("New event successfully created!");
            });
    
        // Empty each input box by replacing the value with an empty string
        $("#newEventName").val("");
        $("#newContactName").val("");
        $("#date").val("");
        $("#newEventDescription").val("");
        // $("#additionalInfo").val("");
    });
});
