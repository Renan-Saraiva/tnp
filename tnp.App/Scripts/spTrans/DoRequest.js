function DoRequest() {
    this.urlDominio = '';
    this.urlMetodo = '';
    this.urlFiltro = '';
    this.timeOut = 150000;
    this.verbo = '';

    this.Executa = function (callbackSuccess, callbackBeforeSend, callbackCompleto, data) {
        try {
            var self = this;
            $.ajax(this.urlDominio + this.urlMetodo + this.urlFiltro, {
                data: data ,
                method: this.verbo,
                timeout: self.timeOut,
                beforeSend: typeof callbackBeforeSend === 'function' ? callbackBeforeSend : function () { self.Carregando() },
                success: function (data) { callbackSuccess(data) },
                error:  function (jqXHR, textStatus, errorThrown) { self.Erro(jqXHR, textStatus, errorThrown) },
                complete: typeof callbackCompleto === 'function' ? callbackCompleto : function () { self.Completo() }
            });
        } catch(err) {
            this.Completo();
        }
    };

    this.Carregando = function () {
        $('#ModalLoading').css('visibility', 'visible');
        $('#ModalLoading > span').addClass('glyphicon-animate');
        $('#btnPesquisar > span.glyphicon').removeClass('glyphicon-search');
        $('#btnPesquisar > span.glyphicon').addClass('glyphicon-refresh glyphicon-animate');
        $('#btnPesquisar').prop("disabled", true);
        $('#ValorPesquisa').prop("disabled", true);
        $('#cboTipoPesquisa').prop("disabled", true);
    };

    this.Erro = function (jqXHR, textStatus, errorThrown) {
        toastr["error"]("Desculpe! Aconteceu algo inesperado! Por favor tente novamente mais tarde");
        console.log('==================== INICIO LOG ERRO =====================');
        console.log('URL CHAMADA: ' + this.urlDominio + this.urlMetodo + this.urlFiltro);
        console.log('VERBO: ' + this.verbo);
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
        console.log('===================== FIM LOG ERRO =======================')
    };

    this.Completo = function () {
        $('#ModalLoading > span').removeClass('glyphicon-animate');
        $('#ModalLoading').css('visibility', 'hidden');
        $('#btnPesquisar > span.glyphicon').removeClass('glyphicon-refresh glyphicon-animate');
        $('#btnPesquisar > span.glyphicon').addClass('glyphicon-search');
        $('#btnPesquisar').prop("disabled", false);
        $('#ValorPesquisa').prop("disabled", false);
        $('#cboTipoPesquisa').prop("disabled", false);
    };
}