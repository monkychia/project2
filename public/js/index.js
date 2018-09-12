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
                    <p><b>Additional Information:</b> ${additionalInfo}</p>
                    <button class="btn btn-secondary view" type="submit">View</button>
                </div>`);
        })
    });

});
