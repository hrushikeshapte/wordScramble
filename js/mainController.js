var app = angular.module('wordScramble', ['ngRoute']);

app.controller("mainController", function ($scope, $http) {

    $scope.score = 0;

    $scope.init = function(){
        displayLetters();
    }

    var displayLetters = function(){
    var currentUrl = "http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=false&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";
    var responsePromise = $http.get(currentUrl);

    //ajax call for success
    responsePromise.success(function (response) {
        console.log(response);
        var word = response.word;

        String.prototype.sort = function(){
            var string = this.split("");

            for(var i = string.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var tmp = string[i];
                string[i] = string[j];
                string[j] = tmp;
            }
            return string;

        }

        $scope.scrambled = word.sort();

        $scope.answer = function (){
            var answerText = $(".answer-text").val();

            if(answerText == word){
                alert("Correct Answer");
                $scope.score += 1;
                displayLetters();
            }
            else{
                alert("Incorrect Answer , Please try again");
            }
        }

        $scope.reset = function (){
            $scope.score = 0;
            displayLetters();
        }

    });

    responsePromise.error(function(response){
        alert("Cannot get api response");
    });
   }
});
