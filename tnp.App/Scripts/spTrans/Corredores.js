function Corredores(DoReq) {

    this.Request = DoReq;

    this.List = function () {
        this.Request.urlMetodo = '/Api/Corredores/List';
        this.Request.urlFiltro = '';
        this.Request.verbo = 'GET';
        this.Request.Executa(this.Sucesso, null, null, null);
    };

    this.Sucesso = function (Corredores) {
        try {
            $("#result .row").empty();
            $("#result h4.modal-title").text("Corredores");
            $(Corredores).each(function (index, corredor) {
                $("#result .row").append(cr.CreateCorredorObject(corredor));
            });
            $('#result').modal();
        }
        catch (err) {
            console.log(err.message);
        }
    };

    this.CreateCorredorObject = function (corredor) {
        var divinner = $('<div class="inner" />');
        var divicon = $('<div class="icon" />').append('<i class="fa fa-road" />');
        var asmall = $('<a href="#" class="small-box-footer"/>')
            .text('Visualizar no mapa  ')
                .append($('<i class="fa fa-map-marker" />'))
                        .on('click', function () {
                            $('#result').modal('hide');
                            pa.ListByCorredor(corredor.Codigo, corredor.Nome);
                        });

        var h3Corredor = $('<h4 />').text(corredor.Nome);

        divinner.append(h3Corredor);
        var divsmall = $('<div class="small-box bg-aqua" />').append(divinner).append(divicon).append(asmall);
        var div = $('<div class="col-lg-6 col-xs-12" />').append(divsmall);
        return div;
    };

}