//Initialize variables
var cityList = [];

//Gets storage if it isn't null
var test = JSON.parse(localStorage.getItem("cities"));
if(test != null){
    getStorage();
}

//Search button is pressed
$("#searchBtn").on("click",function(){
    
    //Get text of the textarea
    var city = $("textarea").val();
    //clear text
    $("textarea").val("");

    var url = "http://api.openweathermap.org/data/2.5/weather?q="+city+",us&APPID=d2473db2d15b3f33089244526bb7a7b6";
    
    
    //Only proceed forward if it is a valid city

 

      //Fetch the data from the website
      fetch(url)
        .then(function(response) {
        
        //Only proceed if valid city
        if (response.ok) {
            
            $.ajax({
                url: url,
                method: "GET"
              }).then(function(response) {
                    
                //temp variable
                var tempKelvin = response.main.temp;
                var humidity = response.main.humidity;
                var wind = 2.23694*(response.wind.speed);
                var icon = response.weather[0].icon;
                var lon = response.coord.lon;
                var lat = response.coord.lat;  
        

                //Convert kelvings to celsius, then finally fahrenheit
                var tempCelsius = tempKelvin - 273;
                var tempFahrenheit = (tempCelsius * (9/5)) + 32;
                
                //Display values
                $("#tempLabel").text(Math.round(tempFahrenheit)+"°F");
                $("#humidLabel").text(humidity+"%");
                $("#windLabel").text(Math.round(wind)+"MPH");
                $("#iconLabel").attr("src","http://openweathermap.org/img/wn/"+icon+".png");
                
                //Time for second URL
                var secondUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude={part}&appid=d2473db2d15b3f33089244526bb7a7b6";
                
               
                
                //Only proceed if valid city
                
                    $.ajax({
                        url: secondUrl,
                        method: "GET"
                      }).then(function(data) {
                            
                        //temp variable

                        var uvi = data.current.uvi;
                        $("#uvLabel").text(uvi);
                
                  });
                
               
        
              });


                //Capitalize 
                city = city.toUpperCase();

                //Display to html
                $("#cityLabel").text(city);

                //Append to list
                $("#city").append(city+ "<br>");
                cityList.push(city);
  
                //store
                localStorage.setItem("cities", JSON.stringify(cityList));

        } else{

            alert("Not a valid city");
            return;
        }
        });



});

//Get stored Cities
function getStorage(){


    var test = JSON.parse(localStorage.getItem("cities"));

    

    for(var i =0; i<test.length; i++){

        $("#city").append(test[i]+ "<br>");
        cityList.push(test[i]);
    }
    
}

//Clear city history
    $("#clear").on("click",function(){

        localStorage.clear();
        location.reload();
    });


