//import Config from "config"

let houseElectricity = {refridgerator:"refridgerator suggestion\n", microwave:"microwave suggestion\n", oven:"oven suggestion\n", dishwasher:"dishwasher suggestion\n", water_heater:"water heater suggestion\n", air_conditioner:"air conditioner suggestion\n", heater:"heater suggestion\n", lights:"lights suggestion\n"};
let suggestions;

let map;

//Function to initialze map
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: {lat: 34.683, lng: -82.837},
        zoom: 14,
    });
}

const carbonList = [];

//var mykey ="Bearer " + Config.config.MY_KEY;
let total_electricity_value = 0.00000000000000000000000001;

const btn = document.querySelector('#btn');
        btn.addEventListener('click', (event) => {
            suggestions = '<div style=\" background-color:#cdcfc4\"><div style=\"font-weight:bold;\">Suggestions</div>';
            let checkboxes = document.querySelectorAll('input[name="electricity"]:checked');
            checkboxes.forEach((checkbox) => {
                total_electricity_value += parseFloat(checkbox.value);
                suggestions += '<div>'
                suggestions += houseElectricity[checkbox.id];
                suggestions += '</div>'
                
                let carbonElem = {emitter:checkbox.id, amount:checkbox.value};

                carbonList.push(carbonElem);
            });
            suggestions += '</div>'
            console.log(total_electricity_value);

            // POST request using fetch()

fetch("https://github.com/JalenMcC/CarbonPawPrint/mapData.json")

fetch("https://www.carboninterface.com/api/v1/estimates", {
     
    // Adding method type
    method: "POST",
     
    // Adding body or contents to send
    body: JSON.stringify({
        type: "electricity",
        electricity_unit: "mwh",
        electricity_value: total_electricity_value,
        country: "us"
    }),
     
    // Adding headers to the request
    headers: {
        "Authorization": "Bearer vcf8KGKQcvicbMTgMmAsA",
        "Content-Type": "application/json"
    }
})
 
// Converting to JSON
.then(response => response.json())
 
// Displaying results to console
.then(json => {
    //log json file
    console.log(json)
    // Create a variable to store HTML
    let li = `<div><div style=\"font-weight:bold;\">Carbon Footprint</div>`;
    li += `<div>${json.data.attributes.carbon_g} g </div></div>`;
    li += suggestions
       
    
    

// Display result
document.getElementById("estimates").innerHTML = li;
});
total_electricity_value = 0.00000000000000000000000001;

}); 

document.getElementById("estimates").innerHTML = '<div><div style=\"font-weight:bold;\">Carbon Footprint</div><div>0 g</div></div>';

