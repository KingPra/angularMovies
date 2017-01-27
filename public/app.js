(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const app = angular.module('MovieApp', []);


//constructor for creating MovieApp
//might need to be moved to service?
// function Movie(title, date, overview, poster) {
//     this.title = title;
//     this.date = date;
//     this.isFavorite = false;
//     //this.image = poster_path;
//     this.overview = overview;
//     this.stars = null;
//     this.poster_path = poster;
//     console.log(this.stars);
//     return this;

// }

app.controller('ShowMovieController', function ($scope, MovieService) {
    $scope.movies = MovieService.getAll();

    $scope.favoriteMovie = function (target, num) {
        MovieService.markAsFavorite(target, num);
    };

});

app.factory('MovieService', function ($http) {
    const movies = [];

    $http.get('https://api.themoviedb.org/3/discover/movie?page=1&include_video=false&include_adult=false&sort_by=popularity.desc&language=en-US&api_key=aba47490a15aae456352fb8e3152d12e').then(function (response) {

        // for (let i = 0; i < response.data.results.length; i++) {
        //     let item = response.data.results;
        //     item[i] = new Movie(item[i].title, item[i].release_date, item[i].overview, item[i].poster_path);
        //     console.log(item[i]);
            angular.copy(response.data.results, movies);
        

    });
    return {
        add(movie) {
            movies.push(movie);
        },
        getAll() {
            return movies;
        },
        markAsFavorite(fav, num) {
            fav.isFavorite = true;
            fav.stars = num;
        },
    };
});
},{}]},{},[1]);
