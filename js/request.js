function loadEvent() {  // load event data via ajax

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
    for (i in items) {
        var tr = $('.eventSel').append($('<option />').attr("value", items[i]["ass_id"]).html(items[i]["event"]));
    }
    $(".eventSel").val(items[1]["ass_id"]);
}

var ass_id;
function poke(county, cat) {

    if ($('#eventSel2').val()) {
        ass_id = $('#eventSel2').val();
    }

    var url_fetch = "https://pmdiana.hcilab.katrina.tw/fetch?county=" + county + "&assessment_id=" + ass_id;
    
    $.ajax({
        url: url_fetch,
        dataType: "json",
        success: function(items) {

            items = sort(items);
            loadJSON(items);
            if (cat == 'details') {
                plot(items);
            }
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
