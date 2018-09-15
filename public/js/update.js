$(document).ready(function() {
    let updatePage = window.location.pathname;
    console.log(updatePage);
    if (updatePage === '/update') {
        let updateId = getParameterByName("id");
        updateId = Number(updateId);
        console.log('DEBUG: URL id: ', updateId);

        //Get eventData for the current event for updating
        $.get(`/api/eventlist/${updateId}`, function(eventListData) {
            //This will prefill our update forms with its data
            if (eventListData.length > 0) {
                let date = moment(eventListData[0].eventDate).format("L");
                $("#updateEventName").val(eventListData[0].eventName);
                $("#updateContactName").val(eventListData[0].contactName);
                $("#updatedate").val(date);
                $("#updateEventDescription").val(eventListData[0].description);
                $("#updateEventAdditional").val(eventListData[0].additionalInfo);
            } else {
                console.log('Error.  Cannot load Update page.');
            }
        });

        $.get(`/api/ordersList/${updateId}`, function(ordersListData) {
            if (ordersListData.length > 0) {
                console.log('=========== 26', ordersListData.length);
                ordersListData.forEach(function(order, i) {

                    console.log('============= 28', order);
                    let dataFood = order.itemName;
                    let dataQty = order.quantity;
                    let dataTotal = order.total;
                    let packet = {};
                    let packets = [];
                    console.log('----------- 35 index ', i);

                    /* Start creating additional dropdowns and fields */
                    let requirements = {
                        "category": null,
                        "vegan": null,
                        "glutenFree": null
                    };

                    // Create new category dropdown
                    $(".updateNewRow").append(`
                        <div class="col-3 form-group dCategory-${i}">
                            <label for = "category">Select Category</label>
                            <select class="custom-select dataCategory-${i}">
                    `);
                    let categoryArray = [
                        {val: 0, text: "All Category"},
                        {val: 1, text: "Appetizer"}, 
                        {val: 2, text: "Entree"}, 
                        {val: 3, text: "Sides"}, 
                        {val: 4, text: "Dessert"}, 
                        {val: 5, text: "Kids Food"}
                    ];
                    $(categoryArray).each(function() {
                        $(`.dataCategory-${i}`).append($("<option>").attr('value', this.val).text(this.text));
                    });

                    $(".dataCategory-${i} option:contains(" + Entree + ")").attr('selected', 'selected');

                    $(`.dataCategory-${i}`).on('change', function() {
                        let selectedClassification = $(`.dataCategory-${i} option:selected`).text();
                        requirements.category = selectedClassification;
                    });
                })

            //     // Create new dietary dropdown
            //     $(".updateNewRow").append(`
            //         <div class="col-3 form-group newDietary-${i}">
            //             <label for = "dietary">Select Dietary</label>
            //             <select class="custom-select createNewDietary-${i}">
            //     `);
            //     let dietaryArray = [
            //         {val: 0, text: "All Dietary"},
            //         {val: i, text: "Vegan"}, 
            //         {val: 2, text: "Gluten Free"}, 
            //         {val: 3, text: "Both"}, 
            //         {val: 4, text: "Neither"}
            //     ];
            //     $(dietaryArray).each(function() {
            //         $(`.createNewDietary-${i}`).append($("<option>").attr('value', this.val).text(this.text));
            //     });
            //     $(`.createNewDietary-${i}`).on('change', function() {
            //         let selectedDietary = $(`.createNewDietary-${i} option:selected`).text();
            //         if (selectedDietary === "Vegan") {
            //             requirements.vegan = 1;
            //             foodObjectVegan(requirements, 1);
            //         } else if (selectedDietary === "Gluten Free") {
            //             requirements.glutenFree = 1;
            //             foodObjectGluten(requirements, 1);
            //         } else if (selectedDietary === "Both") {
            //             requirements.glutenFree = 1;
            //             requirements.vegan = 1;
            //             foodObjectBoth(requirements, 1);
            //         } else if (selectedDietary === "Neither") {
            //             foodObjectNone(requirements, 1);
            //         }
                
            //         // $(`.createNewFood-${i}`).on('change', function() {
            //         // $(`.createNewFood-${i}`).load(foodName);

            //         $.get(`/api/foodObject/${selectedFood}`, function(food) {
            //             itemName = food[0].itemName;
            //             costPer = Number(food[0].costPer);
            //             foodListId = food[0].id;
            //             packet.itemName = itemName;
            //             packet.costPer = costPer;
            //             packet.foodListId = foodListId;
            //         });
            //         // });
            //     });

            //     // Create new food field before dropdown
            //     $(".updateNewRow").append(`
            //     <div class="col-2 form-group newFood-${i}">
            //         <label for = "food">Select Food</label>
            //         <select class="custom-select createNewFood-${i}">
            //     `);

            //     // Create new Quantity field
            //     $(".updateNewRow").append(`
            //         <div class="col-2 quantity-${i}">
            //             <label for = "quantity">Quantity</label>
            //             <input type="text" class="form-control" id="quantity-${i}">
            //         </div>`)

            //     // Create new amount field
            //     $(".updateNewRow").append(`
            //         <div class="col-2 total-${i}">
            //             <label for = "amount">Amount ($)</label>
            //             <input type="text" class="form-control" id="total-${i}">
            //         </div>`)

            //     // Listener when Quantity is updated
            //     $(`.quantity-${i}`).on('change', function() {
            //         let numberOfOrders = Number($(`#quantity-${i}`).val().trim());
            //         let totalAmount = costPer * numberOfOrders;
            //         packet.quantity = numberOfOrders;
            //         packet.total = totalAmount.toFixed(2);
            //         packets.push(packet);
            //         $(`#total-${i}`).val(totalAmount.toFixed(2));
            //     });
            // } else {
            //     console.log('Somehow append to the web page as NO ORDERS');
            }
        })


        // Listener when the submit button is click
        $("#updateEventSubmit").on("click", function() {
            
            //Making an event object for update
            var updateEvent = {
                eventName: $("#updateEventName").val().trim(),
                contactName: $("#updateContactName").val().trim(),
                eventDate: $("#updatedate").val().trim(),
                description: $("#updateEventDescription").val().trim(),
            };
            //Sending a Ajax PUT request with jquery
            $.ajax({
                url: `/api/eventlist/${updateId}`,
                type: 'PUT',
                data: updateEvent,
                success: function(data) {
                console.log("PUT", data);
                window.location.href = "/";
                }
            });
        });
    }

    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
});