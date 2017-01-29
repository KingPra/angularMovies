(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const app = angular.module('MovieApp', []);


app.controller('ShowMovieController', function ($scope, MovieService) {
    $scope.movies = MovieService.getAll();

    $scope.ratedMovie = function (target, num) {
        MovieService.markAsRated(target, num);
    };

});

app.factory('MovieService', function ($http) {
    const movies = [];

    $http.get('https://api.themoviedb.org/3/discover/movie?page=1&include_video=false&include_adult=false&sort_by=popularity.desc&language=en-US&api_key=aba47490a15aae456352fb8e3152d12e').then(function (response) {

            angular.copy(response.data.results, movies);
    });
    return {
        add(movie) {
            movies.push(movie);
        },
        getAll() {
            return movies;
        },
        markAsRated(fav, num) {
            fav.isRated = true;
            fav.one = true;
            fav.two = true;
            fav.three = true;
            fav.four = true;
            fav.five = true;
            fav.all = true;
            fav.stars = num;
        },
    };
});
},{}]},{},[1]);
