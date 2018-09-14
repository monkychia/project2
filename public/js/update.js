$(document).ready(function() {
    let id = getParameterByName("id");
    id = Number(id);

    //****************************UPDATE EVENT PAGE*********************************

    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    //function when the submit button is hit
    $("#updateEventSubmit").on("click", function(event) {
        event.preventDefault();
        //Making a event object for update
        var updateEvent = {
        eventName: $("#updateEventName").val().trim(),
        contactName: $("#updateContactName").val().trim(),
        eventDate: $("#updatedate").val().trim(),
        description: $("#updateEventDescription").val().trim(),
        };
        //Sending a Ajax PUT request with jquery
        $.ajax({
            url: '/api/eventlist/' + id,
            type: 'PUT',
            data: updateEvent,
            success: function(data) {
              console.log("PUT", data);
              window.location.href = "/";
            }
        });
    });
  
    // Gets the part of the url that comes after the "?" (which we have if we're updating an event)
    getEventData(id);
    //Get eventData for the current event for updating
    function getEventData(id) {
        $.get("/api/eventlist/" + id, function(data) {
            console.log("EventList:", data);
            //This will prefill our update forms with its data
            if(data) {
                console.log("Event Name:", data[0].eventName);
                $("#updateEventName").val(data[0].eventName);
                $("#updateContactName").val(data[0].contactName);
                $("#updatedate").val(data[0].eventDate);
                $("#updateEventDescription").val(data[0].description);
                console.log("inside eventdata:", data[0].description);
            }
            else {
                alert("No current Events Scheduled");
            }
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
  
    //************************MENU PAGE******************************
    //This function grabs food items from the database and updates the Menu
    // $(document).on("click", ".menu", function() {

    // });   
    // $( ".menu" ).load(function() {
    //     // Handler for .load() called.
    //     $.get("/api/foodList", function(data) {
    //         console.log("FoodList:", data);
    //         for (var i = 0; i < data.length; i++){
    //             //  console.log("Panel display:", data[i]);
    //             var newTr = $("<tr>");
    //             newTr.addClass("foodTable");
    //             newTr.data("foodDetail", data);
    //             newTr.append("<td>" + data[i].id + "</td>");
    //             newTr.append("<td>" + data[i].itemName + "</td>");
    //             newTr.append("<td>" + data[i].category + "</td>");
    //             newTr.append("<td>" + data[i].dietary + "</td>");
    //             newTr.append("<td>" + data[i].costPer + "</td>");
    //             console.log("Cost:", data[i].costPer);
    //             console.log("Table Rows:", newTr);
    //             $(".list-food").append(newTr);
    //         }
    //     });
    //   });
});