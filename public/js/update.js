$(document).ready(function() {
    let updatePage = window.location.pathname;
    if (updatePage === '/update') {
        let updateId = getParameterByName("id");
        updateId = Number(updateId);

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
                ordersListData.forEach(function(order, i) {
                    let dataFood = order.itemName;
                    let dataQty = order.quantity;
                    let dataTotal = order.total;
                    let foodListId = order.foodListId;
                    let dataCostPer = parseFloat(order.costPer);
                    let id = parseInt(order.id);

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

                    // Create new dietary dropdown
                    $(".updateNewRow").append(`
                    <div class="col-3 form-group dDietary-${i}">
                        <label for = "dietary">Select Dietary</label>
                        <select class="custom-select dataDietary-${i}">
                        `);
                    let dietaryArray = [
                        {val: 0, text: "All Dietary"},
                        {val: i, text: "Vegan"}, 
                        {val: 2, text: "Gluten Free"}, 
                        {val: 3, text: "Both"}, 
                        {val: 4, text: "Neither"}
                    ];
                    $(dietaryArray).each(function() {
                        $(`.dataDietary-${i}`).append($("<option>").attr('value', this.val).text(this.text));
                    });

                    // Create new food field before dropdown
                    $(".updateNewRow").append(`
                    <div class="col-2 form-group dFood-${i}">
                        <label for = "food">Select Food</label>
                        <select class="custom-select dataFood-${i}">
                    `);

                    $.get(`/api/foodlist/${foodListId}`, function(res) {
                        res.forEach(result => {
                            c = requirements.category = result.category;
                            v = result.vegan;
                            g = result.glutenFree;

                            $(".dataCategory-" + i + " option:contains(" + c + ")").attr('selected', 'selected');

                            $(`.dataCategory-${i}`).attr("disabled","disabled");

                            if (v && g) {
                                b = "Both";
                                requirements.vegan = 1;
                                requirements.glutenFree = 1;
                                foodObjectBoth(requirements, i, dataFood);
                            } else if (v && !g) {
                                b = "Vegan";
                                requirements.vegan = 1;
                                foodObjectVegan(requirements, i, dataFood);
                            } else if (g && !v) {
                                b = "Gluten Free";
                                requirements.glutenFree = 1;
                                foodObjectGluten(requirements, i, dataFood);
                            } else {
                                b = "Neither";
                                requirements.vegan = 0;
                                requirements.glutenFree = 0;
                                foodObjectNone(requirements, i, dataFood);
                            }

                            $(".dataDietary-" + i + " option:contains(" + b + ")").attr('selected', 'selected');

                            $(`.dataDietary-${i}`).attr("disabled","disabled");
                        });
                    })

                    // Create new Quantity field
                    $(".updateNewRow").append(`
                    <div class="col-2 quantity-${i}">
                        <label for = "quantity">Quantity</label>
                        <input type="text" class="form-control" id="quantity-${i}">
                    </div>`)
                    $(`#quantity-${i}`).val(dataQty);


                    // Create new amount field
                    $(".updateNewRow").append(`
                    <div class="col-2 total-${i}">
                        <label for = "amount">Amount ($)</label>
                        <input type="text" class="form-control" id="dataTotal-${i}">
                    </div>`)
                    $(`#dataTotal-${i}`).val(dataTotal);

                    let packet = {};
                    packet.quantity = dataQty;
                    packet.total = dataTotal;
                    packet.itemName = dataFood;
                    packet.costPer = dataCostPer;
                    packet.foodListId = foodListId;

                    // Listener to Select Food field
                    $(`.dataFood-${i}`).on('change', function() {
                        let selectedFood = $(`.dataFood-${i} option:selected`).text();
                        packet.itemName = selectedFood;

                        $.get(`/api/foodList/name/${selectedFood}`, function(data) {
                            costPer = data[0].costPer;
                            packet.costPer = costPer;
                            packet.foodListId = data[0].id;
                            packet.total = 0.00;
                            packet.quantity = 0.00;
                        });

                        $(`#quantity-${i}`).val('');
                        $(`#dataTotal-${i}`).val('');
                        updateOrder(id, packet);
                    });

                    // Listener when Quantity is updated
                    $(`.quantity-${i}`).on('change', function() {
                        let numberOfOrders = Number($(`#quantity-${i}`).val().trim());
                        let totalAmount = dataCostPer * numberOfOrders;
                        packet.quantity = numberOfOrders;
                        packet.total = totalAmount;
                        updateOrder(id, packet);
                        $(`#dataTotal-${i}`).val(totalAmount.toFixed(2));
                    });

                });
            }
        // Listener when add button is clicked
        numbOfRows = ordersListData.length - 1;
        $("#updateNewFoodRow").on("click", function(){
        console.log("UPDATE PAGE NEW FOOD ROW CLICK");
        numbOfRows++;
    
        let restrictions = {
        "category": null,
        "vegan": null,
        "glutenFree": null
    };

    // Create new category dropdown
    $(".updateNewRow").append(`
        <div class="col-3 form-group dCategory-${numbOfRows}">
            <label for = "category">Select Category</label>
            <select class="custom-select updateNewCategory-${numbOfRows}">
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
        $(`.updateNewCategory-${numbOfRows}`).append($("<option>").attr('value', this.val).text(this.text));
    });

    $(`.updateNewCategory-${numbOfRows}`).on('change', function() {
        let selectedCategory = $(`.updateNewCategory-${numbOfRows} option:selected`).text();
        restrictions.category = selectedCategory;
    });

    // update new dietary dropdown
    $(".updateNewRow").append(`
        <div class="col-3 form-group dDietary-${numbOfRows}">
            <label for = "dietary">Select Dietary</label>
            <select class="custom-select updateNewDietary-${numbOfRows}">
    `);
    let dietaryArray = [
        {val: 0, text: "All Dietary"},
        {val: 1, text: "Vegan"}, 
        {val: 2, text: "Gluten Free"}, 
        {val: 3, text: "Both"}, 
        {val: 4, text: "Neither"}
    ];
    $(dietaryArray).each(function() {
        $(`.updateNewDietary-${numbOfRows}`).append($("<option>").attr('value', this.val).text(this.text));
    });

    $(`.updateNewDietary-${numbOfRows}`).on('change', function() {
        let selectedDietary = $(`.updateNewDietary-${numbOfRows} option:selected`).text();
        if (selectedDietary === "Vegan") {
            restrictions.vegan = 1;
            foodObjectVegan(restrictions, numbOfRows);
        } else if (selectedDietary === "Gluten Free") {
            restrictions.glutenFree = 1;
            foodObjectGluten(restrictions, numbOfRows);
        } else if (selectedDietary === "Both") {
            restrictions.glutenFree = 1;
            restrictions.vegan = 1;
            foodObjectBoth(restrictions, numbOfRows);
        } else if (selectedDietary === "Neither") {
            foodObjectNone(restrictions, numbOfRows);
        }
    
            $(`.updateNewFood-${numbOfRows}`).on('change', function() {
                let selectedFood = $(`.updateNewFood-${numbOfRows} option:selected`).text();

                $.get(`/api/foodObject/${selectedFood}`, function(food) {
                    itemName = food[0].itemName;
                    costPer = Number(food[0].costPer);
                    foodListId = food[0].id;
                    payload.itemName = itemName;
                    payload.costPer = costPer;
                    payload.foodListId = foodListId;
                });
            });
    });

    // Create new food field before dropdown
    $(".updateNewRow").append(`
    <div class="col-2 form-group dFood-${numbOfRows}">
        <label for = "food">Select Food</label>
        <select class="custom-select updateNewFood-${numbOfRows}">
    `);

    // Create new Quantity field
    $(".updateNewRow").append(`
        <div class="col-2 quantity-${numbOfRows}">
            <label for = "quantity">Quantity</label>
            <input type="text" class="form-control" id="updateQuantity-${numbOfRows}">
        </div>`)

    // Create new amount field
    $(".updateNewRow").append(`
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
});
    

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
                    window.location.href = "/";
                }
            });
        });
    }

    function updateOrder(orderListId, packet){
        $.ajax({
            url: `/api/orderslist/${orderListId}`,
            type: "PUT",
            data: packet,
            success: function(data) {}
        })
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

    function foodObjectVegan(requirements, i, dataFood){
        $.get("/api/foodObject/vegan", requirements, function(data){
            data.forEach(function(item, index) {
                $(`.dataFood-${i}`).append($("<option>").attr('value', index).text(item.itemName));
            })
            $(".dataFood-" + i + " option:contains(" + dataFood + ")").attr('selected', 'selected');     
        })
    }
    
    function foodObjectGluten(requirements, i, dataFood){
        $.get("/api/foodObject/glutenfree", requirements, function(data){
            data.forEach(function(item, index) {
                $(`.dataFood-${i}`).append($("<option>").attr('value', index).text(item.itemName));
            })   
            $(".dataFood-" + i + " option:contains(" + dataFood + ")").attr('selected', 'selected');
        })
    }
    
    function foodObjectBoth(requirements, i, dataFood){
        $.get("/api/foodObject/both", requirements, function(data){
            data.forEach(function(item, index) {
                $(`.dataFood-${i}`).append($("<option>").attr('value', index).text(item.itemName)); 
            })
            $(".dataFood-" + i + " option:contains(" + dataFood + ")").attr('selected', 'selected');      
        })
    }
    
    function foodObjectNone(requirements, i, dataFood){
        $.get("/api/foodObject/none", requirements, function(data){
            data.forEach(function(item, index) {
                $(`.dataFood-${i}`).append($("<option>").attr('value', index).text(item.itemName)); 
            })
            $(".dataFood-" + i + " option:contains(" + dataFood + ")").attr('selected', 'selected');           
        })
    }
});