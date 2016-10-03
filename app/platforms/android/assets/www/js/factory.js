(function() {
    'use strict';
 
    angular
        .module('tempo-certo-app')
        .factory('previsaoFactory', previsaoFactory);
 
    previsaoFactory.$inject = ['$http'];
 
    function previsaoFactory($http) {
        var service = {
            consultarPrevisaoTempoCidade: consultarPrevisaoTempoCidade,
            consultarTemperaturaAtual: consultarTemperaturaAtual
        };
 
        return service;
 

        function consultarPrevisaoTempoCidade(cidade, callback){
            var urlProximasPrevisoes = "http://api.openweathermap.org/data/2.5/forecast/daily?q="+cidade+"&lang=pt&units=metric&appid=6a4adbcb74022c0ab83015aab189f269";
            
            $http({
              method: 'GET',
              url: urlProximasPrevisoes
            }).then(function successCallback(response) {
               callback(response.data);
            });
        }

        function consultarTemperaturaAtual(cidade, callback){
            var urlApiCondicaoAtual = "http://api.openweathermap.org/data/2.5/weather?q="+cidade+"&units=metric&lang=pt&day=0&appid=6a4adbcb74022c0ab83015aab189f269";

            $http({
              method: 'GET',
              url: urlApiCondicaoAtual
            }).then(function successCallback(response) {
               callback(response.data);
            });
        }

    }

})();