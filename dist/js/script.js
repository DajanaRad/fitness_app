const days = document.querySelectorAll(".day");
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

// NAVIGATION ACTIVE STYLE

days.forEach(day =>
  day.addEventListener("click", () => {
    days.forEach(element => element.classList.remove("active"));
    day.classList.add("active");
  })
);

//EXTRAXTION OF STEPS FOR EVERY DAY

const stepsForDay = (products, day) =>
  products.reduce((array, product) => {
    var date = new Date(product.timestamp * 1000);
    console.log(date);
    if (date.getDay() === day) {
      array.push(product.steps);
    }
    return array;
  }, []);

// SUM OF ALL STEPS

const stepsForWeek = products => {
  return products.reduce((acumulator, product) => {
    acumulator.push(product.steps);
    return acumulator;
  }, []);
};

// SUM OF ALL STEPS

const sum = days =>
  days.reduce((acuml, day) => {
    acuml += day;
    return acuml;
  });

// KM, CALORIES AND TIME

const calculateKM = steps => ((steps * 0.762) / 1000).toFixed(2) + "KM";

const calculateCalories = steps => Math.round(steps * 0.05);

const calculateTime = steps => {
  let totalSeconds = steps * 0.5;
  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  const time = `${hours ? hours + "h" + minutes + "m" : minutes + "m"}`;
  return time;
};

const friday = sum(stepsForDay(dateSteps, 5));
const thuesday = sum(stepsForDay(dateSteps, 4));
const wednesday = sum(stepsForDay(dateSteps, 3));
const tuesday = sum(stepsForDay(dateSteps, 2));
const monday = sum(stepsForDay(dateSteps, 1));
const week = sum(stepsForWeek(dateSteps));

console.log(calculateKM(friday));
console.log(calculateCalories(friday));
console.log(calculateTime(friday));
console.log(calculateTime(12591));
