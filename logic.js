//Initialize variables
var cityList = [];

//Call all necesarry functions
getStorage();


//Search button is pressed
$("#searchBtn").on("click",function(){
    
    //Get text of the textarea
    var city = $("textarea").val();

    //Append to list
    $("#city").append(city+ "<br>");
    cityList.push(city);
  
    //store
    localStorage.setItem("cities", JSON.stringify(cityList));

});

//Get stored Cities
function getStorage(){


    var test = JSON.parse(localStorage.getItem("cities"));

    

    for(var i =0; i<test.length; i++){

        $("#city").append(test[i]+ "<br>");
        cityList.push(test[i]);
    }
    
}

