// static divs for the time with data id's

// day object that has a date, array of time objects = to data id's , each time object has an event 

var timeSlot = {
    id: Number,
    time: String,
    event: String
}  
    
var now  = moment();
$("#date").text(now.format("dddd MMMM Do, Y"))
$("#date").css("font-weight","bold")
console.log(now.hour());

//this function sets up the page as intended for the view
function init(){
 for(var i=9 ; i<=17; i++){  //9 comes from 9am and 17 refers to 5pm
    // appending div and spans and adding classes and attributes
    var row  = $("<div>");
    row.addClass("row no-gutters");
        var timeCol = $("<div>");
        timeCol.addClass("col-md-2 col-3 time-slot mb-2");
            var timeSpan = $("<span>");
            timeSpan.addClass("time-text");
            timeSpan.text(formatTime(i))
        timeCol.append(timeSpan);
        
        var eventCol= $("<div>");
        eventCol.addClass("col-9 event");
            var eventText = $("<textarea>");
            eventText.addClass("textarea");
            eventText.attr("id",i-9);
        eventCol.append(eventText);    

        var btnCol =$("<div>");
        btnCol.addClass("col-md-1 col-12");
            var button = $("<button>");
            button.addClass("btn btn-primary btn-block");
            button.text("save");
            button.attr("data-id",i-9);
        btnCol.append(button);
        if(now.hour()>i){
            eventText.addClass("past");
            eventText.attr("disabled","disabled");
            button.attr("disabled","disabled")
        }else if(now.hour() == i){
            eventText.addClass("present");
        }else{
            eventText.addClass("future");
        }
    row.append(timeCol,eventCol,btnCol)
    $(".container").append(row);       
 } 
}

// formats time into am /pm formart
function formatTime(time){
    var eveningTime = time - 12;
    if(time>12){
        return (`${eveningTime}:00pm`);
    }else{
        return (`${time}:00am`);
    }
}

init();

$(".btn").click(buttonClick);

var dataArray = [];

function buttonClick(){
    var buttonId = ($(this).attr("data-id"));
    var textAreaId = $(".textarea");
    for(var i=0 ; i<textAreaId.length;i++){
        if(textAreaId[i].id === buttonId){
            console.log(checkId(buttonId));
            if(typeof checkId(buttonId) === "undefined"){
                saveNewItem(buttonId, textAreaId[i].value);
            }
            else{
                replaceItem(checkId(buttonId),buttonId,textAreaId[i].value);
            }
            
            console.log(dataArray);
            localStorage.setItem("data", JSON.stringify(dataArray));
        }
    
    } 
    
}
loadData();
function loadData(){
    dataArray = JSON.parse(localStorage.getItem("data"))
    if(dataArray === null){
        dataArray = [];
    }
    console.log (dataArray);
    
}

//check if in data function and returns the index if found
function checkId(id){
    console.log(id);
    var included = false;
    for(var i=0; i<dataArray.length; i++){
        if(dataArray[i].id.includes(id)){
            included = true
            return (i);
        }
        
    }
   
}

//replace function

function saveNewItem(id, value){
 alert("saving as a new item");
    dataArray.push({
        id:id,
        value:value
    });
}

function replaceItem(index, id, value){  
     dataArray.splice(index,1);
     dataArray.push({
         id:id,
         value:value
     });
}



