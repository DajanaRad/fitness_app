//VARIBLE FOR CLICK EVENT

const days = document.querySelectorAll(".day");

//VARIABLES IN WHICH ARE GENERATED HTML ON index.html PAGE

const hours = document.querySelector("#hours");
const steps = document.querySelector("#step");
const calories = document.querySelector("#calorie");
const distance = document.querySelector("#distance");

//VARIABLE IN WHICH ARE GENERATE HTML ON day.html PAGE

const htmlDay = document.querySelector("#day");
const htmlDate = document.querySelector("#date");
const htmlStep = document.querySelector("#day_steps");
const htmlKm = document.querySelector("#day_km");
const htmlCal = document.querySelector("#day_cal");
const htmlHour = document.querySelector("#day_hours");

var xhttp = new XMLHttpRequest();
xhttp.open("GET", "https://api.myjson.com/bins/1gwnal", true);

xhttp.onload = () => {
  if (xhttp.status === 200 && xhttp.readyState === 4) {
    const dateSteps = JSON.parse(xhttp.responseText);

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

    const stepsForWeek = products =>
      products.reduce((acumulator, product) => {
        acumulator.push(product.steps);
        return acumulator;
      }, []);

    // SUM OF STEPS

    const sum = days =>
      days.reduce((acuml, day) => {
        acuml += day;
        return acuml;
      });

    // CALCULATION OF KM, CALORIES AND TIME

    const calculateKM = steps => {
      var distance = ((steps * 0.762) / 1000).toFixed(1);
      init === "index" ? (distance += "km") : "";
      return distance;
    };

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

      const time = init === "index" ? `${hours}h ${minutes}min` : minutes;
      return time;
    };

    // VARIABLES OF HOW MUCH STEPS IS WALKED FOR EACH DAY

    const friday = sum(stepsForDay(dateSteps, 5));
    const thursday = sum(stepsForDay(dateSteps, 4));
    const wednesday = sum(stepsForDay(dateSteps, 3));
    const tuesday = sum(stepsForDay(dateSteps, 2));
    const monday = sum(stepsForDay(dateSteps, 1));
    const week = sum(stepsForWeek(dateSteps));

    //INFORMAATIONS FOR WEEK STEPS, CALORIES, TIME AND DISTANCE

    const stepForWeek = numberWithCommas(week);
    const caloriesForWeek = calculateCalories(week);
    const timeForWeek = calculateTime(week);
    const distanceForWeek = calculateKM(week);

    //ADDING COMMA TO STEPS

    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // FUNCTION WRITING GENERATED HTML FOR index.html PAGE

    const generateIndexHtml = () => {
      //IF WE ARE ON index.html PAGE THEN GENERATE TEXT IN index.html
      if (init === "index") {
        hours.innerHTML = timeForWeek;
        steps.innerHTML = stepForWeek;
        calories.innerHTML = caloriesForWeek;
        distance.innerHTML = distanceForWeek;
      }
    };

    // FUNCTION WRITING GENERATED HTML FOR day.html PAGE

    function generateDayHtml(day, date, step, km, cal, hour) {
      //IF WE ARE ON days.html PAGE THEN GENERATE TEXT IN days.html
      if (init === "days") {
        htmlDay.innerHTML = day;
        htmlStep.innerHTML = step;
        htmlKm.innerHTML = km;
        htmlCal.innerHTML = cal;
        htmlHour.innerHTML = hour;
        htmlDate.innerHTML = date;
      }
    }

    //FUNCTION WHICH GENERATE ARGUMENTS FOR ONE DAY. THOSE ARGUMENTS WILL BE USED IN generateDay FUNCTION

    function generateInfo(day) {
      var arg = [];
      arg.push(numberWithCommas(day)); //steps
      arg.push(calculateKM(day)); //km
      arg.push(calculateCalories(day)); //cal
      arg.push(calculateTime(day)); //time
      return arg;
    }

    // GENERATE ARGUMENTS FOR EACH DAY AND SAVING IT IN VARIABLES

    const mondayInfo = generateInfo(monday);
    const tuesdayInfo = generateInfo(tuesday);
    const wednesdayInfo = generateInfo(wednesday);
    const thursdayInfo = generateInfo(thursday);
    const fridayInfo = generateInfo(friday);

    /*
    FUNCTION FOR ADDING active CLASS ON day IF CLICKED AND GENERATE HTML ON day.html PAGE
    DEPENDING ON THE CLICK. CLICK COULD EATHER HAPPEND ON day WHICH IS ON index.html or day.html PAGE 
    */

    function generateDay(idOfDay, dayOfWeek, date, argumentsForDay) {
      days.forEach(day =>
        day.addEventListener("click", function() {
          days.forEach(element => element.classList.remove("active"));
          day.classList.add("active");

          //ADDING VALUE this.id IN LOCAL STORAGE SO VALUE IS SAVED WHEN PAGE IS REDIRECTED TO day.html

          localStorage.setItem("day", this.id);
          if (this.id === idOfDay) {
            generateDayHtml(dayOfWeek, date, ...argumentsForDay);
          }
        })
      );
    }

    //EXECUTION OF FUNCTIONS FOR WRITING GENERATED HTML BY JS ON index.html AND day.html PAGES

    generateIndexHtml();
    generateDay("mon", "Monday", "June 10, 2019.", mondayInfo);
    generateDay("tue", "Tuesday", "June 11, 2019.", tuesdayInfo);
    generateDay("wed", "Wednesday", "June 12, 2019.", wednesdayInfo);
    generateDay("thu", "Thursday", "June 13, 2019.", thursdayInfo);
    generateDay("fri", "Friday", "June 14, 2019.", fridayInfo);

    /*
    CHECKING IF VALUE OF day IS IN LOCAL STORAGE AND CHECKING IF init === day 
    WHICH MEANS THET WE ARE ON day.html PAGE AND IF THAT IS TRUE WE ARE ACTIVATING CLICK
    WHEN WE GO BACK TO index.html IF WE ARE NOT CHECKING ON WHICH PAGE WE ARE
    LOCAL STORAGE HAVE PREVIOUS DAY AND CLICK WILL BE EXECUTED AND REDIRECTED US TO day.html
    */

    if (localStorage.getItem("day") && init === "days") {
      // AFTER ADDING LOCAL STORAGE CLICK EVENT WE ARE ACTIVATING
      document.getElementById(localStorage.getItem("day")).click();
    }
  } else {
    console.log("error");
  }
};

xhttp.send();
