
const dateFormater = ( date, format ) => {
    // Get  date and time
    var currentDate = new Date(date);

    let year =currentDate.getFullYear()
    let day = currentDate.getDay()
    let month = currentDate.getMonth()



    // Get hours, minutes, and seconds
    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    var seconds = currentDate.getSeconds();



    // Function to convert to 12-hour format
    function convertTo12HourFormat(hours, minutes, seconds) {
        var period = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        hours = hours ? hours : 12; // Handle midnight
        var timeString = addLeadingZero(hours) + ":" + addLeadingZero(minutes) + ":" + addLeadingZero(seconds) + " " + period;
        console.log(timeString);
        return  `${day}/${month}/${year} : `+timeString;
    }

    // Function to convert to 24-hour format
    function convertTo24HourFormat(hours, minutes, seconds) {
        var timeString = addLeadingZero(hours) + ":" + addLeadingZero(minutes) + ":" + addLeadingZero(seconds);
        return `${day}/${month}/${year} : `+timeString;
    }


    
    // Function to add leading zero if necessary
    function addLeadingZero(number) {
        return number < 10 ? "0" + number : number;
    }



    if (format === '12') {
        // 12-hour format
        var twelveHourFormat = convertTo12HourFormat(hours, minutes, seconds);
        return twelveHourFormat;
    }
    else {
        // 24-hour format
        var twentyFourHourFormat = convertTo24HourFormat(hours, minutes, seconds);
        return twentyFourHourFormat
    }


}
export  { dateFormater} 
