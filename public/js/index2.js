// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(results) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/FoodLists",
      data: JSON.stringify(results)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/FoodLists",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/FoodLists/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $FoodList = data.map(function(results) {
      var $a = $("<a>")
        .text(FoodLists.itemName)
        .attr("href", "/FoodLists/" + FoodLists.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": FoodLists.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($FoodList);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var example = {
    itemName: $exampleText.val().trim(),
    category: $exampleDescription.val().trim()
  };

  if (!(example.itemName && example.category)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(results).then(function() {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
