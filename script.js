//  main.js
  
// POST request using fetch()
fetch("https://www.carboninterface.com/api/v1/estimates", {
     
    // Adding method type
    method: "POST",
     
    // Adding body or contents to send
    body: JSON.stringify({
        type: "electricity",
        electricity_unit: "mwh",
        electricity_value: 0.000225,
        country: "us"
    }),
     
    // Adding headers to the request
    headers: {
        "Content-Type": "application/json"
    }
})
 
// Converting to JSON
.then(response => response.json())
 
// Displaying results to console
.then(json => console.log(json));