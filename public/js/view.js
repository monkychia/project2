$(document).ready(function() {
    // Get the query string from url
    let eventListId = getParameterByName("id");
    // console.log(eventListId);

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

    // Grab and display Evenlist Information on page load
    $.get("/api/eventlist", function(data) {
        data.forEach(occasion => {
            if (occasion.id === eventListId) {
                let occasionName = occasion.eventName;
                let contactName = occasion.contactName;
                let occasionDate = moment(occasion.eventDate).format("LL");  
                let description = occasion.description;
                let additionalInfo = occasion.additionalInfo;

                $("#eventName").text(occasionName);
                $("#contactName").text(contactName);
                $("#eventDescription").text(description);
                $("#eventDate").text(occasionDate);
                $("#eventAdditionalInfo").text(additionalInfo);
            }
        })
    });

    // Grab and display Orderlist Information on page load
    $.get("/api/orderslist", function(data) {
        data.forEach(occasion => {
            if (occasion.eventListId === eventListId) {
                console.log(occasion);
                let itemName = occasion.itemName;
                let quantity = occasion.quantity;
                let total = occasion.total.toFixed(1);
                let totalPrice = Number(quantity * total).toFixed(2);
                let totalEventPrice = 0;

                $("#orderList").append(
                    `<tr>
                        <th id="foodItem" scope="row"> ${itemName}</th>
                        <td id="foodAmount"> ${quantity}</td>
                        <td id="foodPrice"> ${totalPrice}</td>
                    </tr>`);
            }
            $("#eventTotalCost").text("I DON'T KNOW HOW TO GRAB IT");
        })
    });

    // Approve Button Click
    // $(document).on("click", ".approve", function(event) {
    //     event.preventDefault();
    //     // Making an Event Object for Update
    //     let updateEvent = {
    //         eventName: $("#eventName").val().trim(),
    //         contactName: $("#contactName").val().trim(),
    //         eventDate: $("#eventDate").val().trim(),
    //         description: $("#eventDescription").val().trim(),
    //         additionalInfo: $("#eventAdditionalInfo").val().trim(),
    //         status: true
    //     };
    //     // Sending AJAX PUT Request
    //     $.ajax({
    //         url: '/api/eventlist/' + eventListId,
    //         type: 'PUT',
    //         data: updateEvent,
    //         success: function(data) {
    //             console.log(data);
    //           console.log("Event Approved!");
    //         }
    //     });
    // });
});