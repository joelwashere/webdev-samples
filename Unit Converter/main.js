function mphToKph(value) {
    value = parseFloat(value);
    document.getElementById("kph").value = value * 1.609344;
}
function kphToMph(value) {
    value = parseFloat(value);
    document.getElementById("mph").value = value / 1.609344;
}

function feetToMeters(value) {
    value = parseFloat(value);
    document.getElementById("meters").value = value / 3.2808;
}

function metersToFeet(value) {
    value = parseFloat(value);
    document.getElementById("feet").value = value * 3.2808;
}