function Linhas(DoReq) {
    this.Request = DoReq;

    this.List = function (value) {
        if (value != null && value != '') {
            this.Request.urlMetodo = '/Api/Linhas/List/';
            this.Request.urlFiltro = '?Value=' + value;
            this.Request.verbo = 'GET';
            this.Request.Executa(this.ApresentaLinhas, null, null, null);
        }
    };

    this.ListByConfiguração = function (Linha, Nome) {
        if ($('#lt1').is(':checked')) {
            console.log('Busca pontos!');
            pa.ListByLinha(Linha, Nome);
        }
        else {
            console.log('Busca pontos e linhas!');
            li.ListVeiculosEPontos(Linha, Nome);
        }
    }

    this.ListLocalizacaoVeiculos = function (Codigo) {
        if (Codigo != null && Codigo != '') {
            this.Request.urlMetodo = '/Api/Linhas/ListLocalizacaoVeiculos/';
            this.Request.urlFiltro = '?Codigo=' + Codigo;
            this.Request.verbo = 'GET';
            this.Request.Executa(this.MarcaVeiculosNoMapa, null, null, null);
        }
    };

    this.ListVeiculosEPontos = function (Codigo, Nome) {
        if (Codigo != null && Codigo != '') {
            this.Request.urlMetodo = '/Api/Linhas/ListVeiculosEPontos/';
            this.Request.urlFiltro = '?Codigo=' + Codigo;
            this.Request.verbo = 'GET';
            this.Request.Executa(this.MarcaVeiculosEPontos, null, null, null);
            fv.setCampos(Codigo, 1, Nome);
        }
    };

    this.ListPrevisaoLinhaEmPontos = function (Codigo) {
        if (Codigo != null && Codigo != '') {
            this.Request.urlMetodo = '/Api/Linhas/ListPrevisaoLinhaEmPontos/';
            this.Request.urlFiltro = '?Codigo=' + Codigo;
            this.Request.verbo = 'GET';
            this.Request.Executa(this.MarcaPrevisaoLinha, null, null, null);
        }
    };

    this.ApresentaLinhas = function (linhas) {
        try {
            if (linhas[0]) {
                $("#result h4.modal-title").text("Linhas");
                $("#result .row").empty();
                $(linhas).each(function (index, linha) {
                    $("#result .row").append(li.CreateLinhaObject(linha));
                });
                $('#result').modal();
            }
            else
                toastr["info"]("Nenhuma linha foi encontrada com este nome!");
        }
        catch (err) {
            console.log(err.message);
        }
    };

    this.CreateLinhaObject = function (linha) {
        var divinner = $('<div class="inner" />');
        var divicon = $('<div class="icon" />').append('<i class="fa fa-bus" />');
        var asmall = $('<a href="#" class="small-box-footer"/>')
            .text('Visualizar veiculos da linha  ')
                .append($('<i class="fa fa-map-marker" />'))
                    .on('click', function () {
                        $('#result').modal('hide');
                        li.ListByConfiguração(linha.Codigo, linha.Letreiro);
                    });
        var Sentido = linha.Sentido == 1 ? 'IDA' : 'VOLTA';
        var Denominacao = linha.Sentido == 1 ? linha.DenominacaoTPTS : linha.DenominacaoTSTP;
        var h3Letreiro = $('<h3 />').text(linha.Letreiro);
        var pSentido = $('<p />').append($('<strong />').text('Sentido: ')).append(Sentido);
        var pDenominacao = $('<p />').append($('<strong />').text('Letreiro: ')).append(Denominacao);

        divinner.append(h3Letreiro).append(pSentido).append(pDenominacao);
        var divsmall = $('<div class="small-box bg-aqua" />').append(divinner).append(divicon).append(asmall);
        var div = $('<div class="col-lg-6 col-xs-12" />').append(divsmall);
        return div;
    };

    this.MarcaVeiculosNoMapa = function (Localizacao) {
        try {
            if (Localizacao.Posicoes[0]) {
                clearAll();
                setVeiculos(Localizacao.Posicoes);
                setClusterMarkers();
                setBounds();
                fv.DisableFavControl();
            }
            else
                toastr["info"]("Desculpe! Não foi possível obter informações sobre está linha!");
        }
        catch (err) {
            console.log(err.message);
        }
    };

    this.MarcaPrevisaoLinha = function (Previsao) {
        try {
            if (Previsao.Pontos[0]) {
                clearAll();
                setPontos(Previsao.Pontos);
                $.each(Previsao.Pontos, function (index, ponto) {
                    setVeiculos(ponto.Veiculos);
                });
                setClusterMarkers();
                setBounds();
                fv.DisableFavControl();
            }
            else
                toastr["info"]("Desculpe! Não foi possível obter informações sobre está linha!");
        }
        catch (err) {
            console.log(err.message);
        }
    };

    this.MarcaVeiculosEPontos = function (LinhasEPontos) {
        try {
            if (LinhasEPontos.Linha.Posicoes[0]) {
                fv.CheckIfFavorito();
                clearAll();
                setVeiculos(LinhasEPontos.Linha.Posicoes);
                if (LinhasEPontos.Pontos[0])
                    setPontos(LinhasEPontos.Pontos);
                setClusterMarkers();
                setBounds();
            }
            else {
                fv.limpaCampos();
                toastr["info"]("Desculpe! Não foi possível obter informações sobre está linha!");
            }
        }
        catch (err) {
            console.log(err.message);
        }
    };
}