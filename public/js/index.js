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

    // Eventlistener to POST New Event into DB upon Submit Button Click on Create Page
    $("#newEventSubmit").on("click", function(event) {
        event.preventDefault();
    
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

    // When the page loads, grab and display all of our Pending Events on Index Page
    $.get("/api/eventlist", function(data) {

        if (data.length != 0) {

            for (var i = 0; i < data.length; i++) {
                var row = $("<div>");
                var button = $("<button>View</button>");
                row.addClass("pendEvent");
                button.addClass("btn btn-secondary");
                button.attr("id", "view");

                row.append("<p>" + data[i].eventName + "</p>");
                row.append(button);
                $("#pending-display").append(row);
            }
        }
    });

});
