// Include the axios package for performing HTTP requests (promise based alternative to request)
import axios from "axios";

// Geocoder and Google PLaces APIs
const geocodeAPI = "35e5548c618555b1a43eb4759d26b260";
const googlePlacesAPI = "AIzaSyCYeih3P-UfimZCY3kIBSFwKugLXM-5VbY";

// Helper Functions
const helpers = {
	getLongAndLat: (zipCode) => {
		console.log(zipCode);

		// Figure out the geolocation
	    const queryURL = "http://api.opencagedata.com/geocode/v1/json?query=" + zipCode + "&pretty=1&key=" + geocodeAPI;

	    return axios.get(queryURL).then((response) => {
	    	console.log("Axios response" , response.data.results);
	    	return response.data.results[0].geometry;

	    });
	},

	findVenues: (keyword, lat, lng, radius) => {
		console.log(keyword, lat, lng, radius);
		const searchTerms = {keyword: keyword,lat: lat,lng: lng, radius}

		return axios.post("/api/places", searchTerms)
	      .then(function(results) {
	        console.log("axios results in findVenues", results.data.results);
	        if (!results.data.results[0]) {
	        	return "Sorry no matches found, please try a different keyword or radius."
	        } else {
	        	return results.data.results;
	        }
	      });

	}
};

// Export the helpers function
export default helpers;