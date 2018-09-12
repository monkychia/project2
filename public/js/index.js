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

    // Grab and display all Approved Events on page load
    $.get("/api/eventlist", function(data) {
        data.forEach(event => {
            if (event.status == true) {
                let eventName = event.eventName;
                let contactName = event.contactName;
                let eventDate = moment(event.eventDate).format("LL");  
                let description = event.description;
                let additionalInfo = event.additionalInfo;
                $("#approved-display").append(
                    `<div class="event">
                        <p><b>Event Name:</b> ${eventName}</p>
                        <p><b>Contact Name:</b> ${contactName}</p>
                        <p><b>Event Date:</b> ${eventDate}</p>
                        <p><b>Description:</b> ${description}</p>
                        <p><b>Additional Information:</b> ${additionalInfo}</p>
                        <button class="btn btn-secondary update" type="submit">Update</button>
                        <button class="btn btn-secondary view" type="submit">View</button>
                    </div>`);
            }
        })
    });

    // Grab and display all Pending Events on page load
    $.get("/api/eventlist", function(data) {
        data.forEach(event => {
            if (event.status == false) {
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
            }
        })
    });

});
