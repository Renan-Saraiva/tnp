var hl = new Helper();
var dr = new DoRequest();
var li = new Linhas(dr);
var pa = new Paradas(dr);
var cr = new Corredores(dr);
var fv = new Favoritos(dr);

$('#TipoPesquisa > li > a').on('click', function () {
    $('#TipoSelecionado').text($(this).text());
    $('#spnMark').remove();
    $(this).prepend('<span id="spnMark" class="glyphicon glyphicon-ok">&nbsp;</span>');
});
$('#btnPesquisar').on('click', search);
$("#Corredores").on('click', function () {
    if ($("button.navbar-toggle").css('display') != 'none')
        $("button.navbar-toggle").click();
    cr.List();
    return false;
});
$("#ValorPesquisa").on('keypress', function (event) {
    if (event.which == 13 || event.keyCode == 13) {
        search();
    }
});

function search() {
    if (hl.ValidateSearch()) {
        var value = $('#ValorPesquisa').val()
        switch ($('#TipoSelecionado').text()) {
            case "Linha":
                li.List(value);
                break;
            case "Parada":
                pa.List(value);
                break;
        }
    }
}