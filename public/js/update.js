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
                    let packet = {};
                    let packets = [];

                    /* Start creating additional dropdowns and fields */
                    let requirements = {
                        "category": null,
                        "vegan": null,
                        "glutenFree": null
                    };

                    // Create new category dropdown
                    $(".updateNewRow").append(`
                        <div class="col-md-3 col-sm-12 form-group dCategory-${i}">
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
                    <div class="col-md-3 col-sm-6 form-group dDietary-${i}"  id = "diet">
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
                    <div class="col-md-2 col-sm-6 form-group dFood-${i}"  id = "food">
                        <label for = "food">Select Food</label>
                        <select class="custom-select dataFood-${i}">
                    `);

                    $.get(`/api/foodlist/${foodListId}`, function(res) {
                        res.forEach(result => {
                            c = requirements.category = result.category;
                            v = result.vegan;
                            g = result.glutenFree;

                            $(".dataCategory-" + i + " option:contains(" + c + ")").attr('selected', 'selected');

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
                        });
                    })

                    // Create new Quantity field
                    $(".updateNewRow").append(`
                    <div class="col-md-2 col-sm-6 quantity-${i}" id = "qty">
                        <label for = "quantity">Quantity</label>
                        <input type="text" class="form-control" id="quantity-${i}">
                    </div>`)
                    $(`#quantity-${i}`).val(dataQty);


                    // Create new amount field
                    $(".updateNewRow").append(`
                    <div class="col-md-2 col-sm-6 total-${i}" id = "amt">
                        <label for = "amount">Amount ($)</label>
                        <input type="text" class="form-control" id="dataTotal-${i}">
                    </div>`)
                    $(`#dataTotal-${i}`).val(dataTotal);
                })
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