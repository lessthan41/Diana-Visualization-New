function loadEvent() { // load event data via ajax

    var url_load = "https://pmdiana.hcilab.katrina.tw/event";
    $.ajax({
        url: url_load,
        dataType: "json",
        success: function(items) {
            event(items);
            loadOverall($('#eventSel1').val()); // load Overall
            loadFetch($('#countySel2 option:selected').text());
        }
    });
}

function event(items) {
    for (i in items) {
        var tr = $('.eventSel').append($('<option />').attr("value", items[i]["assessment_id"]).html(items[i]["event"]));
    }

    $(".eventSel").val(items[1]["assessment_id"]);
}

function loadOverall(ass_id) { // load event data via ajax

    var url_load = "https://pmdiana.hcilab.katrina.tw/overall?assessment_id=" + ass_id;
    $.ajax({
        url: url_load,
        dataType: "json",
        success: function(items) {
            overallData = items;
            loadChart(); // load Crossfilter
            mapInit();
        }
    });
}

function loadFetch(county) {

    var ass_id;
    if ($('#eventSel2').val()) {
        ass_id = $('#eventSel2').val();
    }

    var url_fetch = "https://pmdiana.hcilab.katrina.tw/fetch?county=" + county + "&assessment_id=" + ass_id;

    $.ajax({
        url: url_fetch,
        dataType: "json",
        success: function(items) {
            items = sort(items);
            detailTable(items);
            plotPoint(items);
        }
    });
}

function loadDetail(school) {

    var url_detail = "https://pmdiana.hcilab.katrina.tw/detail?userid=" + userid[school] + "&assessment_id=" + ass_id;

    $.ajax({
        url: url_detail,
        dataType: "json",
        success: function(items) {
            detail(items);
        }
    });
}

// function loadJSON() {
//     var url_json = "https://raw.githubusercontent.com/Bourbon0212/Diana-Visualization/master/assets/twCounty.geojson";
//     $.ajax({
//         url: url_json,
//         dataType: "json",
//         success: function(items) {
//             choropleth(items);
//         }
//     });
// }
