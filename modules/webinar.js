const moment = require('moment-timezone');

function getWebinarTimeAndDate(userTimeZone) {
    const indiaTimeZone = 'Asia/Kolkata';

    // Get the current time in India timezone
    const indiaNow = moment.tz(indiaTimeZone);
    const india11AM = indiaNow.clone().set({ hour: 11, minute: 0, second: 0, millisecond: 0 });
    const india6PM = indiaNow.clone().set({ hour: 18, minute: 0, second: 0, millisecond: 0 });

    let webinarTime;
    let webinarDate = indiaNow.clone();

    // If current time in India is before 11 AM, send webinar time at 11 AM
    if (indiaNow.isBefore(india11AM)) {
        webinarTime = '11:00 AM';
    }
    // If current time in India is between 11 AM and 6 PM, send webinar time at 6 PM
    else if (indiaNow.isBefore(india6PM)) {
        webinarTime = '6:00 PM';
    }
    // If current time in India is after 6 PM, send webinar time at 11 AM on the next day
    else {
        webinarDate.add(1, 'days');
        webinarTime = '11:00 AM';
    }

    // Convert the selected India webinar time to the user's local time zone
    const webinarLocalTime = webinarDate.tz(userTimeZone).set({ hour: webinarTime === '11:00 AM' ? 11 : 18, minute: 0, second: 0, millisecond: 0 }).format('YYYY-MM-DD HH:mm');

    // Format the local time for user
    const localTimeFormatted = moment.tz(webinarLocalTime, userTimeZone).format('hh:mm A');

    return { webinarDate: webinarLocalTime.split(' ')[0], webinarTime: localTimeFormatted };
}

module.exports = { getWebinarTimeAndDate };
