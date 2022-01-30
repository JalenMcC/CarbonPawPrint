//import Config from "config"

let map;

//Function to initialze map
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: {lat: 34.683, lng: -82.837},
        zoom: 14,
    });
}

const carbonList = [];

//Function to mark up map
/*function markMap() {
    carbonList.sort(function(a,b){return(b.amount-a.amount)});

    for (let i = 0; i < carbonList.length; ++i) {
        console.log(carbonList[i].emitter + carbonList[i].amount);
    }

    var markerData = JSON.parse(mapData);
} */

//var mykey ="Bearer " + Config.config.MY_KEY;
let total_electricity_value = 0.00000000000000000000000001;

const btn = document.querySelector('#btn');
        btn.addEventListener('click', (event) => {
            let checkboxes = document.querySelectorAll('input[name="electricity"]:checked');
            checkboxes.forEach((checkbox) => {
                total_electricity_value += parseFloat(checkbox.value);
                console.log(checkbox.value);

                //Store each carbon type and amount into array
                const carbonType = {emitter:checkbox.id, amount:checkbox.value};
                carbonList.push(carbonType);
            });
            console.log("Total:" + total_electricity_value);
            
            carbonList.sort(function(a,b){return(b.amount-a.amount)});

            for (let i = 0; i < carbonList.length; ++i) {
                console.log(carbonList[i].emitter + carbonList[i].amount);
            }

            fetch("CarbonPawPrint/mapData.json")
            .then (mapData => mapData.json())
            

            // POST request using fetch()
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
        "Authorization": "Bearer w1HQe0eFj5V3cRgMhGELQ",
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
       
    
    

// Display result
document.getElementById("estimates").innerHTML = li;
});
total_electricity_value = 0.00000000000000000000000001;
}); 

document.getElementById("estimates").innerHTML = '<div><div style=\"font-weight:bold;\">Carbon Footprint</div><div>0 g</div></div>';

