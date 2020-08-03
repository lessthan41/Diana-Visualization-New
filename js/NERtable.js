

function loadNER() {
    let county = $('#countySel1 option:selected').text();
    let items = overallData[county]["ner"];
    $("#nerTable tbody tr").remove();

    for(i in items){
      var tr=$('#nerTable')
        .append($('<tr />')
        .append($('<td />').addClass('center aligned').html(items[i][0]).attr("style", "text-align: left"))
        .append($('<td />').addClass('center aligned').html("物品"))
        .append($('<td />').addClass('right aligned').html(items[i][1])))

    }
}
