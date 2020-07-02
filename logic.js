//Initialize variables
var cityList = [];


//Gets storage if it isn't null

if(typeof(localStorage) != "undefined" && localStorage != null && localStorage.length != 0){
    getStorage();
}

//if enter key is pressed
$('textarea').keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
        
        $("#searchBtn").click();
    }
});


//Search button is pressed
$("#searchBtn").on("click",function(){
    

    //Get text of the textarea
    city = $("textarea").val();
    

    //clear text
    $("textarea").val("");

    //Capitalize 
    city = city.toUpperCase();

    //If repeat city, alert that already been chosen
    if(localStorage != "undefined " && localStorage != null && localStorage.length != 0){

        var check = JSON.parse(localStorage.getItem("cities"));
        var n = check.includes(city);
      
        if(n != false){

            var n = "";
            alert("Repeated City");
            return;
        }


    }

 

    var url = "https://api.openweathermap.org/data/2.5/weather?q="+city+",us&APPID=d2473db2d15b3f33089244526bb7a7b6";
    
    
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
                $("#tempLabel").text(" "+Math.round(tempFahrenheit)+"°F");
                $("#humidLabel").text(" "+humidity+"%");
                $("#windLabel").text(" "+Math.round(wind)+"MPH");
                $("#iconLabel").attr("src","http://openweathermap.org/img/wn/"+icon+".png");
                
                //Time for second URL
                var secondUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=minutely&appid=d2473db2d15b3f33089244526bb7a7b6";
                
               
                
                //Second API for 5day Forecast
                
                    $.ajax({
                        url: secondUrl,
                        method: "GET"
                      }).then(function(data) {
                            
                        //UVI variable
                        var uvi = data.current.uvi;

                        if(uvi <=3){
                            $("#uvLabel").css("background-color","green");
                        }
                        if(uvi >3 && uvi <6){
                            $("#uvLabel").css("background-color","yellow");
                        }
                        if(uvi >= 6 && uvi <9){
                            $("#uvLabel").css("background-color","red");
                        }
                        if(uvi >=9){
                            $("#uvLabel").css("background-color","purple");
                        }

                        $("#uvLabel").text(uvi);

                        //Initialize new variables needed for the second API
                        var foreCastTemp = [];
                        var foreCastHumid = [];
                        var date = [];
                        var foreCasticon = [];
                       
                        //Gets the dates and displays them
                        for (var i =0; i<6; i++){

                            j = i+1;
                            date[i] = data.daily[i].dt;
                            var day = moment.unix(date[i]);
                            $("#date"+j).text(moment(day).format("MMM DD"));
                        }

                        //Gets temp and humidity and displays
                        for (var i =0; i<5; i++){

                            j = i + 1;
                            foreCastTemp[i]= data.daily[j].temp.day;
                            foreCastHumid[i] = data.daily[j].humidity;
                            foreCasticon[i] = data.daily[j].weather[0].icon;
                            

                            var tempCelsius = foreCastTemp[i]-273;
                            var tempFahrenheit = Math.round((tempCelsius * (9/5)) + 32);

                            $("#day"+j).text("Temp "+tempFahrenheit.toString()+"°F");
                            $("#humid"+j).text("Humidity "+foreCastHumid[i].toString()+"%");
                            $("#icon"+j).attr("src","http://openweathermap.org/img/wn/"+foreCasticon[i]+".png");


                        }

                   

                        
                
                  });
                
               
        
              });


                

              

                //Display to html
                $("#cityLabel").text(city);
                
                var cityBtn =$('<input/>').attr({
                    type: "button",
                    id: "histBtn",
                    value: city,
                   
                    
                });

                

                //Append to list
                $("#city").prepend(cityBtn);
                $("#city").prepend("<br>");

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


    if(typeof(localStorage) != "undefined" && localStorage != null && localStorage.length != 0){
        
    

    var test = JSON.parse(localStorage.getItem("cities"));

    var city = test[test.length-1];
    
    getData(city);

    for(var i =0; i<test.length; i++){

        var cityBtn =$('<input/>').attr({
            type: "button",
            value: test[i],
            id: "histBtn",
        });

        //Append to list
        $("#city").prepend(cityBtn);
        $("#city").prepend("<br>");

        
        cityList.push(test[i]);
    }
}
    
}

//Clear city history
    $("#clear").on("click",function(){

        localStorage.clear();
        location.reload();
    });



// If city in search history is clicked
    $(document).on("click","#histBtn", function(){

        var city = this.value;
        
        getData(city);
    });







function getData(city){

        
    $("#cityLabel").text(city);
    
        var url = "https://api.openweathermap.org/data/2.5/weather?q="+city+",us&APPID=d2473db2d15b3f33089244526bb7a7b6";
    
    
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
                $("#tempLabel").text(" "+Math.round(tempFahrenheit)+"°F");
                $("#humidLabel").text(" "+humidity+"%");
                $("#windLabel").text(" "+Math.round(wind)+"MPH");
                $("#iconLabel").attr("src","http://openweathermap.org/img/wn/"+icon+".png");
                
                //Time for second URL
                var secondUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=minutely&appid=d2473db2d15b3f33089244526bb7a7b6";
                
               
                
                //Second API for 5day Forecast
                
                    $.ajax({
                        url: secondUrl,
                        method: "GET"
                      }).then(function(data) {
                            
                        //UVI variable
                        var uvi = data.current.uvi;
                        if(uvi <=3){
                            $("#uvLabel").css("background-color","green");
                        }
                        if(uvi >3 && uvi <6){
                            $("#uvLabel").css("background-color","yellow");
                        }
                        if(uvi >= 6 && uvi <9){
                            $("#uvLabel").css("background-color","red");
                        }
                        if(uvi >=9){
                            $("#uvLabel").css("background-color","purple");
                        }

                        $("#uvLabel").text(uvi);

                        //Initialize new variables needed for the second API
                        var foreCastTemp = [];
                        var foreCastHumid = [];
                        var date = [];
                        var foreCasticon = [];
                       
                        //Gets the dates and displays them
                        for (var i =0; i<6; i++){

                            j = i+1;
                            date[i] = data.daily[i].dt;
                            var day = moment.unix(date[i]);
                            $("#date"+j).text(moment(day).format("MMM DD"));
                        }

                        //Gets temp and humidity and displays
                        for (var i =0; i<5; i++){

                            j = i + 1;
                            foreCastTemp[i]= data.daily[j].temp.day;
                            foreCastHumid[i] = data.daily[j].humidity;
                            foreCasticon[i] = data.daily[j].weather[0].icon;
                            

                            var tempCelsius = foreCastTemp[i]-273;
                            var tempFahrenheit = Math.round((tempCelsius * (9/5)) + 32);

                            $("#day"+j).text("Temp: "+tempFahrenheit.toString()+"°F");
                            $("#humid"+j).text("Humidity: "+foreCastHumid[i].toString()+"%");
                            $("#icon"+j).attr("src","http://openweathermap.org/img/wn/"+foreCasticon[i]+".png");


                        }

                   

                        
                
                    });
                  
                 
          
                });

            }

        });

    }

    