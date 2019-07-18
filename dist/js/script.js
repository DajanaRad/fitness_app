//VARIBLES FOR CLICK EVENET
const days = document.querySelectorAll(".jsClickDay");

//

//VARIABLE FOR GENERATE HTML ON index.html PAGE

const hours = document.querySelector("#hours");
const steps = document.querySelector("#step");
const calories = document.querySelector("#calorie");

//VARIABLE FOR GENERATE HTML ON day.html PAGE

const htmlDay = document.querySelector("#day");
const htmlDate = document.querySelector("#date");
const htmlStep = document.querySelector("#day_steps");
const htmlKm = document.querySelector("#day_km");
const htmlCal = document.querySelector("#day_cal");
const htmlHour = document.querySelector("#day_hours");

const dateSteps = [
  { timestamp: 1560151980000, steps: 981 },
  { timestamp: 1560161100000, steps: 103 },
  { timestamp: 1560179640000, steps: 1911 },
  { timestamp: 1560243749916, steps: 1404 },
  { timestamp: 1560255089916, steps: 820 },
  { timestamp: 1560268621886, steps: 350 },
  { timestamp: 1560273869916, steps: 1033 },
  { timestamp: 1560327840000, steps: 344 },
  { timestamp: 1560426300000, steps: 768 },
  { timestamp: 1560428460000, steps: 401 },
  { timestamp: 1560443340000, steps: 129 },
  { timestamp: 1560503520000, steps: 655 },
  { timestamp: 1560525960000, steps: 377 },
  { timestamp: 1560531120000, steps: 606 },
  { timestamp: 1560540780000, steps: 1533 },
  { timestamp: 1560546660000, steps: 1176 }
];

//ADDING TO CLICKED DAY WHITE BACKGROUND STYLE

days.forEach(day =>
  day.addEventListener("click", () => {
    days.forEach(element => element.classList.remove("active"));
    day.classList.add("active");
  })
);

//EXTRACTION OF STEPS FOR DAY

const stepsForDay = (products, day) =>
  products.reduce((array, product) => {
    var date = new Date(product.timestamp * 1000);
    if (date.getDay() === day) {
      array.push(product.steps);
    }
    return array;
  }, []);

// EXTRACTION OF STEPS FOR WEEK

const stepsForWeek = products => {
  return products.reduce((acumulator, product) => {
    acumulator.push(product.steps);
    return acumulator;
  }, []);
};

// SUM OF STEPS

const sum = days =>
  days.reduce((acuml, day) => {
    acuml += day;
    return acuml;
  });

// CALCULATION OF KM, CALORIES AND TIME

const calculateKM = steps => ((steps * 0.762) / 1000).toFixed(1);

const calculateCalories = steps => Math.round(steps * 0.05);

const calculateTime = steps => {
  let totalSeconds = steps * 0.5;
  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  const time = `${hours ? hours + "h " + minutes + "m" : minutes + "m"}`;
  return time;
};

// VARIABLE OF STEPS FOR EACH DAY

const friday = sum(stepsForDay(dateSteps, 5));
const thursday = sum(stepsForDay(dateSteps, 4));
const wednesday = sum(stepsForDay(dateSteps, 3));
const tuesday = sum(stepsForDay(dateSteps, 2));
const monday = sum(stepsForDay(dateSteps, 1));
const week = sum(stepsForWeek(dateSteps));

//ADDING COMMA TO STEPS

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// GENERATE ARGUMENTS FOR GenerateDayHtml FUNCTION

function generateInfo(day) {
  var arg = [];
  arg.push(numberWithCommas(day)); //steps
  arg.push(calculateKM(day)); //km
  arg.push(calculateCalories(day)); //cal
  arg.push(calculateTime(day)); //time
  return arg;
}

//INFORMATION FOR WEEK

const stepForWeek = numberWithCommas(week);
const caloriesForWeek = calculateCalories(week);
const timeForWeek = calculateTime(week);

// FUNCTION WRITIN HTML FOR index.html PAGE

const generateIndexHtml = () => {
  hours.innerHTML = timeForWeek;
  steps.innerHTML = stepForWeek;
  calories.innerHTML = caloriesForWeek;
};

