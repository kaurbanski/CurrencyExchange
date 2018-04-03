$(document).ready(function () {
    fillPickers();
    loadActualGoldQuotations("http://api.nbp.pl/api/cenyzlota");
    loadGoldQuotationsByDate();
    $('button').click(function () {
        loadGoldQuotationsByDate();
    });
});

function loadActualGoldQuotations(urlAddress) {
    $('div.loader-place').addClass("loader");
    getJson(urlAddress).done(function (data) {

        $('h4').text("Aktualny kurs (" + data[0].data + "): " + data[0].cena + " zł");  
    });
}

function loadGoldQuotationsByDate() {
    var startDate = $('#startDatePicker').data('date');
    var endDate = $('#endDatePicker').data('date');
    var url = "http://api.nbp.pl/api/cenyzlota/" + startDate + "/" + endDate;

    $('div.loader-place').addClass("loader");
    getJson(url).done(function (data) {
        drawChart(data);
    });
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

function drawChart(data) {
    var quotations = [];
    var date = [];
    $.each(data, function (index, value) {
        quotations.push(data[index].cena);
        date.push(data[index].data);
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
            title: {
                display: true,
                text: "NOTOWANIA ZŁOTA"
            }


        }
    });
};