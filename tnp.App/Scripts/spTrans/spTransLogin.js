function spTransLogin() {
    this.urlDominio = $('#urlDominio').val();
    this.urlMetodo = '';
    this.urlFiltro = '';
    this.timeOut = 15000;

    this.Login = function () {
        var value = $('#token').val();
        if (value != null && value != '') {
            this.urlMetodo = '/Login/Autenticar?';
            this.urlFiltro = 'token=' + value;
            this.Executa();
        }
    };
    this.Executa = function () {
        var self = this;
        $.ajax(this.urlDominio + this.urlMetodo + this.urlFiltro, {
            method: 'POST',
            timeout: self.timeOut,
            crossDomain: true,
            headers: { "Access-Control-Allow-Origin": "*" },
            xhrFields: { withCredentials: true },
            beforeSend: function (xhr) { self.Carregando(xhr) },
            success: function (data) { self.Sucesso(data) },
            error: function (jqXHR, textStatus, errorThrown) { self.Erro(jqXHR, textStatus, errorThrown) },
            complete: function () { self.Completo() }
        });
    };

    this.Carregando = function (xhr) {
        xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
        $('#WaitLogin').modal({
            keyboard: false
        })
    };

    this.Sucesso = function (data) {
        alert(data);
    };

    this.Erro = function (jqXHR, textStatus, errorThrown) {
        console.log('==================== INICIO LOG ERRO =====================');
        console.log('URL CHAMADA: ' + this.urlDominio + this.urlMetodo + this.urlFiltro);
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
        console.log('===================== FIM LOG ERRO =======================')
    };

    this.Completo = function () {
        $('#WaitLogin').modal('hide');
    };
}

setTimeout(function () { new spTransLogin().Login(); }, 500);
