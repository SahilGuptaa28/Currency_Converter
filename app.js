// const BASE_URL = "https://api.frankfurter.app/latest?amount=1&from=USD&to=JPY";
const dropdowns = document.querySelectorAll(" .dropdown select");
const btn = document.querySelector(".btn")
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const msg = document.querySelector(".msg")

for(let select of dropdowns){
    for(let currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = true;
        }
         if(select.name === "to" && currCode === "INR"){
            newOption.selected = true;
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}

const updateFlag = (element)=>{
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
 let img = element.parentElement.querySelector("img");
 img.src = newSrc;
}

btn.addEventListener("click", async (evt)=>{
      evt.preventDefault();
      let amount = document.querySelector(".amount input")
      let amtVal = amount.value;
      if(amtVal === "" || amtVal <1){
        amtVal = 1;
        amount.value = "1";
      }
    const URL = `https://api.frankfurter.app/latest?amount=${amtVal}&from=${fromCurrency.value}&to=${toCurrency.value}`;
    try{
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.rates[toCurrency.value]
    msg.innerText = `${amtVal} ${fromCurrency.value} = ${rate} ${toCurrency.value} `
    }catch(err){
        console.log("Currency Converter is not working for this pair of Country");
        alert("This API does not support this pair of Country,The project is Working Fine Issue is in the API \n please Try again with another pair of Country");
    }
})
