const burger = document.querySelector(".burger");
const menu = document.querySelector(".menu");

burger.addEventListener("click", () => {
  menu.classList.toggle("active");
});

// -----_Geting the data-------

fetch("./data.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((option) => {
      let newOption = document.createElement("option");
      let optionText = document.createTextNode(option.Year);
      newOption.appendChild(optionText);
      newOption.setAttribute("value", option.Year);

      let select = document.querySelector("select");
      select.appendChild(newOption);
    });
  })
  .catch((error) => console.log(error));

const submit = document.getElementById("searchCarbon");

const queryYear = document.getElementById("yearVar")
const yearPPM = document.getElementById("yearPpm")
const ppmCalc = document.getElementById("ppmCalc")

submit.addEventListener("click", () => {
  let select = document.querySelector("select");
  let selectedValue = select.value;
  
  fetch("./data.json")
  .then((response) => response.json())
  .then((data) => {
    let reqYearData = {}
    let currentYearData = data[0]
   data.map((option) => {
        if(option.Year == selectedValue ){
            reqYearData = option
        } 
    })

if (Object.keys(reqYearData).length === 0) {
    queryYear.innerHTML = currentYearData.Year
    yearPPM.innerHTML = currentYearData.Carbon
  } else {
    queryYear.innerHTML = reqYearData.Year
    yearPPM.innerHTML = reqYearData.Carbon
    ppmCalc.innerHTML = (currentYearData.Carbon - reqYearData.Carbon).toFixed(2)
  }

  })
  .catch((error) => console.log(error));

});
