$(document).ready(function() {
    $(document).on("click", ".view", function() {
        let url = `/view?id=${$(this).data("id")}`;
        window.location.replace(url);
    });

    $(document).on("click", ".update", function() {
        window.location.replace("/update");
    });

    $(document).on("click", "#create", function() {
        window.location.replace("/create");
    });

    // Grab and display all Approved occasions on page load
    $.get("/api/eventlist", function(data) {
        data.forEach(occasion => {
            if (occasion.status === true) {
                let occasionName = occasion.eventName;
                let contactName = occasion.contactName;
                let occasionDate = moment(occasion.eventDate).format("LL");  
                let description = occasion.description;
                let additionalInfo = occasion.additionalInfo;
                let id = occasion.id;
        
                $("#approved-display").append(
                    `<div class="occasion">
                        <p><b>Event Name:</b> ${occasionName}</p>
                        <p><b>Contact Name:</b> ${contactName}</p>
                        <p><b>Event Date:</b> ${occasionDate}</p>
                        <p><b>Description:</b> ${description}</p>
                        <p><b>Additional Information:</b> ${additionalInfo}</p>
                        <button class="btn btn-secondary update" type="submit">Update</button>
                        <button class="btn btn-secondary view" type="submit" data-id=${id}>View</button>
                    </div>`);
            }
        })
    });

    // Grab and display all Pending occasions on page load
    $.get("/api/eventlist", function(data) {
        data.forEach(occasion => {
            if (occasion.status === false) {
                let occasionName = occasion.eventName;
                let contactName = occasion.contactName;
                let occasionDate = moment(occasion.eventDate).format("LL");  
                let description = occasion.description;
                let additionalInfo = occasion.additionalInfo;
                let id = occasion.id;

                $("#pending-display").append(
                    `<div class="occasion">
                        <p><b>Event Name:</b> ${occasionName}</p>
                        <p><b>Contact Name:</b> ${contactName}</p>
                        <p><b>Event Date:</b> ${occasionDate}</p>
                        <p><b>Description:</b> ${description}</p>
                        <p><b>Additional Information:</b> ${additionalInfo}</p>
                        <button class="btn btn-secondary view" type="submit" data-id=${id}>View</button>
                    </div>`);
            }
        })
    });

});
