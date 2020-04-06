function loadEvent() { //load data via ajax

    var url_load = "https://pmdiana.hcilab.katrina.tw/event";
    $.ajax({
        url: url_load,
        dataType: "json",
        success: function(items) {
            event(items);
        }
    });
}

function event(items) {

    $(".eventSel").val("none");

    for (i in items) {
        var tr = $('.eventSel').append($('<option />').attr("value", items[i]["ass_id"]).html(items[i]["event"]));
    }
}

var ass_id;
function poke(county) {

    if ($('#countySel').val()) {
        ass_id = $('#countySel').val();
    }

    var url_fetch = "https://pmdiana.hcilab.katrina.tw/fetch?county=" + county + "&assessment_id=" + ass_id;

    $.ajax({
        url: url_fetch,
        dataType: "json",
        success: function(items) {
            //console.log(items);
            // sort(items);
            items = sort(items);
            loadJSON(items);
            plot(items);
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
