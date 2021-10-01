/*setTimeout(()=>{
    console.log("WAAAZZA")
}, 2000 )*/

let getData = () => {
    const API_ENDPOINT = "https://pomber.github.io/covid19/timeseries.json"
    fetch(API_ENDPOINT)
        .then((response) => response.json())
        .then((data) => processData(data))
        .catch((error) => handleError(error))
}

let fetchData  = async () =>  {
    const API_ENDPOINT = "https://pomber.github.io/covid19/timeseries.json"
    var response = await fetch(API_ENDPOINT)
    let data = await response.json()
    console.log(data)
    return data
}

let processData = (data) => {
    console.log(data)
    console.log(extractMauritiusData(data).pop())
    renderData(data["Mauritius"].pop());
}

let handleError = (err) => {
    console.error("Something went wrong: " + err)
}

let extractMauritiusData = (data) => data["Mauritius"]

let renderData = (data) =>{
    setTimeout(()=>{
        document.getElementById("date").innerHTML = data["date"];
    document.getElementById("countryName").innerHTML = "Mauritius";
    document.getElementById("confirmed").innerHTML = data.confirmed;
    document.getElementById("deaths").innerHTML = data.deaths;
    document.getElementById("recovered").innerHTML = data.recovered; 
    }, 0 );
       
}

let getCountries = (data) => Object.keys(data)

getData()

let displayCountryName = async (data) => {
    let countryNames = getCountries(await data);
    console.log(countryNames)
    countryNames.forEach(countryName => {
        var elemDiv = document.createElement('div');
        elemDiv.innerHTML = countryName;
        document.getElementById("countries").appendChild(elemDiv);
        
    });
}

displayCountryName(fetchData())
console.log('%c JavaScript!!', 'font-weight: bold; font-size: 50px;color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)');
