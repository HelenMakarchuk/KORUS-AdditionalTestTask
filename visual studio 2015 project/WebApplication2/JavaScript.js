window.lastid = 0; Task(); setInterval(function () { Task(); }, 20000);

$("button").click(AdditionalTask);

function Task() {
    $.ajax({
        type: 'POST',
        url: 'WebService1.asmx/GetNewData',
        dataType: 'json',
        data: JSON.stringify({ lastId: window.lastid }),
        async: false,
        contentType: 'application/json; charset=utf-8',
        error: function (error) { console.log(error); },
        success: function (data) {
            for (i = 0; i < data.d.length; i++) {
                var json = JSON.stringify(data.d[i]);
                var string = JSON.parse(json);
                var array = new Array(string.fullname, string.address);

                if (string.phone != null) {
                    var phones = (string.phone).toString();

                    if (/9/i.test(phones)) {
                        var pa = phones.split(",");
                        var displayNumbersArray = new Array();

                        for (j = 0; j < pa.length; j++) {
                            dn = "+" + pa[j].substr(0, 1) + "(" + pa[j].substr(1, 3) + ")" + pa[j].substr(4, 3) + "-" + pa[j].substr(7, 2) + "-" + pa[j].substr(9, 2);
                            displayNumbersArray[j] = dn;
                        }
                    }
                    else { displayNumbersArray = ""; }
                }
                else { displayNumbersArray = ""; }

                if (i != data.d.length - 1) {
                    $('#Table tr:last').after('<tr> <td>' + array[0] + '</td> <td>' + array[1] + '</td> <td>' + displayNumbersArray + '</td> </tr>');
                }
                else { window.lastid = parseInt(array[0]); }
            }
        }
    })
}

function AdditionalTask() {
    buttonId = this.id;
    $.ajax({
        url: 'Service1.svc/F1',
        method: 'post',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({ arg: buttonId }),
        dataType: 'json',
        error: function (error) { console.log(error); },
        success: function (data) {
            switch (buttonId) {
                case "b1":
                    var s = "";
                    for (i = 0; i < data.d.length; i++) { s += data.d[i] + '\n'; }
                    $("textarea").html(s); break;
                case "b2": $('input').eq(0).val(data.d); break;
                case "b3": $('input').eq(1).val(new Array(data.d)); break;
                default: $('input').eq(2).val(data.d); 
            }                                  
        }
    })
}






