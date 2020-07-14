const map = L.map('map').setView([1.35, 103.82], 12);

L.tileLayer('http://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '',
    minZoom: 11,
    maxZoom: 18
}).addTo(map);

function onEachFeature(feature, layer) {
    const description = feature.properties.description;
    const case_size = feature.properties.case_size;
    const homes = feature.properties.homes;
    const public_places = feature.properties.public_places;
    const construction_sites = feature.properties.construction_sites;

    let popupContent = `<b>Cluster: </b>${description}<br/><b>Case Size: </b>${case_size}`
    if (homes) popupContent += `<br/><b>Homes: </b>${homes}`
    if (public_places) popupContent += `<br/><b>Public Places: </b>${public_places}`
    if (construction_sites) popupContent += `<br/><b>Construction Sites: </b>${construction_sites}`

    layer.bindPopup(popupContent);
}

function style(feature) {
    const case_size = feature.properties.case_size;
    if (case_size >= 10) {
        return {color: 'red'};
    } else {
        return {color: 'orange'};
    }
}

fetch('data-2020-07-10.json').then(res => res.json()).then(data => {
    const geojson = L.geoJSON(data, {
        onEachFeature: onEachFeature,
        style: style
    });
    geojson.addTo(map);
});