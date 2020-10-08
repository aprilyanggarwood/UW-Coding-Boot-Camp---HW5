$(document).ready(function () {
  //   const date = new Date();
  const hour = moment().hour();

  setInterval(() => {
    $("#currentDay").text(new Date().toString().replace(/ GMT.+\)/, ""));
  }, 1000);

  for (let index = 9; index < 18; index++) {
    $(".container").append(`
    <div class="row time-block">
  <div class="col-2 hour">
    ${index < 12 ? `${index}AM` : index > 12 ? `${index - 12}PM` : `12PM`}
  </div>
  <textarea class="col-8 ${
    index < hour ? "past" : index > hour ? "future" : "present"
  } description"></textarea>
  <button class="col-2 saveBtn"><i class="far fa-save"></i></button>
</div>`);
  }

  let taskContent = $(".description");
  let saveButton = $(".saveBtn");

  taskContent.each(function () {
    for (let index = 0; index < localStorage.length; index++) {
      let localStorageKey = localStorage.key(index);
      let taskContentValue = localStorage.getItem(localStorageKey);
      let taskHour = $(this).siblings(".hour").text();

      if (localStorageKey === taskHour) {
        $(this).val(taskContentValue);
      }
    }
  });

  // Function to save task input once the save button is clicked.
  function saveTasks() {
    let currentTime = $(this).data("hour");
    let taskHour = $(this).siblings(".hour").text();
    let task = $(this).siblings(".description").val();

    console.log(currentTime, taskHour, task);

    if (task === "") {
      localStorage.setItem(taskHour, "");
    } else {
      localStorage.setItem(taskHour, task);
    }
  }

  saveButton.on("click", saveTasks);
});

// var DateTime = luxon.DateTime;
// var date = DateTime.local();
// console.log(date);

// setInterval(() => {
//   $("#currentDay").text(
//     DateTime.local().toLocaleString({
//       weekday: "short",
//       month: "short",
//       day: "2-digit",
//       hour: "2-digit",
//       minute: "2-digit",
//     })
//   );
// }, 1000);
