'use strict';

var app = angular.module("myApp", []);

app.controller("mainController", function($scope, $http, $sce) {
  
  $scope.idArticuloActual = 3069;
  var procesar = true;
  $scope.articulos = [];

  var init = function(){

  }

  $scope.iniciarProceso = function(){

    if(procesar){
      $scope.idArticuloActual++;
      procesarArticulo($scope.idArticuloActual, $scope.iniciarProceso)
    }

  };

  var procesarArticulo = function(idArticulo, onProcesarArticuloFinalizado){

    const url = `http://localhost:3000/articulos?id=${idArticulo}`

    let request = {
      method: 'GET',
      url: url,
    };

    $http(request).then(
      function(resp) {

        if(resp.data.error===false){
          $scope.articulos.push(resp.data.articulo);
        }

        onProcesarArticuloFinalizado();
      
    }, function(resp){
        alert("Se ha producido un error al intentar obtener los datos del articulo "+idArticulo);
    });

  }

});

