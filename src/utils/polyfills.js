String.prototype.toTitleCase = function() {
    return this
    .toLowerCase()
    .split(' ')
    .map(function(word) {
        return word[0].toUpperCase() + word.substr(1);
    })
    .join(' ');
}

Date.prototype.formatTime = function (timeZone){
    var timeOptions = { hour: '2-digit', minute: '2-digit'}
    timeOptions.timeZone = timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone;

    return this.toLocaleTimeString('en-US', timeOptions)
}
Date.prototype.formatDate = function (timeZone){
    var dateOptions = { year: 'numeric', month: 'long', day: 'numeric' }
    dateOptions.timeZone = timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone;

    return this.toLocaleDateString('en-US', dateOptions)
}

module.exports = String.prototype.toTitleCase
module.exports = Date.prototype.formatDate
module.exports = Date.prototype.formatTime
