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

        //Approve Button Click
        $(document).on("click", ".approve", function() {
        
            // Sending AJAX PUT Request
            $.ajax({
                url: '/api/eventlist/status/' + eventListId,
                type: 'PUT',
                data: {status: 1},
                success: function(data) {
                console.log(data);
                console.log("Event Approved!");
                alert("The Event was approved!!");
                window.location.href = "/";
                }
            });
        });
    });

    // Grab and display Orderlist Information on page load
    $.get("/api/orderslist", function(data) {
        data.forEach(occasion => {
            if (occasion.eventListId === eventListId) {
                console.log(occasion);
                let itemName = occasion.itemName;
                let quantity = occasion.quantity;
                let total = occasion.total;

                $("#orderList").append(
                    `<tr>
                        <th id="foodItem" scope="row"> ${itemName}</th>
                        <td id="foodAmount"> ${quantity}</td>
                        <td id="foodPrice"> ${total}</td>
                    </tr>`);
            }
        })  
    });

    $.get("/api/ordersList/" + eventListId, function(data) {
        let totalEventPrice = 0;
        data.forEach(occasion => {
            let total = occasion.total;
            totalEventPrice += total;
        });

        $("#eventTotalCost").text(totalEventPrice);
    });
});