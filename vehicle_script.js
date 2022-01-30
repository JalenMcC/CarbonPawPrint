// NEEDS API KEYS
var make_list = document.getElementById("makes")
var model_list = document.getElementById("models")
var model_year = document.getElementById("years")
var output = document.getElementById('output');

// Calculates the overall carbon footprint due to the user's vehicle
function calc_estimate(id, miles) { 
    // POST method that calculates the estimation by collecting a vehicle id and miles driven
    fetch("https://www.carboninterface.com/api/v1/estimates", {
        method: "POST",
        body: JSON.stringify(
            {type: "vehicle", distance_unit: "mi", distance_value: parseInt(miles), vehicle_model_id: id}
        ),
        headers: {
            "Authorization": "Bearer ADD API KEY",
            "Content-Type": "application/json"
        }
    }).then(response => response.json())
    // Displays the carbon footprint to the webpage
    .then(json => {
        let out = `<div><div style=\"font-weight:bold;\">Carbon Footprint</div>`;
        out += `<div>${
            json.data.attributes.carbon_g
        } g </div></div>`;
        document.getElementById("output").innerHTML = out;
    });
}

// Function to collect the years the model of the users' vehicle was made
function print_years(model_years) { 
    // Prevents incorrect years to show up in the dropbox
    document.getElementById("years").innerHTML = "";

    var years_array = JSON.parse(model_years)
    for (var i = 0; i < years_array.length; ++ i) {
        model_year[model_year.length] = new Option(years_array[i][0], years_array[i][1]);
    }
}

// Gets all the models from the specifed make
function print_models(make_id) { 
    // map that will hold the overall string that is returned back to the html
    const mapped_years = new Map()
    // map that will be used to prevent years of the same model being duplicated
    const track_years = new Map()

    document.getElementById("models").innerHTML = "";
    // GET request that gets the models of the specified make, using the make_id that was passed in
    fetch(`https://www.carboninterface.com/api/v1/vehicle_makes/${make_id}/vehicle_models`, {
        method: "GET",
        headers: {
            "Authorization": "Bearer ADD API KEY",
            "Content-Type": "application/json"
        }
    }).then(response => response.json()).then(json => {
        for (var i = 0; i < json.length; i++) { 
            // Makes sure json is valid
            if (json[i]) { 
                // Checks if a specific model has already been entered into the map
                if (mapped_years.has(json[i].data.attributes.name)) {
                    var temp = mapped_years.get(json[i].data.attributes.name)
                    var temp_tracker = track_years.get(json[i].data.attributes.name)
                    // Will skip if the year has already been entered
                    if (! temp_tracker.includes(json[i].data.attributes.year)) {
                        temp_tracker.push(json[i].data.attributes.year)
                        temp += `,["${
                            json[i].data.attributes.year
                        }","${
                            json[i].data.id
                        }"]`
                        track_years.set(json[i].data.attributes.name, temp_tracker)
                        mapped_years.set(json[i].data.attributes.name, temp)
                    }
                }
                // First case of model being entered into the map 
                else{
                    track_years.set(json[i].data.attributes.name, [json[i].data.attributes.year])
                    mapped_years.set(json[i].data.attributes.name, `["${
                        json[i].data.attributes.year
                    }","${
                        json[i].data.id
                    }"]`)
                }
            }
        }
        // Adds all models of the specified make to the models doc
        for (const [key, value] of mapped_years.entries()) {
            model_list[model_list.length] = new Option(key, value);
        }
    });
}

// GET request, this gets the list of makes for the user
fetch("https://www.carboninterface.com/api/v1/vehicle_makes", {
    method: "GET",
    headers: {
        "Authorization": "Bearer ADD API KEY",
        "Content-Type": "application/json"
    }
}).then(response => response.json()).then(json => {
    for (var i = 0; i < json.length; i++) {
        if (json[i]) {
            make_list[make_list.length] = new Option(json[i].data.attributes.name, json[i].data.id);
        }
    }
});
