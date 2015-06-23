var app = angular.module('wordScramble', ['ngRoute']);

// Controller
app.controller("mainController", function ($scope, $http) {

    $scope.score = 0;   //score variable

    //initialization function
    $scope.init = function () {
        displayLetters();
    };

    // function which gets json data from wordnik
    var displayLetters = function () {
        var currentUrl = "http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=true&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=3&maxLength=6&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";
        var responsePromise = $http.get(currentUrl);

        //ajax call for success
        responsePromise.success(function (response) {
            console.log(response);
            var word = response.word;

            // sort function to scramble letters
            String.prototype.sort = function () {
                var string = this.split("");

                for (var i = string.length - 1; i > 0; i--) {
                    var j = Math.floor(Math.random() * (i + 1));
                    var tmp = string[i];
                    string[i] = string[j];
                    string[j] = tmp;
                }
                return string;

            };

            //setting scope varible to new scrambled array
            $scope.scrambled = word.sort();

            //function to check if answer is an anagram of the original answer
            var anagram = function (string1, string2) {
                var y = string1.split("").sort().join(""),
                    z = string2.split("").sort().join("");
                if (z === y) {
                    return true;
                }

                else {
                    return false;
                }
            };

            $scope.answer = function () {
                var answerText = $(".answer-text").val();       //getting input value of user
                var checkAnagram = anagram(answerText, word);    //checking for anagram
                if (answerText == word || checkAnagram == true) {
                    alert("Correct Answer");    //if condition is satisfied , increase score and display new letters
                    $scope.score += 1;
                    displayLetters();
                }
                else {
                    alert("Incorrect Answer , Please try again");
                }
            };

            // setting score to 0 and re-starting game
            $scope.reset = function () {
                $scope.score = 0;
                displayLetters();
            }

        });

        // Error Function if json data cannot be fetched from URL
        responsePromise.error(function (response) {
            alert("Cannot get api response");
        });
    }
});
