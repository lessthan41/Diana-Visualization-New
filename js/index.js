//setting

var view = new ol.View({
    center: ol.proj.fromLonLat([121, 23.5]),
    // minZoom: 7.2,
    zoom: 7.5
})

var raster = new ol.layer.Tile({
    source: new ol.source.XYZ({
        crossOrigin: 'anonymous',
        url: 'https://mt{0-3}.google.com/vt/lyrs=r&x={x}&y={y}&z={z}',
    }),
})

var vector = new ol.layer.Vector({
    renderMode: 'image',
    source: new ol.source.Vector({
        url: 'https://raw.githubusercontent.com/Bourbon0212/Diana-Visualization/master/assets/twCounty.geojson',
        format: new ol.format.GeoJSON()
    }),
    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#c7daf3',
            width: 1
        }),
    }),
})

var pointLayer = new ol.layer.Vector({});

var popup = new ol.Overlay({
    element: document.getElementById('popup')
});

//---------------------------------------------------------
//map init

var map1 = new ol.Map({
    target: 'map1',
    layers: [raster, pointLayer],
    // stop zooming with scroll
    view: view
});

var map2 = new ol.Map({
    target: 'map2',
    layers: [raster, vector, pointLayer],
    // stop zooming with scroll
    view: view
});

//---------------------------------------------------------
// show detail table

function show() {
    $('#dialog1').modal('show');
}

//---------------------------------------------------------
$(function() {

    // Failed to connect
    if (navigator.onLine) {
        console.log('online');
    } else {
        console.log('offline');
        $("#network").css('visibility', 'visible');
    }

    // request for data
    loadEvent();

    // load diagram
    loadChart();
})
