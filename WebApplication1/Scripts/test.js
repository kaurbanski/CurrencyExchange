function markRow(id) {
    var tabelka = document.getElementById(id)
    var td = tabelka.getElementsByTagName('td')

    for (var i = 0; i < td.length; i++) {
        td[i].addEventListener('mouseover', function () {
            this.parentNode.classList.add('mark');
        });
        td[i].addEventListener('mouseout', function () {
            this.parentNode.classList.remove('mark');
        });
    }
}

function modify() {
    var item = document.querySelector('#but');
    item.textContent 
    

    //var last = item.lastChild;
    //console.log(last);
    //var table = item.getElementsByTagName('tr');
    //var x = table.
    //var lastChild = item.lastChild;
    //var prevLastChild = lastChild.previousSibling;
    //prevLastChild.textContent = 'alalalallaal';
   
}

function putHtml(id) {
    document.getElementById(id).innerHTML = "<strong>Tekst zmieniony<strong>";
}

document.addEventListener("DOMContentLoaded", function () {
    modify()
});