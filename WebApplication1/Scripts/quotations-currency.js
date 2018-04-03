$(document).ready(function () {
    loadAvailableCurrency("http://api.nbp.pl/api/exchangerates/tables/c");    
    fillPickers();
    
    $('button').click(function () {
        loadDataBeetweenStartEnd();     
    });
});

function loadAvailableCurrency(urlAddress) {
    $('div.loader-place').addClass("loader");
    getJson(urlAddress).done(function (data) {
        rates = data[0].rates;

        var code = "";
        for (var i in rates) {
            code +=
                "<option value=\"" + rates[i].code + "\">" + rates[i].code + " (" + rates[i].currency + ")" + "</option>"
        }
        $('select').html(code);
        loadDataBeetweenStartEnd();
    });
}

function fillPickers() {
    var startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);
    var endDate = new Date();

    $('#startDatePicker').datetimepicker({
        format: 'YYYY-MM-DD',
        date: startDate,
    });

    $('#endDatePicker').datetimepicker({
        format: 'YYYY-MM-DD',
        date: endDate,
    });
};

function loadDataBeetweenStartEnd() {
    var startDate = $('#startDatePicker').data('date');
    var endDate = $('#endDatePicker').data('date');
    var pickedCurrency = $('#currenciesList').val();
    var url = "http://api.nbp.pl/api/exchangerates/rates/";

    var selected = [];
    $('input:checked.one-checked-checkbox').each(function () {
        selected.push($(this));
    });

    var checkbox = selected[0];
    switch (checkbox.val()) {
        case "mid":
            url+="A/"
            break;
        case "ask":
            url+="C/"
            break;
        case "bid":
            url += "C/"
            break;
    }
    
    url += pickedCurrency + "/" + startDate + "/" + endDate;

    $('div.loader-place').addClass("loader");
    getJson(url).done(function (data) {
        drawChart(data, checkbox.val());
    });
}


function drawChart(data, type) {
    var quotations = [];
    var rates = data.rates;
    var date = [];
    $.each(rates, function (index, value) {
        quotations.push(rates[index][type]);
        date.push(rates[index].effectiveDate)
    });
    var quantityOfElements = quotations.length;
    var ctx = $('#chart');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: date,
            datasets: [{
                data: quotations,
                borderWidth: 1
            }]
        },
        options: {
            legend: {
                display: false
            },
            
            
        }
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

$('input.one-checked-checkbox').on('change', function () {
    $('input.one-checked-checkbox').not(this).prop('checked', false);
});
