// static divs for the time with data id's

// day object that has a date, array of time objects = to data id's , each time object has an event 

var day = [
    timeSlot = {
        time: String,
        event: String
    }
]

var now  = moment();

$("#date").text(now.format("dddd MMMM Do, Y"))
$("#date").css("font-weight","bold")




//this function sets up the page as intended for the view
function init(){
 for(var i=9 ; i<=17; i++){  //9 comes from 9am and 17 refers to 5pm
    var row  = $("<div>");
    row.addClass("row no-gutters");
        var timeCol = $("<div>");
        timeCol.addClass("col-1 time-slot");
            var timeSpan = $("<span>");
            timeSpan.addClass("time-text");
            timeSpan.text(formatTime(i))
        timeCol.append(timeSpan);
        
        var eventCol= $("<div>");
        eventCol.addClass("col-10 event");
            var eventText = $("<textarea>");
            eventText.addClass("textarea");
            
        eventCol.append(eventText);    

        var btnCol =$("<div>");
        btnCol.addClass("col-1");
            var button = $("<button>");
            button.addClass("btn btn-primary btn-block");
            button.text("save");
        btnCol.append(button);
        if(now.hour()>i){
            eventText.addClass("past");
            eventText.attr("disabled","disabled");
            button.attr("disabled","disabled")
        }
    row.append(timeCol,eventCol,btnCol)
    row.attr("data-id",i-9);

    $(".container").append(row);       
    
 } 
}

function formatTime(time){
    var eveningTime = time - 12;
    if(time>12){
        return (`${eveningTime}pm`);
    }else{
        return (`${time}am`);
    }
}

init();

