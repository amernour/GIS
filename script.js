let myBasemap= L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
var Stadia_AlidadeSmoothDark = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
	maxZoom: 20,
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
  // noWrap:true
});
var Esri_WorldTopoMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
});
var Thunderforest_TransportDark = L.tileLayer('https://{s}.tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png?apikey={apikey}', {
	attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	apikey: '<your apikey>',
	maxZoom: 22
});
var CartoDB_DarkMatter = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 19
});
var baseLayers = {
    "Open Street Map": myBasemap,
    "Esri BaseMap": Esri_WorldTopoMap,
    "Stadia BaseMap": Stadia_AlidadeSmoothDark,
    "Thunderforest BaseMap": Thunderforest_TransportDark,
    "CartoDB BaseMap": CartoDB_DarkMatter,
};
let myMap = L.map('mapDiv',{
    center:[25,30],
    zoom:5,
    layers:[CartoDB_DarkMatter],
    fullscreenControl: true
});
L.control.layers(baseLayers).addTo(myMap);
L.control.scale().addTo(myMap);
L.control.navbar().addTo(myMap);

var j=[]
// var l=[] // mloosh lzma
// var x=[] // mloosh lzma
fetch("https://coronavirus-tracker-api.herokuapp.com/v2/locations").then(res=>res.json()).then(resFinal=>{
  for (let index = 0; index < resFinal.locations.length; index++) { 
    if (resFinal.locations[index].latest.confirmed>=1000000) {
      L.circleMarker([resFinal.locations[index].coordinates.latitude,resFinal.locations[index].coordinates.longitude],{
        radius:10,
        stroke:false,
        fillColor:'red',
        fillOpacity:0.8
      }).bindPopup(`<table>
                     <tr>
                       <td>Country</td>
                       <td>${resFinal.locations[index].country}</td>
                     </tr>
                     <tr>
                       <td>Province</td>
                       <td>${resFinal.locations[index].province}</td>
                     </tr>
                     <tr>
                       <td>Population</td>
                       <td>${resFinal.locations[index].country_population}</td>
                     </tr>
                     <tr>
                       <td>Confirmed</td>
                       <td>${resFinal.locations[index].latest.confirmed}</td>
                     </tr>
                     <tr>
                       <td>Recovered</td>
                       <td>${resFinal.locations[index].latest.recovered}</td>
                     </tr>
                     <tr>
                       <td>Dead</td>
                       <td>${resFinal.locations[index].latest.deaths}</td>
                     </tr>
                     <tr>
                       <td>Last Update</td>
                       <td>${resFinal.locations[index].last_updated[0]+resFinal.locations[index].last_updated[1]+resFinal.locations[index].last_updated[2]+resFinal.locations[index].last_updated[3]+resFinal.locations[index].last_updated[4]+resFinal.locations[index].last_updated[5]+resFinal.locations[index].last_updated[6]+resFinal.locations[index].last_updated[7]+resFinal.locations[index].last_updated[8]+resFinal.locations[index].last_updated[9]}</td>
                     </tr>
                   </table>`).addTo(myMap)}
                   else if (resFinal.locations[index].latest.confirmed<=1000000 && resFinal.locations[index].latest.confirmed>=500000 ) {
                      L.circleMarker([resFinal.locations[index].coordinates.latitude,resFinal.locations[index].coordinates.longitude],{
                        radius:10,
                        stroke:false,
                        fillColor:'red',
                        fillOpacity:0.5
                      }).bindPopup(`<table>
                                     <tr>
                                       <td>Country</td>
                                       <td>${resFinal.locations[index].country}</td>
                                     </tr>
                                     <tr>
                                       <td>Province</td>
                                       <td>${resFinal.locations[index].province}</td>
                                     </tr>
                                     <tr>
                                       <td>Population</td>
                                       <td>${resFinal.locations[index].country_population}</td>
                                     </tr>
                                     <tr>
                                       <td>Confirmed</td>
                                       <td>${resFinal.locations[index].latest.confirmed}</td>
                                     </tr>
                                     <tr>
                                       <td>Recovered</td>
                                       <td>${resFinal.locations[index].latest.recovered}</td>
                                     </tr>
                                     <tr>
                                       <td>Dead</td>
                                       <td>${resFinal.locations[index].latest.deaths}</td>
                                     </tr>
                                     <tr>
                                       <td>Last Update</td>
                                       <td>${resFinal.locations[index].last_updated[0]+resFinal.locations[index].last_updated[1]+resFinal.locations[index].last_updated[2]+resFinal.locations[index].last_updated[3]+resFinal.locations[index].last_updated[4]+resFinal.locations[index].last_updated[5]+resFinal.locations[index].last_updated[6]+resFinal.locations[index].last_updated[7]+resFinal.locations[index].last_updated[8]+resFinal.locations[index].last_updated[9]}</td>
                                     </tr>
                                   </table>`).addTo(myMap)}
                   else if (resFinal.locations[index].latest.confirmed<500000) {
                      L.circleMarker([resFinal.locations[index].coordinates.latitude,resFinal.locations[index].coordinates.longitude],{
                        radius:10,
                        stroke:false,
                        fillColor:'red',
                        fillOpacity:0.3
                      }).bindPopup(`<table>
                                     <tr>
                                       <td>Country</td>
                                       <td>${resFinal.locations[index].country}</td>
                                     </tr>
                                     <tr>
                                       <td>Province</td>
                                       <td>${resFinal.locations[index].province}</td>
                                     </tr>
                                     <tr>
                                       <td>Population</td>
                                       <td>${resFinal.locations[index].country_population}</td>
                                     </tr>
                                     <tr>
                                       <td>Confirmed</td>
                                       <td>${resFinal.locations[index].latest.confirmed}</td>
                                     </tr>
                                     <tr>
                                       <td>Recovered</td>
                                       <td>${resFinal.locations[index].latest.recovered}</td>
                                     </tr>
                                     <tr>
                                       <td>Dead</td>
                                       <td>${resFinal.locations[index].latest.deaths}</td>
                                     </tr>
                                     <tr>
                                       <td>Last Update</td>
                                       <td>${resFinal.locations[index].last_updated[0]+resFinal.locations[index].last_updated[1]+resFinal.locations[index].last_updated[2]+resFinal.locations[index].last_updated[3]+resFinal.locations[index].last_updated[4]+resFinal.locations[index].last_updated[5]+resFinal.locations[index].last_updated[6]+resFinal.locations[index].last_updated[7]+resFinal.locations[index].last_updated[8]+resFinal.locations[index].last_updated[9]}</td>
                                     </tr>
                                   </table>`).addTo(myMap)}

    // to get the max , min and avg of confirmed but it's not practical so min < 500000 & avg from 500000 to 1000000 & max > 1000000
    // l.push(resFinal.locations[index].latest.confirmed)
               
    // list
    j.push(`<button onclick="myMap.flyTo([${resFinal.locations[index].coordinates.latitude},${resFinal.locations[index].coordinates.longitude}],7)"> ${resFinal.locations[index].country} <br>
            <font color="blue">Confirmed : ${resFinal.locations[index].latest.confirmed}</font> <br>
            <font color="green">Recovered : ${((resFinal.locations[index].latest.recovered/resFinal.locations[index].latest.confirmed)*100).toFixed(3)}%</font> <br>
            <font color="red">Dead : ${((resFinal.locations[index].latest.deaths/resFinal.locations[index].latest.confirmed)*100).toFixed(3)}%</font> <br></button>`)
          
        // mloosh lzma
        // x.push({
        //       "type": "Feature",
        //       "properties": {"country":resFinal.locations[index].country,
        //       "province":resFinal.locations[index].province,
        //       "population":resFinal.locations[index].country_population,
        //       "confirmed":resFinal.locations[index].latest.confirmed,
        //       "dead":resFinal.locations[index].latest.deaths,
        //       "recovered":resFinal.locations[index].latest.recovered,
        //       "updated":resFinal.locations[index].last_updated},
        //       "geometry": {
        //         "type": "Point",
        //         "coordinates": [
        //           resFinal.locations[index].coordinates.longitude,
        //           resFinal.locations[index].coordinates.latitude
        //         ]
        //       }
        //     })
  }

  // to get the max , min and avg of confirmed but it's not practical so min < 500000 & avg from 500000 to 1000000 & max > 1000000
  // console.log(Math.min(...l))
  // console.log(Math.max(...l))

    document.getElementById("list").innerHTML =j.join(" ")

    // footer
    document.getElementById("span1").innerHTML = `Confirmed`
    document.getElementById("span2").innerHTML = `Dead`
    document.getElementById("span3").innerHTML = `Recovered`
    document.getElementById("span11").innerHTML = `${resFinal.latest.confirmed}`
    document.getElementById("span21").innerHTML = `${resFinal.latest.deaths}`
    document.getElementById("span31").innerHTML = `${resFinal.latest.recovered}`
}).catch(err=>console.log(err))

var legend = L.control()
legend.onAdd = function() {
  var div = L.DomUtil.create('div', 'legend')
  div.innerHTML += '<h4>Number of Confirmed Cases</h4>'
  div.innerHTML += '<i style="background-color: #ff0000cc"></i><span>High</span><br>'
  div.innerHTML += '<i style="background-color: #ff000080"></i><span>Average</span><br>'
  div.innerHTML += '<i style="background-color: #ff00004d"></i><span>Low</span><br>'
  return div
}
legend.addTo(myMap)