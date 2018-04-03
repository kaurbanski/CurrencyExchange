$(document).ready(function () {
    loadCurrencyMidInDate("http://api.nbp.pl/api/exchangerates/tables/a");
    $("table").tablesorter();
});

function fillPicker(date) {
    $('#datetimepicker1').datetimepicker({
        format: 'YYYY-MM-DD',
        date: date,
    }).on('dp.change', function () {
        var pickedDate = $('#datetimepicker1').data('date');
        var url = "http://api.nbp.pl/api/exchangerates/tables/a/" + pickedDate;
        loadCurrencyMidInDate(url);
    });
};

function loadCurrencyMidInDate(urlAddress) {
    //$('tbody').empty();
    $('div.loader-place').addClass("loader");
    getJson(urlAddress).done(function (data) {
        rates = data[0].rates;
        effectiveDate = data[0].effectiveDate;

        if ($('#datetimepicker1').data('date') == null) {
            fillPicker(effectiveDate);
        }
        var cod = "";
        for (var i in rates) {
            cod +=
                "<tr><td>" + rates[i].code + "/PLN" + "</td><td>"
                + rates[i].currency + "</td><td>"
                + rates[i].code + "</td><td>"
                + rates[i].mid + "</td></tr>";
        }
        $('tbody').hide().html(cod).fadeIn(1000);
        $('table').trigger("update");
        $('#searchInput').val("");
    });
   // $("table").tablesorter({ sortList: [[0, 0], [1, 0]] });
}

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