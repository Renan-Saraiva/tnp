function Helper() {
    this.ValidateSearch = function () {
        toastr.options.closeButton = true;
        var msg = '';
        if ($('#TipoSelecionado').text() == 'Buscar Por')
        {
            msg = msg.concat('<li>Selecione um método de busca</li>');
        }
        if ($('#ValorPesquisa').val() == '')
        {
            msg = msg.concat('<li>Digite um valor de busca</li>');
        }
        if (msg.length > 0) {
            msg = '<ul>' + msg + '</ul>';
            toastr["error"](msg);
            return false;
        }
        return true;
    }
}

String.format = function () {
    var s = arguments[0];
    for (var i = 0; i < arguments.length - 1; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm");
        s = s.replace(reg, arguments[i + 1]);
    }
    return s;
}