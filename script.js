var DateTime = luxon.DateTime;

function readAndConvertEventDate() {
    // reads in the input
    var eventName = document.getElementById("name").value;
    var eventDate = document.getElementById("when").value;
    var eventTime = document.getElementById("whenTime").value;
    var eventZone = document.getElementById("whenZone").value;

    //gets the utc offset for user submitted timezone
    var timezone = getUTCOffset(eventZone);
    //console.log(timezone)

    document.getElementById("eventName").value = eventName;

    let leadingZeroDate = eventDate.padStart(2, '0');

    let concattedDate = leadingZeroDate + 'T' + eventTime + timezone;
    //console.log(concattedDate);

    let convertedDate = new Date(concattedDate);
    //console.log(convertedDate)

    document.getElementById("convertedDate").value = convertedDate.getFullYear() + '-' + String(convertedDate.getMonth() + 1) .padStart(2, '0') + '-' + String(convertedDate.getDate()) .padStart(2, '0');

    const convertedHours = String(convertedDate.getHours()).padStart(2, '0');
    const ConvertedMinutes = String(convertedDate.getMinutes()).padStart(2, '0');

    document.getElementById("convertedTime").value = convertedHours + ':' + ConvertedMinutes;
}

function getUTCOffset(){
    var eventZone = document.getElementById("whenZone").value;
    //console.log(eventZone)

    var local = DateTime.local();
    var event = local.setZone(eventZone);

    eventTimeString = event.toString();

    if (eventZone == "UTC") {
        eventTimeString = eventTimeString.concat('-00:00')
    }

    offsetString = eventTimeString.slice(-6)

    return offsetString;
    
}

// This creates the timezone dropdown on the page.
// could be moved into a function or script tag 
// but needs to be kept.
let timezones = Intl.supportedValuesOf('timeZone');

var select = document.getElementById("whenZone");
var options = timezones;

for(var i = 0; i < options.length; i++) {
    var opt = options[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    //console.log(el.value)
    if (el.value != 'UTC'){
        select.appendChild(el);
    }
    
    //console.log(i)

}