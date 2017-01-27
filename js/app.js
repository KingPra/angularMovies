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