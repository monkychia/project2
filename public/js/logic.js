var numbOfRows = 0;
var restrictions = {
    "category": null,
    "vegan": null,
    "glutenFree": null
};

$(document).ready(function(){
    $("#newFoodRow").on("click", function(){
        numbOfRows++;

        // Create new category dropdown
        $(".newRow").append(`
            <div class="col-3 form-group newCategory-${numbOfRows}">
                <label for = "category">Select Category</label>
                <select class="custom-select createNewCategory-${numbOfRows}">
        `);
        var categoryArray = [
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
            // console.log( this );
            var selectedCategory = $(`.createNewCategory-${numbOfRows} option:selected`).text();
            restrictions.category = selectedCategory;
        });

        // Create new dietary dropdown
        $(".newRow").append(`
            <div class="col-3 form-group newDietary-${numbOfRows}">
                <label for = "dietary">Select Dietary</label>
                <select class="custom-select createNewDietary-${numbOfRows}">
        `);
        var dietaryArray = [
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
            var selectedDietary = $(`.createNewDietary-${numbOfRows} option:selected`).text();
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
                            $(`.createNewFood-${numbOfRows}`).append($("<option>").attr('value', 0).text("All food")); 
                        }
                        $(`.createNewFood-${numbOfRows}`).append($("<option>").attr('value', index).text(item.itemName)); 
                    })               
                })
                $(`.createNewFood-${numbOfRows}`).on('change', function() {
                    var selectedFood = $(`.createNewFood-${numbOfRows} option:selected`).text();
                    console.log(selectedFood);
                });
            }
        });

        // Create new food field before dropdown
        $(".newRow").append(`
        <div class="col-3 form-group newFood-${numbOfRows}">
            <label for = "food">Select Food</label>
            <select class="custom-select createNewFood-${numbOfRows}">
        `);

        // Create new amount field
        $(".newRow").append(`
            <div class="col-3 updateAmount-${numbOfRows}">
                <label for = "amount">Amount</label>
                <input type="text" class="form-control" id="updateAmount">
            </div>`)

        // newCategorySelector();
        // newFoodButton();
        // newAmountSelector();
        // newDietarySelector();
    });
});
// +++++++++++++++++++++++++++++++THIS FUNCTION WILL CREATE A CATEGORY SELECTOR FOR A NEW ROW +++++++++++++++++++++++++++++++//
// function newCategorySelector(){
   
//     var dropDown = $("<div class='dropdown mb-3'>");
//     var categorySelect = $("<button class='btn btn-default dropdown-toggle categorySelection'>");
//     categorySelect.attr({ "type":"button", "id":"categorySelection" +numbOfRows, "data-toggle":"dropdown", "aria-haspopup":"true","aria-expanded":"false" });
//     categorySelect.text("Select Category");
//     categorySelect.appendTo(dropDown);
//     var categoryArray = ["Appetizer", "Entree", "Sides", "Dessert", "Kids Food"];
//     var categoryList = $("<div class='dropdown-menu'>");
//     categoryList.attr("id", "selectedCategory");

//     for(var i=0; i < categoryArray.length; i++){
//         var anchor = $("<a class='dropdown-item catSelected'>");
//         anchor.attr({"id": categoryArray[i].toString().toLowerCase().replace("'", "").split(' ').join('') + "-select" +numbOfRows, "data-ref": categorySelect.attr("id")});
//         anchor.appendTo(categoryList);
//         anchor.text(categoryArray[i].toString());
//     }
//     categoryList.appendTo(dropDown);
//     $("#createNewCategory").append(dropDown);
// }
// // +++++++++++++++++++++++++++++++THIS FUNCTION WILL CREATE A FOOD SELECTOR FOR A NEW ROW +++++++++++++++++++++++++++++++//
// function newFoodButton(){
   
//     var dropDown = $("<div class='dropdown mb-3'>");
//     var foodSelect = $("<button class='btn btn-default dropdown-toggle disabled'>");
//     foodSelect.attr({ "type":"button", "id":"foodSelection"+numbOfRows, "data-toggle":"dropdown", "aria-haspopup":"true","aria-expanded":"false" });
//     foodSelect.text("Select food");
//     foodSelect.appendTo(dropDown);

//     // var foodArray = [];
    
//     // var foodList = $("<div class='dropdown-menu'>");
//     // foodList.attr("id", "selectedfood");
    
