$(document).ready(function () {
    loadBidAskCurrency("http://api.nbp.pl/api/exchangerates/tables/c");
    $("table").tablesorter();
});

function loadBidAskCurrency(urlAddress) {
    $('tbody').empty();
    $('div.loader-place').addClass("loader");

    getJson(urlAddress).done(function (data) {
        rates = data[0].rates;
        effectiveDate = data[0].effectiveDate;

        if ($('#datetimepicker1').data('date') == null) {
            fillPicker(effectiveDate);
        }
        var code = "";
        for (var i in rates) {
            code +=
                "<tr><td>" + rates[i].code + "</td><td>"
                + rates[i].currency + "</td><td>"
                + rates[i].ask + "</td><td>"
            + rates[i].bid + "</td></tr>";
        }
        $('tbody').hide().html(code).fadeIn(1000);
        $('table').trigger("update");
        $('#searchInput').val("");
    });
}

function fillPicker(date) {
    $('#datetimepicker1').datetimepicker({
        format: 'YYYY-MM-DD',
        date: date,
    }).on('dp.change', function () {
        var pickedDate = $('#datetimepicker1').data('date');
        var url = "http://api.nbp.pl/api/exchangerates/tables/c/" + pickedDate;
        loadBidAskCurrency(url);
    });
};

function getJson(urlAddress) {
    var result = $.ajax({
        type: "GET",
        url: urlAddress,
        dataType: 'json',
        success: function (json) {
        },
        complete: function () {
            $('div.loader-place').removeClass("loader");
        },
        error: function () {
            $('div.loader-place').removeClass("loader");
        }
    });
    return result;
}


$("#searchInput").keyup(function () {
    var value = this.value.toLowerCase().trim();

    $("table tr").each(function (index) {
        if (!index) return;
        $(this).find("td").each(function () {
            var id = $(this).text().toLowerCase().trim();
            var not_found = (id.indexOf(value) == -1);
            $(this).closest('tr').toggle(!not_found);
            return not_found;
        });
    });
});

