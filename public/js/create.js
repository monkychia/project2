$(document).ready(function() {
  // Eventlistener to POST New Event into DB upon Submit Button Click on Create Page
  $("#newEventSubmit").on("click", function(event) {
    event.preventDefault();

    //Make a newEvent object
    var newEvent = {
        eventName: $("#newEventName").val().trim(),
        contactName: $("#newContactName").val().trim(),
        eventDate: $("#date").val().trim(),
        description: $("#newEventDescription").val().trim(),
        additionalInfo: $("#newEventAdditional").val().trim()
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
    $("#newEventAdditional").val("");
  });

});