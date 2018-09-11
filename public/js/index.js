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
    $.get("/api/eventList", function(data) {
        data.forEach(event => {
            let eventName = event.eventName;
            let contactName = event.contactName;
            let eventDate = moment(event.eventDate).format("LL");  
            let description = event.description;
            let additionalInfo = event.additionalInfo;
            $("#pending-display").append(
                `<div class="event">
                    <p><b>Event Name:</b> ${eventName}</p>
                    <p><b>Contact Name:</b> ${contactName}</p>
                    <p><b>Event Date:</b> ${eventDate}</p>
                    <p><b>Description:</b> ${description}</p>
                    <p><b>Dishes Ordered:</b> ${additionalInfo}</p>
                    <button class="btn btn-secondary view" type="submit">View</button>
                </div>`);
        })
    });

});
