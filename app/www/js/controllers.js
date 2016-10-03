angular.module('starter.controllers', [])

.controller('PrevisaoCtrl', function($scope, $ionicModal, $timeout, previsaoFactory, sessionService) {
    $scope.cidadeSelecionada = "";
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

    $scope.montarDescricaoData = function(){
      var dataAtual = new Date();

      $scope.descricaoDiaAtual = diasSemanaDescricao[dataAtual.getDay()];
      $scope.descricaoMesAtual = descricaoMeses[dataAtual.getMonth()];
      $scope.dataAtual = dataAtual;
    }
    
    $scope.carregarDadosClimaAtual = function(){
      previsaoFactory.consultarPrevisaoTempoCidade($scope.cidadeSelecionada, function(dadosPrevisao){
        $scope.previsoes = dadosPrevisao.list;
      });
      
      previsaoFactory.consultarTemperaturaAtual($scope.cidadeSelecionada, function(dadosPrevisao){
        $scope.temperaturaAtual = dadosPrevisao.main.temp;
        $scope.descricaoClimaAtual = dadosPrevisao.weather[0].description;
      });  
    }

    ionic.Platform.ready(function(){
      var posicaoAtualGps = sessionService.get('cidadeAtual');

      if(posicaoAtualGps == null || posicaoAtualGps === "undefined")
            previsaoFactory.carregarCidadesProximasPosicao(function(data){
              $scope.cidadesBusca = data.list;
              sessionService.set("cidadeAtual", data.list[0].name);
            });

      $scope.cidadeSelecionada = posicaoAtualGps;
      $scope.montarDescricaoData();
      $scope.carregarDadosClimaAtual();
    });
    
})
.controller('LocaisCtrl', function($scope, $ionicModal, $timeout, previsaoFactory, sessionService) {
  $scope.cidadesBusca = [];

  ionic.Platform.ready(function(){
    previsaoFactory.carregarCidadesProximasPosicao(function(data){
        $scope.cidadesBusca = data.list;
        sessionService.set("cidadeAtual", data.list[0].name);
    });
  });
})
