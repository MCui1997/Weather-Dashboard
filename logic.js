var cityList = [];


$("#searchBtn").on("click",function(){

    
    //Get text of the textarea
    var city = $("textarea").val();


    //Append to list
    $("#city").append(city+ "<br>");
    cityList.push(city);
  
    //store
    localStorage.setItem("cities", JSON.stringify(cityList));

});

function getStorage(){

    var test = JSON.parse(localStorage.getItem("cities"));

    console.log(test);
}

getStorage();