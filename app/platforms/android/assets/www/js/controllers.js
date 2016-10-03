angular.module('starter.controllers', [])

.controller('PrevisaoCtrl', function($scope, $ionicModal, $timeout, previsaoFactory) {
    $scope.cidadeSelecionada = "São Paulo, BR";
    $scope.temperaturaAtual = "";

    var diasSemanaDescricao = [
      "Domingo",
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado"
    ];

    var descricaoMeses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    var montarDescricaoData = function(){
      var dataAtual = new Date();

      $scope.descricaoDiaAtual = diasSemanaDescricao[dataAtual.getDay()];
      $scope.descricaoMesAtual = descricaoMeses[dataAtual.getMonth()];
      $scope.dataAtual = dataAtual;
    }

    montarDescricaoData();

    previsaoFactory.consultarPrevisaoTempoCidade($scope.cidadeSelecionada, function(dadosPrevisao){
      console.log(dadosPrevisao);
      $scope.previsoes = dadosPrevisao.list;
    });
    
    previsaoFactory.consultarTemperaturaAtual($scope.cidadeSelecionada, function(dadosPrevisao){
      $scope.temperaturaAtual = dadosPrevisao.main.temp;
      $scope.descricaoClimaAtual = dadosPrevisao.weather[0].description;
    });
})
.controller('LocaisCtrl', function($scope, $ionicModal, $timeout, $cordovaGeolocation) {
    $scope.cidadesBusca = [
      "São Paulo, BR"
    ];

    $ionicPlatform.ready(function() {
    cordovaGeolocation.getCurrentPosition(function(position){
        alert(
            'Latitude: '          + position.coords.latitude          + '\n' +
            'Longitude: '         + position.coords.longitude         + '\n' +
            'Altitude: '          + position.coords.altitude          + '\n' +
            'Accuracy: '          + position.coords.accuracy          + '\n' +
            'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
            'Heading: '           + position.coords.heading           + '\n' +
            'Speed: '             + position.coords.speed             + '\n' +
            'Timestamp: '         + position.timestamp                + '\n'
        );
    });
    });


})