//     // for(var i=0; i < foodArray.length; i++){
//     //     var anchor = $("<a class='dropdown-item itemSelected>");
//     //     anchor.attr("id", foodArray[i].toString().toLowerCase().replace("'", "").split(' ').join('') + "-select" +numbOfRows);
//     //     anchor.appendTo(foodList);
//     //     anchor.text(foodArray[i].toString());
//     //     console.log(anchor);
//     // }
//     foodSelect.appendTo(dropDown);
//     $("#createNewFoodSelect").append(dropDown);
// }
// function newFoodDropdown(row){
//     $.get("/api/foodObject", restrictions, function(data){
//         var foodArray = [];
//         var foodList = $("<div class='dropdown-menu'>");
//         foodList.attr("id", "selectedfood"+row);

//         for(var i = 0; i < data.length; i++){
//             foodArray.push(data[i].itemName);
//             var anchor = $("<a class='dropdown-item itemSelected>");
//             anchor.attr("id", foodArray[i].toString().toLowerCase().replace("'", "").split(' ').join('') + "-select" +row);
//             //anchor.attr({"id": categoryArray[i].toString().toLowerCase().replace("'", "").split(' ').join('') + "-select" +numbOfRows, "data-ref": categorySelect.attr("id")});
//             anchor.appendTo(foodList);
//             console.log(foodArray[i]);
//             anchor.text(foodArray[i].toString());
//             console.log(anchor);
//         }
//         console.log(foodArray);
//         console.log(foodList);
       
//         foodList.appendTo($("#foodSelection"+row));
//         console.log("appened foodList to #foodSelection");
        
//     });
// }
// // +++++++++++++++++++++++++++++++THIS FUNCTION WILL CREATE AN AMOUNT SELECTOR FOR A NEW ROW +++++++++++++++++++++++++++++++//
// function newAmountSelector(){
//     var inputDiv = $("<div class='input-group mb-3'>");
//     var inputPrepend = $("<div class ='input-group-prepend'>");
//     var inputSpan = $("<span class='input-group-text'>");
//     inputSpan.attr("id", "inputGroup-sizing-default");
//     inputSpan.text("Amount");
//     var inputForm = $("<input class='form-control'>");
//     inputForm.attr({ "type":"text", "aria-label":"Default", "aria-describedby":"inputGroup-sizing-default" });

//     inputSpan.appendTo(inputPrepend);
//     inputForm.appendTo(inputPrepend);
//     inputPrepend.appendTo(inputDiv);
//     inputDiv.appendTo(amountForm);

//     $("#createNewAmountForm").append(amountForm);
// }
// // +++++++++++++++++++++++++++++++THIS FUNCTION WILL CREATE A DIERTY RESTRICTION SELECTOR FOR A NEW ROW +++++++++++++++++++++++++++++++//
// function newDietarySelector(){

//     var dietaryArray = ["Vegan", "Gluten Free", "Both", "Neither"];
//     var dropDown = $("<div class='dropdown mb-3'>");
//     var dietarySelect = $("<button class='btn btn-default dropdown-toggle disabled'>");
//     dietarySelect.attr({ "id":"dietarySelection"+numbOfRows,"type":"button","data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false" });
//     dietarySelect.text("Dietary Restrictions");
//     dietarySelect.appendTo(dropDown);
//     var dietaryList = $("<div class='dropdown-menu'>");
//     dietaryList.attr("id", "selectedDietary");

//     for(var i=0; i < dietaryArray.length; i++){

//         var anchor = $("<a class='dropdown-item dietSelected'>");
//         anchor.attr({ "id": dietaryArray[i].toString().toLowerCase().replace("'","").split(' ').join('')+"-select"+numbOfRows,"data-ref":dietarySelect.attr("id") });
//         anchor.appendTo(dietaryList);
//         anchor.text(dietaryArray[i].toString());
//     }
//     dietaryList.appendTo(dropDown);
//     $("#createNewDietary").append(dropDown);
// }

$(document).ready(function () {
    var date_input = $('input[name="date"]');
    var container = $('.bootstrap-iso form').length > 0 ? $('.bootstrap-iso form').parent() : "body";
    date_input.datepicker({
        format: 'mm/dd/yyyy',
        container: container,
        todayHighlight: true,
        autoclose: true,
    });
});