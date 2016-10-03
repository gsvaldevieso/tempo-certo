(function () {

    // Criando o módulo de controllers
    angular.module('previsao.controller', []);

    angular.module('previsao.controller')
    .controller('PrevisaoController', PrevisaoController);

    // Injetando as dependencias
    PrevisaoController.$inject = ['$scope', '$http', 'previsao'];

    // Criando a função do controller
    function PrevisaoController($scope, $http, previsao) {

    }

}());