// FUNCTION WRITIN HTML FOR day.html PAGE

function generateDayHtml(day, date, step, km, cal, hour) {
  htmlDay.innerHTML = day;
  htmlStep.innerHTML = step;
  htmlKm.innerHTML = km;
  htmlCal.innerHTML = cal;
  htmlHour.innerHTML = hour;
  htmlDate.innerHTML = date;
}

// WITH IF STATMENT WE ARE CHECKING IF WE ARE ON INDEX.HTML PAGE

if (hours) {
  generateIndexHtml();
}
const mondayInfo = generateInfo(monday);
const tuesdayInfo = generateInfo(tuesday);
const wednesdayInfo = generateInfo(wednesday);
const thursdayInfo = generateInfo(thursday);
const fridayInfo = generateInfo(friday);

function generateDay() {
  days.forEach(day =>
    day.addEventListener("click", function(e) {
      days.forEach(element => element.classList.remove("active"));
      day.classList.add("active");
      if (this.id === "mon") {
        generateDayHtml("Monday", "Jun 10, 2019", ...mondayInfo);
      }
      if (this.id === "tue") {
        generateDayHtml("Tuesday", "Jun 11, 2019", ...tuesdayInfo);
      }
      if (this.id === "wed") {
        generateDayHtml("Wednesday", "Jun 12, 2019", ...wednesdayInfo);
      }
      if (this.id === "thu") {
        generateDayHtml("Thursday", "Jun 13, 2019", ...thursdayInfo);
      }
      if (this.id === "fri") {
        generateDayHtml("Friday", "Jun 14, 2019", ...fridayInfo);
      }
    })
  );
}
generateDay();

// const global = this;
// function addActiveClass() {
//   days.forEach(day => {
//     day.onclick = function(e) {
//       e.preventDefault()
//       global.open("http://127.0.0.1:5500/dist/day.html");
//       days.forEach(element => element.classList.remove("active"));
//       day.classList.add("active");
//     };
//   });
// }

// var mon;
// document.addEventListener("DOMContentLoaded", function() {
//   mon = document.querySelector("#monInd");
//   console.log(mon);
//   mon.onclick = function() {
//     days[0].classList.add("active");
//     generateDayHtml("Monday", "Jun 10, 2019", ...mondayInfo);
//   };
// });
// const indexDays = document.querySelectorAll(".jsClickIndex");

// indexDays[0].onclick = function() {
//   document.addEventListener("DOMContentLoaded", function() {
//     days[0].classList.add("active");
//     generateDayHtml("Monday", "Jun 10, 2019", ...mondayInfo);
//   });
// };

// var mon = document.querySelector("[id='monInd']");

// document.addEventListener("DOMContentLoaded", function () {
//   mon.addEventListener("click", function() {
//       days[0].classList.add("active");
//       generateDayHtml("Monday", "Jun 10, 2019", ...mondayInfo);
//     });
// });

// const mondayTimeOut = setTimeout(function() {
//   days[0].classList.add("active");
//   generateDayHtml("Monday", "Jun 11, 2019", ...mondayInfo);
// }, 2000);

// mon.addEventListener("click", function() {
//   days[0].classList.add("active");
//   generateDayHtml("Monday", "Jun 10, 2019", ...mondayInfo);
// });
// const wed = document.querySelector("#wedInd");
// const thu = document.querySelector("#thuInd");
// const fri = document.querySelector("#friInd");
// function generateIndex() {
//   indexDays.forEach(day =>
//     day.addEventListener("click", function() {
//       days.forEach(element => element.classList.remove("active"));

//       if (this.id === "tue") {
//         generateDayHtml("Tuesday", "Jun 11, 2019", ...tuesdayInfo);
//       }
//       if (this.id === "wed") {
//         generateDayHtml("Wednesday", "Jun 12, 2019", ...wednesdayInfo);
//       }
//       if (this.id === "thu") {
//         generateDayHtml("Thursday", "Jun 13, 2019", ...thursdayInfo);
//       }
//       if (this.id === "fri") {
//         generateDayHtml("Friday", "Jun 14, 2019", ...fridayInfo);
//       }
//     })
//   );
// }
