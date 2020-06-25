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


    //Only proceed forward if it is a valid city

    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?q="+city+",us&APPID=d2473db2d15b3f33089244526bb7a7b6",
        type: "GET",
        dataType: 'json',
        data: {"data":"check"},
        success: function(data){

            console.log(data);
        }
      })

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

//Clear city history
    $("#clear").on("click",function(){

        localStorage.clear();
        location.reload();
    });


