function Paradas(DoReq) {

    this.Request = DoReq;

    this.List = function (Value) {
        if (Value != null && Value != '') {
            this.Request.urlMetodo = '/Api/Paradas/List?'
            this.Request.urlFiltro = 'Value=' + Value;
            this.Request.verbo = 'GET';
            this.Request.Executa(this.Sucesso, null, null, null);
        }
    };

    this.ListByCorredor = function (Corredor, Nome) {
        if (Corredor != null && Corredor != '') {
            this.Request.urlMetodo = '/Api/Paradas/ListByCorredor?'
            this.Request.urlFiltro = 'Codigo=' + Corredor;
            this.Request.verbo = 'GET';
            this.Request.Executa(this.MostraPontosCorredor, null, null, null);
            fv.setCampos(Corredor, 2, Nome);
        }
    };

    this.ListByLinha = function (Linha, Nome) {
        if (Linha != null && Linha != '') {
            this.Request.urlMetodo = '/Api/Paradas/ListByLinha?'
            this.Request.urlFiltro = 'Codigo=' + Linha;
            this.Request.verbo = 'GET';
            this.Request.Executa(this.MostraPontosLinha, null, null, null);
            fv.setCampos(Linha, 1, Nome);
        }
    };

    this.ListPrevisaoLinhasEmParada = function (Parada) {
        if (Parada != null && Parada != '') {
            this.Request.urlMetodo = '/Api/Paradas/ListPrevisaoLinhasEmPonto?'
            this.Request.urlFiltro = 'Codigo=' + Parada;
            this.Request.verbo = 'GET';
            this.Request.Executa(this.MostraPrevisaoLinhaEmParada, null, null, null);
        }
    };

    this.ListPrevisaoLinhaEmParada = function (Parada, Linha) {
        if ((Parada != null && Parada != '') && (Linha != null && Linha != '')) {
            this.Request.urlMetodo = '/Api/Paradas/ListPrevisaoLinhaEmPonto?'
            this.Request.urlFiltro = 'CodigoPonto=' + Parada + '&CodigoLinha' + Linha;
            this.Request.verbo = 'GET';
            this.Request.Executa();
        }
    };

    this.Sucesso = function (Paradas) {
        try {
            if (Paradas[0]) {
                $("#result h4.modal-title").text("Paradas");
                $("#result .row").empty();
                $(Paradas).each(function (index, Parada) {
                    $("#result .row").append(pa.CreateParadaObject(Parada));
                });
                $('#result').modal();
            }
            else
                toastr["info"]("Nenhuma parada foi encontrada com este nome!");
        }
        catch (err) {
            console.log(err.message);
        }
    };

    this.CreateParadaObject = function (Parada) {
        var divinner = $('<div class="inner" />');
        var divicon = $('<div class="icon" />').append('<i class="fa fa-neuter" />');
        var asmall = $('<a href="#" class="small-box-footer"/>')
                        .text('Visualizar no mapa  ')
                            .append($('<i class="fa fa-map-marker" />'))
                                .on('click', function () {
                                    $('#result').modal('hide');
                                    pa.MostraParada(Parada);
                                });


        var h3Parada = $('<h4 />').text(Parada.Nome);
        var pEndereco = $('<p />').append($('<strong />').text('Endereço: ')).append(Parada.Endereco);

        divinner.append(h3Parada).append(pEndereco);
        var divsmall = $('<div class="small-box bg-aqua" />').append(divinner).append(divicon).append(asmall);
        var div = $('<div class="col-lg-6 col-xs-12" />').append(divsmall);
        return div;
    };

    this.MostraPontosCorredor = function (Pontos) {
        try {
            if (Pontos[0]) {
                fv.CheckIfFavorito()
                clearAll();
                setPontos(Pontos);
                setClusterMarkers();
                setBounds();
            }
            else {
                fv.limpaCampos();
                toastr["info"]("Desculpe! Não foi possível obter informações sobre este corredor!");
            }
        }
        catch (err) {
            console.log(err.message);
        }
    }

    this.MostraPontosLinha = function (Pontos) {
        try {
            if (Pontos[0]) {
                fv.CheckIfFavorito()
                clearAll();
                setPontos(Pontos);
                setClusterMarkers();
                setBounds();
            }
            else {
                fv.limpaCampos();
                toastr["info"]("Desculpe! Não foi possível obter informações sobre esta linha!");
            }
        }
        catch (err) {
            console.log(err.message);
        }
    }

    this.MostraPrevisaoLinhaEmParada = function (Previsao) {
        try {
            if (Previsao.Ponto && Previsao.Ponto.Linhas[0]) {
                clearAll();
                var Pontos = [Previsao.Ponto];
                setPontos(Pontos);
                $.each(Previsao.Ponto.Linhas, function (index, Linha) {
                    setVeiculos(Linha.Veiculos);
                });
                setClusterMarkers();
                setBounds();
                fv.DisableFavControl();
            }
            else
                toastr["info"]("Desculpe! Não foi possível obter informações sobre este ponto!");
        }
        catch (err) {
            console.log(err.message);
        }
    }

    this.MostraParada = function (Parada) {
        try {
            fv.setCampos(Parada.Codigo, 3, Parada.Nome);
            fv.CheckIfFavorito();
            var Paradas = [Parada];
            clearAll();
            setPontos(Paradas);
            setBounds();
        }
        catch (err) {
            console.log(err.message);
        }
    }
}