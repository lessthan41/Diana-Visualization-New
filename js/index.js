
$(function() {

    // Failed to connect
    if (navigator.onLine) {
        console.log('online');
    } else {
        console.log('offline');
        $("#network").css('visibility', 'visible');
    }


    loadEvent(); // request for event
    loadChart(); // load Crossfilter
})

// show detail table

function show() {
    $('#dialog1').modal('show');
}

function changeEvent(cat) {
    if (cat == 'overview') {

    }
    else if (cat == 'details') {
        poke($('#countySel2').val(), 'details');
    }
}
