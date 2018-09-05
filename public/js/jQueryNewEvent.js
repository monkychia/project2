$("#newFoodRow").on("click", function(){
    newCategorySelector();
    newFoodSelector();
    newAmountSelector();
    newDietarySelector();

}) 

// +++++++++++++++++++++++++++++++THIS FUNCTION WILL CREATE A CATEGORY SELECTOR FOR A NEW ROW +++++++++++++++++++++++++++++++//
function newCategorySelector(){
   
    var dropDown = $("<div>");
    dropDown.addClass("dropdown mb-3");
    var categorySelect = $("<button>");
    categorySelect.addClass("btn btn-default dropdown-toggle");
    categorySelect.attr({ "type":"button", "id":"categorySelection", "data-toggle":"dropdown", "aria-haspopup":"true",
    "aria-expanded":"false" });
    categorySelect.text("Select Category");
    categorySelect.appendTo(dropDown);
    var categoryArray = ["Appetizers", "Entrees", "Sides", "Dessert", "Kid's Food"];
    var categoryList = $("<div>");
    categoryList.addClass("dropdown-menu").attr("id", "selectedCategory");


    for(var i=0; i < categoryArray.length; i++){

        var anchor = $("<a>")
        anchor.addClass("dropdown-item")
        anchor.attr("id", categoryArray[i].toString().toLowerCase().replace("'", "").split(' ').join('') + "-select")
        anchor.appendTo(categoryList)
        anchor.text(categoryArray[i].toString())
        console.log(anchor)

    }
    categoryList.appendTo(dropDown)
    $("#createNewCategory").append(dropDown)
}
// +++++++++++++++++++++++++++++++THIS FUNCTION WILL CREATE A FOOD SELECTOR FOR A NEW ROW +++++++++++++++++++++++++++++++//

function newFoodSelector(){
   
    var dropDown = $("<div>");
    dropDown.addClass("dropdown mb-3");
    var foodSelect = $("<button>");
    foodSelect.addClass("btn btn-default dropdown-toggle");
    foodSelect.attr({ "type":"button", "id":"foodSelection", "type":"button", "data-toggle":"dropdown", "aria-haspopup":"true",
    "aria-expanded":"false" });
    foodSelect.text("Select food");
    foodSelect.appendTo(dropDown);
    var foodArray = [];
    var foodList = $("<div>");
    foodList.addClass("dropdown-menu").attr("id", "selectedfood");

    for(var i=0; i < foodArray.length; i++){

        var anchor = $("<a>")
        anchor.addClass("dropdown-item")
        anchor.attr("id", foodArray[i].toString().toLowerCase().replace("'", "").split(' ').join('') + "-select")
        anchor.appendTo(foodList)
        anchor.text(foodArray[i].toString())
        console.log(anchor)

    }
}

// +++++++++++++++++++++++++++++++THIS FUNCTION WILL CREATE AN AMOUNT SELECTOR FOR A NEW ROW +++++++++++++++++++++++++++++++//
function newAmountSelector(){
    
    var amountForm = $("<form>");
    var inputDiv = $("<div>");
    inputDiv.addClass("input-group mb-3");
    var inputPrepend = $("<div>");
    inputPrepend.addClass("input-group-prepend");
    var inputSpan = $("<span>");
    inputSpan.addClass("input-group-text");
    inputSpan.attr("id", "inputGroup-sizing-default");
    inputSpan.text("Amount");
    var inputForm = $("<input>");
    inputForm.addClass("form-control");
    inputForm.attr({"type":"text", "class":"form-control", "aria-label":"Default", "aria-describedby":"inputGroup-sizing-default"})

    inputSpan.appendTo(inputPrepend)
    inputForm.appendTo(inputPrepend);
    inputPrepend.appendTo(inputDiv);
    inputDiv.appendTo(amountForm);

    $("#createNewAmountForm").append(amountForm);

}


// +++++++++++++++++++++++++++++++THIS FUNCTION WILL CREATE A DIERTY RESTRICTION SELECTOR FOR A NEW ROW +++++++++++++++++++++++++++++++//
function newDietarySelector(){

    var dropDown = $("<div>");
    dropDown.addClass("dropdown mb-3");
    var dietarySelect = $("<button>");
    dietarySelect.addClass("btn btn-default dropdown-toggle");
    dietarySelect.attr({ "id":"dietarySelection", "type":"button", "data-toggle":"dropdown", "aria-haspopup":"true",
    "aria-expanded":"false" });
    dietarySelect.text("Dietary Restrictions");
    dietarySelect.appendTo(dropDown);
    var dietaryArray = ["Vegan", "Gluten Free", "Both"];
    var dietaryList = $("<div>");
    dietaryList.addClass("dropdown-menu").attr("id", "selectedDietary");

    for(var i=0; i < dietaryArray.length; i++){

        var anchor = $("<a>")
        anchor.addClass("dropdown-item")
        anchor.attr("id", dietaryArray[i].toString().toLowerCase().replace("'", "").split(' ').join('') + "-select")
        anchor.appendTo(dietaryList)
        anchor.text(dietaryArray[i].toString())
        console.log(anchor)

    }
    dietaryList.appendTo(dropDown)
    $("#createNewDietary").append(dropDown)
}

