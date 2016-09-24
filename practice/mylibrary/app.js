 (function() {


   var app = angular.module('MyLibrary', ['ngRoute']);

   app.config(function($routeProvider) {
     $routeProvider.
     when('/', {
       templateUrl: 'login.html',
       controller: 'LoginCtr'
     }).
     when('/bookList/', {
       templateUrl: 'book-list.html',
       controller: 'BookListCtrl'
     }).
     when('/editBook/:index', {
       templateUrl: 'edit-book.html',
       controller: 'EditBookCtrl'
     }).
     when('/addBook', {
       templateUrl: 'add-book.html',
       controller: 'AddBookCtrl'
     }).
     otherwise({
       redirectTo: '/'
     });
   });

   app.run(function($http) {

     // 在第一次运行该 APP 时初始化数据库
     if (localStorage.books === undefined) {
       $http.get('books.json')
         .success(function(data) {
           console.log(JSON.stringify(data));
           localStorage.books = JSON.stringify(data.books);
         });
     }

   });


   app.factory('bookService', function() {

     return {
       verifyPwd: verifyPwd,
       getBooks: getBooks,
       saveBooks: saveBooks
     };

     ////////////////////////////
     function verifyPwd(name, pwd) {
       if (name === 'jesse' && pwd === 'lucky') {
         return true;
       } else {
         return false;
       }
     }

     function getBooks() {
       return JSON.parse(localStorage.books);
     }

     function saveBooks(books) {
       localStorage.books = JSON.stringify(books);
     }
   });

   // index.html
   app.controller('LoginCtr', function($scope, bookService) {
     $scope.name = 'jesse';
     $scope.password = 'lucky'
     $scope.signIn = function() {
       if (bookService.verifyPwd($scope.name, $scope.password)) {
         location.href = "#/bookList";
       } else {
         alert("输入错误,请重新输入!!!");
       }
     };
   });


   // book-list.html
   app.controller('BookListCtrl', function($scope, bookService) {

     $scope.books = bookService.getBooks();

     $scope.addBook = function() {
       location.href = "#/addBook";
     };

     $scope.editBook = function(i) {
       location.href = "#/editBook/" + i;
     }

     $scope.deleteBook = function(index) {
       $scope.books.splice(index, 1);
       bookService.saveBooks($scope.books);
     }

     $scope.exit = function() {
       location.href = "#/";
     }

   });

   // edit-book.html
   app.controller('EditBookCtrl', function($scope, $routeParams, bookService) {

     var books = bookService.getBooks();

     $scope.book = books[$routeParams.index];

     $scope.confirm = function() {
       bookService.saveBooks(books);
       location.href = "#/bookList";
     }

     $scope.cancel = function() {
       location.href = "#/bookList";
     }
   });


   // add-book.html
   app.controller('AddBookCtrl', function($scope, bookService) {

     $scope.book = {
       coding: '',
       bookName: '',
       author: ''
     };

     $scope.confirm = function() {

       var books = bookService.getBooks(),
           len = books.length + 1;

       $scope.book.id = PrefixInteger(len, 3);

       books.push($scope.book);
       bookService.saveBooks(books);
       location.href = "#/bookList";
     }

     $scope.cancel = function() {
       location.href = "#/bookList";
     }

     // 左 n 个 '0'
     function PrefixInteger(num, n) {
       return (Array(n).join(0) + num).slice(-n);
     }

   });

 })();