window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || null;

if (window.SpeechRecognition === null) {
    console.log('Voz não suportada');
    $('#btnVoice').hide();
}
else {
    console.log('Voz suportada');

    var recognition = new window.SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'pt-BR';

    recognition.onstart = function () {
        console.log('VOZ INICIADA');
        $('#ValorPesquisa').val('');
        $('#btnVoice').attr('status', 'rec');
        toastr["info"]("Fale o que deseja procurar!");
    };

    recognition.onresult = function (event) {
        for (var i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                // Resultado final
                //$('#ValorPesquisa').val(event.results[i][0].transcript)
                var resultFinal = event.results[i][0].transcript.trim();
                var res = resultFinal.split(' ');
                
                if(res.length > 0)
                {
                    if (res[0].toLowerCase() == 'buscar')
                    {
                        if (res[1].toLowerCase() == 'linha') {
                            var buscaValor = resultFinal.substring(13);
                            $('#ValorPesquisa').val(buscaValor);
                            $('#linhaTipo').click();
                            li.List(buscaValor);
                        }
                        else if (res[1].toLowerCase() == 'parada' || res[1].toLowerCase() == 'ponto') {
                            var buscaValor;
                            if (res[1].toLowerCase() == 'parada')
                                buscaValor = resultFinal.substring(14);
                            else
                                buscaValor = resultFinal.substring(13);

                            $('#ValorPesquisa').val(buscaValor);
                            $('#paradaTipo').click();
                            pa.List(buscaValor);
                        }
                        else if (res[1].toLowerCase() == 'corredor' || res[1].toLowerCase() == 'corredores') {
                            cr.List();
                        }
                        else
                            $('#ValorPesquisa').val(resultFinal);
                    }
                    else
                        $('#ValorPesquisa').val(resultFinal);
                }
                else
                    $('#ValorPesquisa').val(resultFinal);
            } else {
                // Resultado provisório
                $('#ValorPesquisa').val(event.results[i][0].transcript);
            }
        }
    };

    recognition.onerror = function(event) { 
        console.log('ERRO VOZ');
        console.log(event);
        $('#btnVoice').attr('status', '');
    };

    recognition.onend = function () {
        console.log('VOZ FINALIZADA');
        $('#btnVoice').attr('status', '');
    };

    $('#btnVoice').on('click', function () {
        if ($('#btnVoice').attr('status') != 'rec')
            recognition.start();
    });
}