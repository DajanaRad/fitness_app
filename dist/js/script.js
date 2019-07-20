//VARIBLES FOR CLICK EVENT

const days = document.querySelectorAll(".day");

//VARIABLES IN WHICH ARE GENERATED HTML ON index.html PAGE

const hours = document.querySelector("#hours");
const steps = document.querySelector("#step");
const calories = document.querySelector("#calorie");

//VARIABLE IN WHICH ARE GENERATE HTML ON day.html PAGE

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

  /* IF WE ARE ON PAGE index.html THEN ADD HOURS AND MINUTES WITH h and m 
  BUT IF WE ARE ON PAGE day.html ONLY ADD NUMBER OF MINUTES WITHOUT m
  BECAUSE IN DAY PAGE EVERY VALUE OF TIME IS NOT HIGHER THEN 60MIN
  */
  const time = `${
    init == "index" ? (hours ? hours + "h " + minutes + "min" : "") : minutes
  }`;
  return time;
};

// VARIABLES OF HOW MUCH STEPS IS WALKED FOR EACH DAY

const friday = sum(stepsForDay(dateSteps, 5));
const thursday = sum(stepsForDay(dateSteps, 4));
const wednesday = sum(stepsForDay(dateSteps, 3));
const tuesday = sum(stepsForDay(dateSteps, 2));
const monday = sum(stepsForDay(dateSteps, 1));
const week = sum(stepsForWeek(dateSteps));

//INFORMAATIONS FOR WEEK STEPS, CALORIES AND TIME

const stepForWeek = numberWithCommas(week);
const caloriesForWeek = calculateCalories(week);
const timeForWeek = calculateTime(week);

//ADDING COMMA TO STEPS

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// FUNCTION WRITING GENERATED HTML FOR index.html PAGE

const generateIndexHtml = () => {
  // WITH IF STATMENT IF WE ARE ON index.html PAGE THEN GENERATE TEXT IN index.html
  if (init === "index") {
    hours.innerHTML = timeForWeek;
    steps.innerHTML = stepForWeek;
    calories.innerHTML = caloriesForWeek;
  }
};

// FUNCTION WRITING GENERATED HTML FOR day.html PAGE

function generateDayHtml(day, date, step, km, cal, hour) {
  // WITH IF STATMENT IF WE ARE ON days.html PAGE THEN GENERATE TEXT IN days.html
  if (init === "days") {
    htmlDay.innerHTML = day;
    htmlStep.innerHTML = step;
    htmlKm.innerHTML = km;
    htmlCal.innerHTML = cal;
    htmlHour.innerHTML = hour;
    htmlDate.innerHTML = date;
  }
}

//FUNCTION WHICH GENERATE ARGUMENTS FOR ONE DAY. THISE ARGUMENT WILL BE USED IN GENERATE DAY FUNCTION

function generateInfo(day) {
  var arg = [];
  arg.push(numberWithCommas(day)); //steps
  arg.push(calculateKM(day)); //km
  arg.push(calculateCalories(day)); //cal
  arg.push(calculateTime(day)); //time
  return arg;
}

// GENERATE ARGUMENTS FOR EACH DAY

const mondayInfo = generateInfo(monday);
const tuesdayInfo = generateInfo(tuesday);
const wednesdayInfo = generateInfo(wednesday);
const thursdayInfo = generateInfo(thursday);
const fridayInfo = generateInfo(friday);

//FUNCTION FOR ADDING active CLASS ON day IF CLICKED AND GENERATE HTML ON day.html PAGE DEPENDING ON THE CLICK. CLICK COULD EATHER HAPPEND ON day WHICH IS ON index.html or day.html PAGE

function generateDay() {
  days.forEach(day =>
    day.addEventListener("click", function() {
      days.forEach(element => element.classList.remove("active"));
      day.classList.add("active");

      //ADDING VALUE this.id IN LOCAL STORAGE. AND THEN THAT VALUE IS SAVED WHEN PAGE IS REDIRECTED TO day.html

      localStorage.setItem("day", this.id);
      if (this.id === "mon") {
        generateDayHtml("Monday", "June 10, 2019.", ...mondayInfo);
      }
      if (this.id === "tue") {
        generateDayHtml("Tuesday", "June 11, 2019.", ...tuesdayInfo);
      }
      if (this.id === "wed") {
        generateDayHtml("Wednesday", "June 12, 2019.", ...wednesdayInfo);
      }
      if (this.id === "thu") {
        generateDayHtml("Thursday", "June 13, 2019.", ...thursdayInfo);
      }
      if (this.id === "fri") {
        generateDayHtml("Friday", "June 14, 2019.", ...fridayInfo);
      }
    })
  );
}

generateDay();
/*
 CHECKING IF VALUE OF day IS IN LOCAL STORAGE AND CHECKING IF init == day WHICH MEANS THET WE ARE ON day.html PAGE AND IF THAT IS TRUE WE ARE ACTIVATING CLICK
 WHEN WE GO BACK TO index.html IF WE ARE NOT CHECKING ON WHICH PAGE WE ARE LOCAL STORAGE HAVE PREVIOUS DAY AND CLICK WILL BE EXECUTED AND REDIRECTED US TO day.html
*/

if (localStorage.getItem("day") && init === "days") {
  // AFTER ADDING LOCAL STORAGE CLICK EVENT WE ARE ACTIVATING
  document.getElementById(localStorage.getItem("day")).click();
}
