var app = angular.module('wordScramble', ['ngRoute']);

app.controller("mainController", function ($scope, $http) {

    $scope.scrambled = "";

    var currentUrl = "http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=false&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";
    var responsePromise = $http.get(currentUrl);

    //ajax call for success
    responsePromise.success(function (response) {
        console.log(response);
        var word = response.word;
        $scope.scrambled = word.split('').sort(function(){return 0.5-Math.random()}).join('');

        $scope.answer = function (){
            var answerText = $(".answer-text").val();
  
            if(answerText == word){
                alert("Correct Answer");
            }
            else{
                alert("Incorrect Answer");
            }
        }

    });

    responsePromise.error(function(response){
        alert("Cannot get api response");
    });
});
