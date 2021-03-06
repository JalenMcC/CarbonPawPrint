//import Config from "config"

//Map data represents points of interest --format: name:string,lat:double,long:double
const mapData = [{"name":"Clemson Area Food Exchange - Provides high quality local foods right to your doorstep","lat":34.695182108663616,"long":-82.7747172926098},{"name":"Lowe's - Buying LEDs over incandescent lightbulbs can greatly reduce energy consumption","lat":34.69069780170335, "long":-82.78731025089711},{"name":"Bike Rental Station - Renting or using a bike can greatly decrease emissions from gas powered vehicles.","lat":34.67916480973539,"long":-82.8348125604455},{"name":"Electric Car Charging Station - Electric cars can greatly reduce carbon emissions as they do not run on gas fuel","lat":34.67545955730243,"long":-82.83127030379879},{"name":"Salvation Army Store - Buying recycled clothes and goods can also reduce your overall carbon emissions!","lat":34.688745154014164,"long":-82.81035663618745},{"name":"Clemson's Department of Enviromental Sciences - Clemson provides research and many other opportunities to make a difference in the community","lat":34.673891924982854,"long":-82.83503936171581}];
let houseElectricity = {refrigerator:"By cleaning out food from your fridge that you don't eat, you can reduce the amount of energy your fridge uses to keep that food cold.\n", microwave:"Reduce your microwave electricity consumption by decreasing food cooking times.\n", oven:"Use glass or ceramic dishes in the oven which retain heat better than metal dishes and therefore are more efficient.\n", dishwasher:"Deselect heated dry settings for your dishwasher to reduce the amount of energy used to dry your dishes.\n", water_heater:"Reducing the maximum temperature for your water heater is an easy way to reduce the amount of energy used to heat that water.\n", air_conditioner:"Replace your air filters regularly so that your air conditioner can be more efficient in cooling down your house.\n", heater:"Improving the insulation in your house can help make your heater more effective.\n", lights:"Always make sure to turn off ligths when you are not using them and take advantage of natural sunlight. ??????\n"};
let suggestions;

const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let labelIndex = 0;
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

for (let i = 0; i < mapData.length; ++i) {
    new google.maps.Marker({
        position: {lat: mapData[i].lat, lng:mapData[i].long},
        map,
        label: labels[labelIndex++ % labels.length],
        title: mapData[i].name,
    });
}

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

