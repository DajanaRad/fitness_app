const days = document.querySelectorAll(".day");
const mon = document.querySelector("#mon");
const tue = document.querySelector("#tue");
const wed = document.querySelector("#wed");
const thu = document.querySelector("#thu");
const fri = document.querySelector("#fri");

const hours = document.querySelector("#hours");
const steps = document.querySelector("#step");
const calories = document.querySelector("#calorie");

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

// DAYS ACTIVE STYLE

// function addActiveClass() {
//   days.forEach(day =>
//     day.addEventListener("click", () => {
//       days.forEach(element => element.classList.remove("active"));
//       console.log(this);
//       day.classList.add("active");
//     })
//   );
// }

// addActiveClass();

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

const calculateKM = steps => ((steps * 0.762) / 1000).toFixed(1) + "km";

const calculateCalories = steps => Math.round(steps * 0.05);

const calculateTime = steps => {
  let totalSeconds = steps * 0.5;
  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  const time = `${hours ? hours + "h " + minutes + "m" : minutes + "m"}`;
  return time;
};

const friday = sum(stepsForDay(dateSteps, 5));
const thursday = sum(stepsForDay(dateSteps, 4));
const wednesday = sum(stepsForDay(dateSteps, 3));
const tuesday = sum(stepsForDay(dateSteps, 2));
const monday = sum(stepsForDay(dateSteps, 1));
const week = sum(stepsForWeek(dateSteps));

//INFORMAATIONS FOR FRIDAY

const kmForFriday = calculateKM(friday);
const caloriesForFriday = calculateCalories(friday);
const timeForFriday = calculateTime(friday);

//INFORMAATIONS FOR THUESDAY

const kmForThursday = calculateKM(thursday);
const caloriesForThursday = calculateCalories(thursday);
const timeForThursday = calculateTime(thursday);

//INFORMAATIONS FOR WEDNESDAY

const kmForWednesday = calculateKM(wednesday);
const caloriesForWednesday = calculateCalories(wednesday);
const timeForWednesday = calculateTime(wednesday);

//INFORMAATIONS FOR TUESDAY

const kmForTuesday = calculateKM(tuesday);
const caloriesForTuesday = calculateCalories(tuesday);
const timeForTuesday = calculateTime(tuesday);

//INFORMAATIONS FOR MONDAY

const kmForMonday = calculateKM(monday);
const caloriesForMonday = calculateCalories(monday);
const timeForMonday = calculateTime(monday);

//INFORMAATIONS FOR WEEK

const kmForWeek = calculateKM(week);
const caloriesForWeek = calculateCalories(week);
const timeForWeek = calculateTime(week);

const generateIndexHtml = () => {
  hours.innerHTML = timeForWeek;
  steps.innerHTML = kmForWeek;
  calories.innerHTML = caloriesForWeek;
};

function generateDayHtml(day, date, step, km, cal, hour) {
  htmlDay.innerHTML = day;
  htmlStep.innerHTML = step;
  htmlKm.innerHTML = km;
  htmlCal.innerHTML = cal;
  htmlHour.innerHTML = hour;
  htmlDate.innerHTML = date;
}

function addActiveClass() {
  days.forEach(day =>
    day.addEventListener("click", function() {
      days.forEach(element => element.classList.remove("active"));
      day.classList.add("active");
      if (this.id === "mon") {
        generateDayHtml(
          "Monday",
          "Jun 10, 2019",
          monday,
          kmForMonday,
          caloriesForMonday,
          timeForMonday
        );
      }
      if (this.id === "tue") {
        generateDayHtml(
          "Tuesday",
          "Jun 11, 2019",
          tuesday,
          kmForTuesday,
          caloriesForTuesday,
          timeForTuesday
        );
      }
      if (this.id === "wed") {
        generateDayHtml(
          "Wednesday",
          "Jun 12, 2019",
          wednesday,
          kmForWednesday,
          caloriesForWednesday,
          timeForWednesday
        );
      }
      if (this.id === "thu") {
        generateDayHtml(
          "Thursday",
          "Jun 13, 2019",
          thursday,
          kmForThursday,
          caloriesForThursday,
          timeForThursday
        );
      }
      if (this.id === "fri") {
        generateDayHtml(
          "Friday",
          "Jun 14, 2019",
          friday,
          kmForFriday,
          caloriesForFriday,
          timeForFriday
        );
      }
    })
  );
}
addActiveClass();
// WITH IF STATMENT WE ARE CHECKING IF WE ARE ON INDEX.HTML PAGE

if (hours) {
  generateIndexHtml();
}

// WITH IF STATMENT WE ARE CHECKING IF WE ARE ON DAY.HTML PAGE

// if (htmlDay) {
//   mon.addEventListener(
//     "click",

//     generateDayHtml(
//       "Monday",
//       "Jun 10, 2019",
//       monday,
//       kmForMonday,
//       caloriesForMonday,
//       timeForMonday
//     )
//   );
// }
