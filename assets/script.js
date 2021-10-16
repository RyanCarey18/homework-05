const textAreas = $("textarea");
const buttons = $("buttons");
const today = moment();
const todayIs = today.format("dddd, MMMM Do");
$("#currentDay").text(todayIs);
const hour = today.format("HH");
let plans = {};

//Runs for loop to set the color of each hour block
for (let i = 0; i < textAreas.length; i++)
  if (hour < i + 9) {
    $(textAreas[i]).addClass("future");
  } else if (hour == i + 9) {
    $(textAreas[i]).addClass("present");
  } else {
    $(textAreas[i]).addClass("past");
  }

//adds functionality to buttons to make them grab the text and row info.
$(".saveBtn").on("click", function (e) {
  e.preventDefault();

  row = this.id;
  text = $(this).siblings("textarea").val().trim();
  plans[row] = text;

  savePlan();
  renderPlans();
});

//saves my plans to the local storage
function savePlan() {
  localStorage.setItem("plans", JSON.stringify(plans));
}

//pulls plans from local storage and parses them.
function init() {
  var storedPlans = JSON.parse(localStorage.getItem("plans"));

  if (storedPlans !== null) {
    plans = storedPlans;
  }
  renderPlans(storedPlans);
  savePlan();
}
//Renders the plans back into the text boxes
function renderPlans(storedPlans) {
  for (let id in storedPlans) {
    $("#" + id)
      .siblings("textarea")
      .val(storedPlans[id]);
  }
}
init();
