$(document).ready(function () {
  // To get the current date and time
  const hour = moment().hour();

  //  set the time runing interval by 1 seond and display the date and time as a local time same as computer
  setInterval(() => {
    $("#currentDay").text(new Date().toString().replace(/ GMT.+\)/, ""));
  }, 1000);

  // use for loop and if then else short-cut function to set one day calendar from 9AM to 5PM with changing colors in text cell by current time as past, present , and future
  //  append <div> , <textarea>,and <button> elements to their parent <div> with class="container"
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
    // added one icon with button element to inform that this is the save button
  }

  let taskContent = $(".description");
  let saveButton = $(".saveBtn");

  //

  // use each() method and for loop function to get each task value as well as paired with local hours were stored in local storeage
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

  // time and task content are stored in the local storage when click save button
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
