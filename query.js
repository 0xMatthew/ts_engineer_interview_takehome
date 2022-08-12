//url variables
let base_url = 'https://arcgis.metc.state.mn.us/server/rest/services/GISLibrary/VWParcelsPoints/FeatureServer/0/query?where=';
let full_url;
//let temp_url = 'https://arcgis.metc.state.mn.us/server/rest/services/GISLibrary/VWParcelsPoints/FeatureServer/0/query?where=COUNTY_PIN%3D%271202924330056%27&outFields=*&f=pjson';

//variables to hold input from HTML forms
let county_pin;
let street_nbr;
let street_name;

//variables to hold extracted json data
let owner;
let full_address;
let county_name;
let est_prop_val;

function get_query_result(which_btn) {
    county_pin = document.getElementById("county_pin_input").value; //primary search criterion
    street_nbr = document.getElementById("street_nbr_input").value; //optional search criterion
    street_name = document.getElementById("street_name_input").value; //optional search criterion

    if (which_btn === 0)
        full_url = base_url + "COUNTY_PIN%3D%27" + county_pin + '%27&outFields=*&f=pjson';
    else if (which_btn === 1)
        full_url = base_url + "ANUMBER%3D%27" + street_nbr + '%27&outFields=*&f=pjson';
    else if (which_btn === 2)
        full_url = base_url + "ST_NAME%3D%27" + street_name + '%27&outFields=*&f=pjson';

    console.log("The full URL: " + full_url);

    //JQUERY to extract JSON data
    $.getJSON(full_url, function (data) {
        let i = 0;

        //logging all owners that satisfied query
        while (i < data.features.length) {
            console.log(owner = data.features[i].attributes.OWNER_NAME);
            i++;
        }
        i = 0;

        //assigning variables to the value of their respective JSON property value
        owner = data.features[i].attributes.OWNER_NAME;
        full_address = data.features[i].attributes.ANUMBER + " " + data.features[i].attributes.ST_NAME + " " + data.features[i].attributes.ST_POS_TYP + " " + data.features[i].attributes.ST_POS_DIR + " " + data.features[i].attributes.CTU_NAME + ', ' + data.features[i].attributes.STATE_CODE + " " + data.features[i].attributes.ZIP;
        county_name = data.features[i].attributes.CO_NAME;
        prop_val = data.features[i].attributes.SALE_VALUE;

        //displaying values in using HTML (first query match)
        document.getElementById("owner_query").innerHTML = owner;
        document.getElementById("full_address_query").innerHTML = full_address;
        document.getElementById("county_name_query").innerHTML = county_name;
        document.getElementById("property_value_query").innerHTML = prop_val;
    });
}