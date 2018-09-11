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

    //****************************UPDATE EVENT PAGE**********************************
    //Calling the update formsubmit function when the submit button is hit
    $("#updateEventSubmit").on("submit", updateEventForm);
    // This function figures out which event we want to edit and takes it to the appropriate url
    function handleEventUpdate() {
        window.location.replace("/update");
        var currentEvent = $(this).parent().parent().data("eventList");
        window.location.href = "/update?id=" + currentEvent.id;
       
    }
    var events;
    // Gets the part of the url that comes after the "?" (which we have if we're updating an event)
    var url = window.location.search;
    var eventId;
    var foodId;
    //Sets a flag to be false initially
    var update= false;
    // If we have this section in our url, we pull out the eventList id from the url
    // In '?post_id=1', eventListId is 1
        if (url.indexOf("?eventListId=") !== -1) {
        eventId = url.split("=")[1];
        getEventData(eventId);
        console.log("Update Page:", eventId);
        }
        //Gets event data for the current event
        getFoodLists();

        //Get eventData for the current event for updating
        function getEventData(id, type) {
        var queryUrl;
        switch (type) {
            case "eventList":
            queryUrl = "/api/eventList" + id;
            break;
            case "foodList":
            queryUrl = "/api/foodList" + id;
            break;
            default:
            return;
        }
        $.get(queryUrl, function(data) {
            console.log("EventList:", data);
            //This will prefill our update forms with its data
            if(data) {
            $("#updateEventName").val(data.eventName);
            $("#updateContactName").val(data.contactName);
            $("#updateDate").val(data.eventDate);
            $("#updateEventdescription").val(data.description);
            // getCategoryList();
            // getDietaryList();
            $("#updateFoodSelect").val(data.itemName);
            $("#updateAmount").val(data.costPer);
            //Set a flag to know to update the event when the submit button is hit
            update = true;
            }
        });
        }

    //This function is called when the submit button of the update page is hit
    function updateEventForm(event) {
        event.preventDefault();
        //Making a event object for update
        var updateEvent = {
        eventName: $("#updateEventName").val().trim(),
        contactName: $("#updateContactName").val().trim(),
        eventDate: $("#updatedate").val().trim(),
        description: $("#updateEventDescription").val().trim(),
        };

        //Sending a Ajax PUT request with jquery
        $.PUT("/api/eventList", updateEvent)
        .then(function() {
            console.log("Updated the event");
            window.location.href = "/";
        });
    }

    //Getting food item from the DATABASE
    function getFoodLists() {
        $.get("/api/foodList", renderFoodList);
    }
    //Function that will render a list of food Item
    function renderFoodList(data){
        if(!data.length) {
        window.location.href = "/create";
        }
        $(".hidden").removeClass("hidden");
        var rowsToAdd = [];
        for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createFoodRow(data[i]));
        }
        $("#updateFoodSelect").empty();
        console.log(rowsToAdd);
        $("#updateFoodSelect").append(rowsToAdd);
        $("#updateFoodSelect").val(data.itemName);
    }
    //Create the food options in the dropDown
    function createFoodRow(foodList) {
        var listOption = $("<option>");
        listOption.attr("value", foodList.id);
        listOption.text(foodList.itemName);
        return listOption;
    }

    function getCategoryList(){
        $.get("/api/foodlist", function(data) {
        $("#updateNewCategory").val(data.category);
        });
    }

    function getDietaryList(){
        $.get("/api/foodlist", function(data) {
        $("#updateNewDietary").val(data.dietary);
        });
    }


    // This function figures out which event to delete and then calls deletePost
    function handleEventDelete() {
        var currentEvent = $(this)
        .parent("td")
        .parent("tr")
        .data("eventList");
        var id = currentEvent.id;
        $.ajax({
        method: "DELETE",
        url: "/api/eventList" + id
        }).then(function() {
        console.log("Deleted an event successfully!!");
        window.location.href = "/index";
        });
    }

});
