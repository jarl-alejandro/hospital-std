'use strict'

const hospital = angular.module('Hospital', ['ui.router'])

hospital.config(($stateProvider, $urlRouterProvider) => {
	$urlRouterProvider.otherwise('/')

	$stateProvider
		.state('index', {
			url: '/',
			controller: 'homeController',
			templateUrl: 'src/home/home.html'
		})
		.state('paises', {
			url: '/paises',
			controller: 'paisController',
			templateUrl: 'src/paises/paises.html'
		})
})