function getWebinarTimeAndDate() {
    const now = new Date();
    let webinarDate = new Date(now); // Start with the current date
    let webinarTime;

    if (now.getHours() < 11) {
        webinarDate.setHours(11, 0, 0, 0);
        webinarTime = '11:00 AM';
    } else if (now.getHours() >= 11 && now.getHours() < 18) {
        webinarDate.setHours(18, 0, 0, 0);
        webinarTime = '6:00 PM';
    } else {
        webinarDate.setDate(webinarDate.getDate() + 1);
        webinarDate.setHours(11, 0, 0, 0);
        webinarTime = '11:00 AM';
    }

    const formattedDate = webinarDate.toISOString().split('T')[0];

    return { webinarDate: formattedDate, webinarTime };
}

module.exports = { getWebinarTimeAndDate };
