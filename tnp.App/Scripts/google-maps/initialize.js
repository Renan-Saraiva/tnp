var map;
var markers = [];
var idInfoWindowAberto;
var infoWindow = [];
var latlngbounds = null;
var markerCluster = null;
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
if (navigator.geolocation)
    navigator.geolocation.getCurrentPosition(CurretPosition, spPosition);
else
    spPosition();


function spPosition() {
    initialize({ lat: -22.618827234831404, lng: -42.57636812499999 },false);
}
function CurretPosition(position) {
    initialize({ lat: position.coords.latitude, lng: position.coords.longitude },true);
}
function initialize(position,hasPosition) {
    var mapOptions = {
        center: position,
        zoom: 17,
        streetViewControlOptions : {
            position: google.maps.ControlPosition.RIGHT_BOTTOM
        },
        panControlOptions: {
            position: google.maps.ControlPosition.LEFT_BOTTOM
        },
        zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_CENTER
        },
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.BOTTOM_CENTER
        }
    };
    directionsDisplay = new google.maps.DirectionsRenderer();
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    var control = CreateFavControl();
    map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(control);
    if (hasPosition) new google.maps.Marker({position: position,title: "Minha Posição.",map: map});
}
function CreateFavControl() {
    var divControl = document.createElement('div');
    divControl.id = "favControl"
    divControl.setAttribute('status', 'disable');
    var spanControl = document.createElement('i');
    spanControl.className = 'fa fa-fw fa-star';
    divControl.appendChild(spanControl);
    return divControl;
}

function setPontos(Pontos) {
    $.each(Pontos, function (index, Ponto) {
        var marker = setPonto(Ponto);
        var contentInfoWindow = "<b>Parada:</b> {0}" +
                                "<br />" +
                                "<button type='button' class='btn-xs btn-primary' onclick='closeInfoWindowOpened();pa.ListPrevisaoLinhasEmParada({1});'>" +
                                    "<span class='glyphicon glyphicon-search'></span>&nbsp;Ver linhas do ponto"+
                                "</button>" +
                                "<br />" +
                                "<button type='button' class='btn-xs btn-primary' onclick='closeInfoWindowOpened();realizaTrajeto({2},{3});'>" +
                                    "<span class='glyphicon glyphicon-search'></span>&nbsp;Traçar rota até este ponto" +
                                "</button>";
        setInfoWindow(index + "pt", marker, String.format(contentInfoWindow, Ponto.Nome, Ponto.Codigo, Ponto.Latitude, Ponto.Longitude));
        markers.push(marker);
    });
}
function setPonto(Ponto) {
    return new google.maps.Marker({
        position: new google.maps.LatLng(Ponto.Latitude, Ponto.Longitude),
        title: Ponto.Nome,
        icon: "../../Images/ponto_small.png",
        map: map
    });
}
function setVeiculos(Veiculos)
{
    $.each(Veiculos, function (index, Veiculo) {
        var marker = setVeiculo(Veiculo);
        var prefixo = String.format("<b>Veículo:</b> {0}<br />", Veiculo.Prefixo);
        var cadeirante = String.format('<b>Cadeirante:</b> {0}<br />', Veiculo.Acessibilidade ? 'Sim' : 'Não');
        var previsao = "";
        if (Veiculo.Previsao)            
            previsao = String.format('<b>Previsão de chegada às:</b> {0} <br />',Veiculo.Previsao);

        var contentInfoWindow = prefixo + cadeirante + previsao;
        setInfoWindow(index + "ln", marker, contentInfoWindow);
        markers.push(marker);
    });
}
function setVeiculo(Veiculo) {
    return new google.maps.Marker({
        position: new google.maps.LatLng(Veiculo.Latitude, Veiculo.Longitude),
        title: Veiculo.Prefixo,
        icon: "../../Images/veiculo_small.png",
        map: map
    });    
}
function setClusterMarkers() {
    markerCluster = new MarkerClusterer(map, markers);
}
function setBounds() {
    latlngbounds = new google.maps.LatLngBounds();
    $.each(markers, function (index, marker) {
        latlngbounds.extend(marker.position);
    });
    map.fitBounds(latlngbounds);
}
function setInfoWindow(Codigo, marker,content) {
    var myOptions = {
        content: content
    };
    infoWindow[Codigo] = new google.maps.InfoWindow(myOptions);
    infoWindow[Codigo].listener = google.maps.event.addListener(marker, 'click', function (e) {
        openInfoWindow(Codigo, marker);
    });
}

function openInfoWindow(Codigo, marker) {
    closeInfoWindowOpened();
    infoWindow[Codigo].open(map, marker);
    idInfoWindowAberto = Codigo;
}
function closeInfoWindowOpened(){
    if (typeof (idInfoWindowAberto) == 'string' && typeof (infoWindow[idInfoWindowAberto]) == 'object') {
        infoWindow[idInfoWindowAberto].close();
    }
}

function realizaTrajeto(Latitude, Longitude) {
    directionsDisplay.setMap(map);
    if (navigator.geolocation)
        navigator.geolocation.getCurrentPosition(function (position) {
            var request = { 
                origin: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                destination: new google.maps.LatLng(Latitude, Longitude),
                travelMode: google.maps.TravelMode.WALKING
            };
            directionsService.route(request, function (result, status) {
                if (status == google.maps.DirectionsStatus.OK)
                    directionsDisplay.setDirections(result);
                else
                    toastr["error"]("Desculpe! Ocorreu um erro ao verificar o seu trajeto!");
            });
        }, function () {
            toastr["error"]("Desculpe! Não foi possivel recuperar a sua localização!");
        });
    else
        toastr["error"]("Desculpe! Seu dispositivo não suporta este tipo de funcionalidade!");
}

function clearMarcadores() {
    for (var i = 0; i < markers.length; i++)
        markers[i].setMap(null);
    markers = [];
}
function clearClusterMarkers() {
    if (markerCluster != null)
        markerCluster.clearMarkers();
}
function clearInfoWindows() {
    idInfoWindowAberto = undefined;
    infoWindow = [];
}
function clearRoutes() {
    if (directionsDisplay != null)
        directionsDisplay.setMap(null);
}
function clearAll() {    
    clearMarcadores();
    clearClusterMarkers();
    clearInfoWindows();
    clearRoutes();
}