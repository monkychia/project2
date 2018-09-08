var numbOfRows = 0;
$(document).ready(function(){

$(document).on("click", ".dropdown-item", function(){
    var buttonID = $(this).attr("data-ref");
    $("#"+buttonID).text($(this).text());
    console.log("it happened", buttonID,$(buttonID).text());
});
$("#newFoodRow").on("click", function(){
    numbOfRows++;
    newCategorySelector();
    newFoodSelector();
    newAmountSelector();
    newDietarySelector();
});
});
// +++++++++++++++++++++++++++++++THIS FUNCTION WILL CREATE A CATEGORY SELECTOR FOR A NEW ROW +++++++++++++++++++++++++++++++//
function newCategorySelector(){
   
    var dropDown = $("<div class='dropdown mb-3'>");
    var categorySelect = $("<button class='btn btn-default dropdown-toggle'>");
    categorySelect.attr({ "type":"button", "id":"categorySelection" +numbOfRows, "data-toggle":"dropdown", "aria-haspopup":"true","aria-expanded":"false" });
    categorySelect.text("Select Category");
    categorySelect.appendTo(dropDown);
    var categoryArray = ["Appetizers", "Entrees", "Sides", "Dessert", "Kid's Food"];
    var categoryList = $("<div class='dropdown-menu'>");
    categoryList.attr("id", "selectedCategory");

    for(var i=0; i < categoryArray.length; i++){
        var anchor = $("<a class='dropdown-item'>");
        anchor.attr({"id": categoryArray[i].toString().toLowerCase().replace("'", "").split(' ').join('') + "-select" +numbOfRows, "data-ref": categorySelect.attr("id")});
        anchor.appendTo(categoryList);
        anchor.text(categoryArray[i].toString());
        console.log(anchor);
    }
    categoryList.appendTo(dropDown);
    $("#createNewCategory").append(dropDown);
}
// +++++++++++++++++++++++++++++++THIS FUNCTION WILL CREATE A FOOD SELECTOR FOR A NEW ROW +++++++++++++++++++++++++++++++//
function newFoodSelector(){
   
    var dropDown = $("<div class='dropdown mb-3'>");
    var foodSelect = $("<button class='btn btn-default dropdown-toggle'>");
    foodSelect.attr({ "type":"button", "id":"foodSelection", "data-toggle":"dropdown", "aria-haspopup":"true","aria-expanded":"false" });
    foodSelect.text("Select food");
    foodSelect.appendTo(dropDown);
    var foodArray = [];
    var foodList = $("<div class='dropdown-menu'>");
    foodList.attr("id", "selectedfood");
    
    for(var i=0; i < foodArray.length; i++){
        var anchor = $("<a class='dropdown-item>");
        anchor.attr("id", foodArray[i].toString().toLowerCase().replace("'", "").split(' ').join('') + "-select" +numbOfRows);
        anchor.appendTo(foodList);
        anchor.text(foodArray[i].toString());
        console.log(anchor);
    }
}
// +++++++++++++++++++++++++++++++THIS FUNCTION WILL CREATE AN AMOUNT SELECTOR FOR A NEW ROW +++++++++++++++++++++++++++++++//
function newAmountSelector(){
    
    var amountForm = $("<form>");
    var inputDiv = $("<div class='input-group mb-3'>");
    var inputPrepend = $("<div class ='input-group-prepend'>");
    var inputSpan = $("<span class='input-group-text'>");
    inputSpan.attr("id", "inputGroup-sizing-default");
    inputSpan.text("Amount");
    var inputForm = $("<input class='form-control'>");
    inputForm.attr({ "type":"text", "aria-label":"Default", "aria-describedby":"inputGroup-sizing-default" });

    inputSpan.appendTo(inputPrepend);
    inputForm.appendTo(inputPrepend);
    inputPrepend.appendTo(inputDiv);
    inputDiv.appendTo(amountForm);

    $("#createNewAmountForm").append(amountForm);
}
// +++++++++++++++++++++++++++++++THIS FUNCTION WILL CREATE A DIERTY RESTRICTION SELECTOR FOR A NEW ROW +++++++++++++++++++++++++++++++//
function newDietarySelector(){

    var dietaryArray = ["Vegan", "Gluten Free", "Both"];
    var dropDown = $("<div class='dropdown mb-3'>");
    var dietarySelect = $("<button class='btn btn-default dropdown-toggle'>");
    dietarySelect.attr({ "id":"dietarySelection"+numbOfRows,"type":"button","data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false" });
    dietarySelect.text("Dietary Restrictions");
    dietarySelect.appendTo(dropDown);
    var dietaryList = $("<div class='dropdown-menu'>");
    dietaryList.attr("id", "selectedDietary");

    for(var i=0; i < dietaryArray.length; i++){

        var anchor = $("<a class='dropdown-item'>");
        anchor.attr({ "id": dietaryArray[i].toString().toLowerCase().replace("'","").split(' ').join('')+"-select","data-ref":dietarySelect.attr("id") });
        anchor.appendTo(dietaryList);
        anchor.text(dietaryArray[i].toString());
        console.log(anchor);
    }
    dietaryList.appendTo(dropDown);
    $("#createNewDietary").append(dropDown);
}

$(document).ready(function () {
    var date_input = $('input[name="date"]');
    var container = $('.bootstrap-iso form').length > 0 ? $('.bootstrap-iso form').parent() : "body";
    date_input.datepicker({
        format: 'mm/dd/yyyy',
        container: container,
        todayHighlight: true,
        autoclose: true,
    })
})