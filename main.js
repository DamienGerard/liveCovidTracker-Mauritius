let selectedCountry = ''

let fetchData = async() => {
    const API_ENDPOINT = "https://pomber.github.io/covid19/timeseries.json"
    var response = await fetch(API_ENDPOINT)
    let data = await response.json()
    console.log(data)
    return data
}

let covidData = fetchData()
let selectedCountryDateIndexedData = []

let handleError = (err) => {
    console.error("Something went wrong: " + err)
}

let renderData = (selectedDate) => {
    document.getElementById("date").setAttribute("value", selectedCountryDateIndexedData[selectedDate]["date"]);
    document.getElementById("countryName").innerHTML = selectedCountry;
    document.getElementById("confirmed").innerHTML = selectedCountryDateIndexedData[selectedDate]["confirmed"];
    document.getElementById("deaths").innerHTML = selectedCountryDateIndexedData[selectedDate]["deaths"];
    document.getElementById("recovered").innerHTML = selectedCountryDateIndexedData[selectedDate]["recovered"];
}

let getDateLimits = () => {
    let dates = Object.keys(selectedCountryDateIndexedData)
    return { "min": dates[0], "max": dates[dates.length - 1] }
}

let selectCountry = async(countryName) => {
    console.log(countryName);
    let filteredOutCountryData = (await covidData)[countryName];
    selectedCountryDateIndexedData = (getDateIndexedDataOfCountry(filteredOutCountryData))
    console.log(selectedCountryDateIndexedData);
    toggleSelectedCountry(countryName);
    renderData(selectedCountryDateIndexedData[Object.keys(selectedCountryDateIndexedData)[Object.keys(selectedCountryDateIndexedData).length - 1]]["date"]);
    let dateLimits = getDateLimits();
    console.log(dateLimits);
    setMiniMaximumDate("min", dateLimits["min"]);
    setMiniMaximumDate("max", dateLimits["max"]);
}

let toggleSelectedCountry = (countryName) => {
    if (selectedCountry !== '') document.getElementById(`country-${selectedCountry}`).classList.remove("activate");
    document.getElementById(`country-${countryName}`).classList.add("activate");
    selectedCountry = countryName;
}

let formatDateProperly = (dateString) => {
    let segmentedDate = dateString.split('-');
    for (var i = 0; i < segmentedDate.length; i++) {
        if (segmentedDate[i].length < 2) segmentedDate[i] = `0${segmentedDate[i]}`
    }
    return `${segmentedDate[0]}-${segmentedDate[1]}-${segmentedDate[2]}`
}

let getDateIndexedDataOfCountry = (data) => {
    var countryIndexData = []
    data.forEach(element => {
        element["date"] = formatDateProperly(element["date"]);
        countryIndexData[element["date"]] = element;
    });
    return countryIndexData;
}

let displayCountryName = async() => {
    data = await covidData
    console.log(data)

    for (const [key, value] of Object.entries(data)) {
        var elemDiv = document.createElement('div');
        elemDiv.classList.add("countryListItem");
        elemDiv.id = `country-${key}`
        elemDiv.addEventListener("click", function() {
            selectCountry(key);
        }, false);
        elemDiv.innerHTML = key;
        document.getElementById("countryList").appendChild(elemDiv);
    }
}

let setMiniMaximumDate = (miniMaxi, limitDate) => {
    document.getElementById("date").setAttribute(miniMaxi, limitDate);
}

let handleDateChange = (event) => {
    renderData(event.target.value)
}

displayCountryName()
console.log('%c JavaScript!!', 'font-weight: bold; font-size: 50px;color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)');