function Favoritos(DoReq) {

    this.Request = DoReq;
    this.Id = 0;
    this.bindFunction = 'click.all';
    this.canDoRequest = true;

    this.CheckIfFavorito = function () {
        if(this.isValid() && this.canDoRequest) {
            var Codigo = $("#CodigoAtual").val();
            var Tipo = $("#TipoAtual").val();
            this.Request.verbo = 'GET';
            this.Request.urlMetodo = '/Api/Favoritos/GetByCodigo?';
            this.Request.urlFiltro = String.format('Codigo={0}&Tipo={1}', Codigo, Tipo);
            this.Request.Executa(this.CheckSuccess, this.Carregando, this.Completo, null);
        }
    };

    this.SetFavorito = function () {
        if (this.canDoRequest) {
            this.Request.verbo = 'POST';
            this.Request.urlMetodo = '/Api/Favoritos/Post';
            this.Request.urlFiltro = '';
            this.Request.Executa(this.SetSuccess, this.Carregando, this.Completo, {
                Tipo : parseInt($("#TipoAtual").val()),
                Codigo: parseInt($("#CodigoAtual").val()),
                Nome: $("#NomeAtual").val()
            });
        }
    };

    this.DeleteFavorito = function (Id) {
        if (this.canDoRequest) {
            fv.Id = Id;
            this.Request.verbo = 'DELETE';
            this.Request.urlMetodo = '/Api/Favoritos/Delete/';
            this.Request.urlFiltro = Id;
            this.Request.Executa(this.DeleteSuccess, this.Carregando, this.Completo, null);
        }
    };

    this.ListaFavoritos = function () {
        if (this.canDoRequest) {
            this.Request.verbo = 'GET';
            this.Request.urlMetodo = '/Api/Favoritos';
            this.Request.urlFiltro = '';
            this.Request.Executa();
        }
    };

    this.Carregando = function () {
        fv.canDoRequest = false;        
    };

    this.Completo = function () {
        fv.canDoRequest = true;   
    };

    this.CheckSuccess = function (data) {
        fv.UnbindEvent();
        if (data) {
            $('#favControl').attr('status', 'active');
            $('#favControl').bind(fv.bindFunction, function () {
                fv.DeleteFavorito(data.Id);
            });
        }
        else {
            $('#favControl').attr('status', 'enable');
            $('#favControl').bind(fv.bindFunction, function () {
                fv.SetFavorito();
            });
        }
    };

    this.SetSuccess = function (data) {
        if (data) {
            var css;
            var fn;
            switch (data.Tipo) {
                case 1:
                case 'Linha':
                    css = 'fa fa-bus text-yellow';
                    fn = String.format("li.ListByConfiguração({0},'{1}');", data.Codigo, data.Nome);
                    break;
                case 2:
                case 'Corredor':
                    css = 'fa fa-road text-aqua';
                    fn = String.format("pa.ListByCorredor({0},'{1}');", data.Codigo,data.Nome);
                    break;
                case 3:
                case 'Ponto':
                    css = 'fa fa-neuter text-red';
                    fn = String.format('pa.MostraParada({0});', data.Codigo);
                    break;
            }
            var a = $('<a />', {
                href: '#',
                onClick: fn
            });
            a.append($('<i />').addClass(css));
            a.append(" " + data.Nome);
            var li = $('<li />', { id : data.Id });
            li.append(a);
            li.append($('<input />', { type: 'hidden', value: data.Id }));
            li.append($('<input />', { type: 'hidden', value: data.Codigo }));
            li.append($('<input />', { type: 'hidden', value: data.Tipo }));
            $('#favContainer').append(li);
            $('#favControl').attr('status', 'active');
            fv.UnbindEvent();
            $('#favControl').bind(fv.bindFunction, function () {
                fv.DeleteFavorito(data.Id);
            });
            var count = parseInt($('#favCount').text());
            $('#favCount').text(count + 1);
            toastr["success"]("Item favoritado com sucesso!");
        }
        else {
            toastr["error"]("Desculpe! Aconteceu algo inesperado! Não foi possivel favoritar o item atual!");
        }
    };

    this.DeleteSuccess = function (data) {
        if (data && data == true)
        {
            $('#favControl').attr('status', 'enable');
            fv.UnbindEvent();
            $('#favControl').bind(fv.bindFunction, function () {
                fv.SetFavorito();
            });
            var count = parseInt($('#favCount').text());
            $('#favCount').text(count - 1);
            var idFav = String.format('ul#favContainer > li#{0}', fv.Id);
            $(idFav).remove();
            toastr["success"]("Item deletado com sucesso!");
        }
        else
            toastr["error"]("Desculpe! Aconteceu algo inesperado! Não foi possivel deletar o item atual!");
    };

    this.isValid = function () {
        var Codigo = $("#CodigoAtual").val();
        var Tipo = $("#TipoAtual").val();
        return ((Codigo != null && Codigo != '') && (Tipo != null && Tipo != ''));
    };

    this.limpaCampos = function () {
        $("#NomeAtual").val('');
        $("#CodigoAtual").val('');
        $("#TipoAtual").val('');
    };

    this.setCampos = function (Codigo, Tipo, Nome) {
        $("#CodigoAtual").val(Codigo);
        $("#TipoAtual").val(Tipo);
        $("#NomeAtual").val(Nome);
    };

    this.UnbindEvent = function () {
        $('#favControl').unbind(this.bindFunction);
    };

    this.DisableFavControl = function () {
        fv.limpaCampos();
        fv.UnbindEvent();
        $('#favControl').attr('status', 'disable');
    };
}

/*
    Caso for alterar o modo de pesquisa de linhas verificar a seguinte (HERE) marcação no arquivos 
    - Favoritos.js
    - Favoritos.cshtml
    - Linhas.js
*/