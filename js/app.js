const app = angular.module('MovieApp', []);

app.controller('ShowMovieController', function ($scope, MovieService) {
    $scope.movies = MovieService.getAll();
    $scope.ratedMovie = function (target, num) {
        MovieService.markAsRated(target, num);
    };

      function pushIt ($scope) {
    console.log('push it real good');
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
