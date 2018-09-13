let numbOfRows = 0;
let eventListId = 0;
let payloads = [];

$(document).ready(function(){
    $("#newFoodRow").on("click", function(){
        let payload = {};
        if (eventListId === 0) {
            //Make a newEvent object
            let newEvent = {
                eventName: $("#newEventName").val().trim(),
                contactName: $("#newContactName").val().trim(),
                eventDate: $("#date").val().trim(),
                description: $("#newEventDescription").val().trim(),
                additionalInfo: $("#newEventAdditional").val().trim()
            };

            // Send an AJAX POST-request with jQuery
            $.post("/api/eventlist", newEvent)
                // On success, run the following code
                .then(function(res) {
                    eventListId = res.id;
                    payload.eventListId = eventListId;
                });
        } else {  
            payload.eventListId = eventListId;
        }
        
        /* Start creating additional dropdowns and fields */
        numbOfRows++;
        let restrictions = {
            "category": null,
            "vegan": null,
            "glutenFree": null
        };

        // Create new category dropdown
        $(".newRow").append(`
            <div class="col-3 form-group newCategory-${numbOfRows}">
                <label for = "category">Select Category</label>
                <select class="custom-select createNewCategory-${numbOfRows}">
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
            $(`.createNewCategory-${numbOfRows}`).append($("<option>").attr('value', this.val).text(this.text));
        });

        $(`.createNewCategory-${numbOfRows}`).on('change', function() {
            let selectedCategory = $(`.createNewCategory-${numbOfRows} option:selected`).text();
            restrictions.category = selectedCategory;
        });

        // Create new dietary dropdown
        $(".newRow").append(`
            <div class="col-3 form-group newDietary-${numbOfRows}">
                <label for = "dietary">Select Dietary</label>
                <select class="custom-select createNewDietary-${numbOfRows}">
        `);
        let dietaryArray = [
            {val: 0, text: "All Dietary"},
            {val: 1, text: "Vegan"}, 
            {val: 2, text: "Gluten Free"}, 
            {val: 3, text: "Both"}, 
            {val: 4, text: "Neither"}
        ];
        $(dietaryArray).each(function() {
            $(`.createNewDietary-${numbOfRows}`).append($("<option>").attr('value', this.val).text(this.text));
        });
        $(`.createNewDietary-${numbOfRows}`).on('change', function() {
            let selectedDietary = $(`.createNewDietary-${numbOfRows} option:selected`).text();
            if (selectedDietary === "Vegan") {
                restrictions.vegan = true;
                restrictions.glutenFree = false;
            } else if (selectedDietary === "Gluten Free") {
                restrictions.glutenFree = true;
                restrictions.vegan = false;
            } else if (selectedDietary === "Both") {
                restrictions.glutenFree = true;
                restrictions.vegan = true;
            } else if (selectedDietary === "Neither") {
                restrictions.glutenFree = false;
                restrictions.vegan = false;
            }

            if(restrictions.glutenFree !== null && restrictions.vegan !== null && restrictions.category !== null) {
                $.get("/api/foodObject", restrictions, function(data){
                    data.forEach(function(item, index) {
                        if (index === 0) {
                            ++index;
                            $(`.createNewFood-${numbOfRows}`).append($("<option>").attr('value', 0).text("Food")); 
                        }
                        $(`.createNewFood-${numbOfRows}`).append($("<option>").attr('value', index).text(item.itemName)); 
                    })               
                })
                $(`.createNewFood-${numbOfRows}`).on('change', function() {
                    let selectedFood = $(`.createNewFood-${numbOfRows} option:selected`).text();

                    $.get(`/api/foodObject/${selectedFood}`, function(food) {
                        itemName = food[0].itemName;
                        costPer = Number(food[0].costPer);
                        foodListId = food[0].id;
                        payload.itemName = itemName;
                        payload.costPer = costPer;
                        payload.foodListId = foodListId;
                    })

                });
            }
        });

        // Create new food field before dropdown
        $(".newRow").append(`
        <div class="col-2 form-group newFood-${numbOfRows}">
            <label for = "food">Select Food</label>
            <select class="custom-select createNewFood-${numbOfRows}">
        `);

        // Create new Quantity field
        $(".newRow").append(`
            <div class="col-2 quantity-${numbOfRows}">
                <label for = "quantity">Quantity</label>
                <input type="text" class="form-control" id="quantity-${numbOfRows}">
            </div>`)

        // Create new amount field
        $(".newRow").append(`
            <div class="col-2 total-${numbOfRows}">
                <label for = "amount">Amount ($)</label>
                <input type="text" class="form-control" id="total-${numbOfRows}">
            </div>`)

        // Listener when Quantity is updated
        $(`.quantity-${numbOfRows}`).on('change', function() {
            let numberOfOrders = Number($(`#quantity-${numbOfRows}`).val().trim());
            let totalAmount = costPer * numberOfOrders;
            payload.quantity = numberOfOrders;
            payload.total = totalAmount.toFixed(2);
            payloads.push(payload);
            $(`#total-${numbOfRows}`).val(totalAmount.toFixed(2));
        });
    });

    // Eventlistener to POST New Event into DB upon Submit Button Click on Create Page
    $("#newEventSubmit").on("click", function() {
        payloads.forEach(item => {
            $.post("/api/ordersList", item)
            .then(function(data) {
                // DO NOTHING
            })
        })
        // Redirect to View page
        let eventListId = payloads[0].eventListId;
        let url = `/view?id=${eventListId}`;
        window.location.replace(url);
    });

    // Date picker
    let date_input = $('input[name="date"]');
    let container = $('.bootstrap-iso form').length > 0 ? $('.bootstrap-iso form').parent() : "body";
    date_input.datepicker({
        format: 'mm/dd/yyyy',
        container: container,
        todayHighlight: true,
        autoclose: true,
    });
});
