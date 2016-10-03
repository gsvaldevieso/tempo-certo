(function() {
    'use strict';
 
    angular
        .module('tempo-certo-app')
        .factory('previsaoFactory', previsaoFactory)
        .factory('sessionService',['$http',function($http){
            return {
               set:function(key,value){
                  return localStorage.setItem(key,JSON.stringify(value));
               },
               get:function(key){
                 return JSON.parse(localStorage.getItem(key));
               },
               destroy:function(key){
                 return localStorage.removeItem(key);
               },
             };
        }])
 
    previsaoFactory.$inject = ['$http'];
 
    function previsaoFactory($http) {
        var apiKey = "6a4adbcb74022c0ab83015aab189f269";

        var service = {
            consultarPrevisaoTempoCidade: consultarPrevisaoTempoCidade,
            consultarTemperaturaAtual: consultarTemperaturaAtual,
            carregarCidadesProximasPosicao: carregarCidadesProximasPosicao
        };
 
        return service;

        function consultarPrevisaoTempoCidade(cidade, callback){
            var urlProximasPrevisoes = "http://api.openweathermap.org/data/2.5/forecast/daily?q="+cidade+"&lang=pt&units=metric&appid=" + apiKey;
            
            $http({
              method: 'GET',
              url: urlProximasPrevisoes
            }).then(function successCallback(response) {
               callback(response.data);
            });
        }

        function consultarTemperaturaAtual(cidade, callback){
            var urlApiCondicaoAtual = "http://api.openweathermap.org/data/2.5/weather?q="+cidade+"&units=metric&lang=pt&day=0&appid="+ apiKey;

            $http({
              method: 'GET',
              url: urlApiCondicaoAtual
            }).then(function successCallback(response) {
               callback(response.data);
            });
        }

        function localizarCidadePorLatitudeLongitude(latitude, longitude, callback){
           var urlLatitudeLongitude =  "http://api.openweathermap.org/data/2.5/find?lat="+latitude+"&lon="+longitude+"&cnt=10&appid="+ apiKey;

           $http({
             method: 'GET',
             url: urlLatitudeLongitude
           }).then(function successCallback(response) {
              callback(response.data);
           });
        }

        function carregarCidadesProximasPosicao(callback){
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position){
                    localizarCidadePorLatitudeLongitude(position.coords.latitude, position.coords.longitude, callback);
                }, null);
            }
            else {
                console.log('Geolocation is not supported by this browser.');
            }
        }
    }
})();