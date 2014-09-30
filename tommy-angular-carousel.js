'use strict';

angular.module('tommy-angular-carousel', [])
.directive('carousel', function ($timeout) {
  return {
    scope: {
      items: '=carouselItems',
      interval: '=carouselInterval',
      duration: '=carouselDuration'
    },
    replace: true,
    restrict: 'AE',
    template: '<div>'
            + '<style>'
            + '.Carousel,'
            + '.Carousel-items {'
            + '    position: relative;'
            + '}'
            + '.Carousel-item,'
            + '.Carousel-item img {'
            + '    display: block;'
            + '    margin: 0;'
            + '    padding: 0;'
            + '    border: 0;'
            + '    width: 100%;'
            + '}'
            + '.Carousel-item {'
            + '    position: absolute;'
            + '    opacity: 0;'
            + '    -webkit-transition: opacity 1000ms linear;'
            + '    transition: opacity 1000ms linear;'
            + '}'
            + '.Carousel-item.noTransition,'
            + '.Carousel-item.Carousel-item-active {'
            + '    position: relative;'
            + '    opacity: 1;'
            + '}'
            + '.Carousel-tabs {'
            + '    position: absolute;'
            + '    width: 100%;'
            + '    height: 30px;'
            + '    bottom: 10px;'
            + '    text-align: center;'
            + '}'
            + '.Carousel-tabItem {'
            + '    display: inline-block;'
            + '    width: 10px;'
            + '    height: 10px;'
            + '    border-radius: 5px;'
            + '    margin: 10px;'
            + '    background: #707070;'
            + '    cursor: pointer;'
            + '}'
            + '.Carousel-tabItem.Carousel-tabItem-active {'
            + '    background: #d2b47a;'
            + '    width: 40px;'
            + '}'
            + '</style>'
            + '<div class="Carousel Carousel-custom">'
            + '    <div class="Carousel-items">'
            + '        <a class="Carousel-item"'
            + '           ng-repeat="item in items"'
            + '           ng-class="{'
            + '                       \'Carousel-item-active\': $index==currentIndex && hasTransition,'
            + '                       \'noTransition\': !hasTransition'
            + '                     }"'
            + '           ng-href="{{ item.link }}"'
            + '           target="_blank"'
            + '           title="{{ item.description }}">'
            + '            <img ng-src="{{ item.image }}"'
            + '                 alt="{{ item.title }}">'
            + '        </a>'
            + '    </div>'
            + '    <div class="Carousel-tabs">'
            + '        <a ng-repeat="item in items"'
            + '           class="Carousel-tabItem"'
            + '           ng-class="{\'Carousel-tabItem-active\': $index===currentIndex}"'
            + '           ng-mouseover="go($index)">'
            + '        </a>'
            + '    </div>'
            + '</div>'
            + '</div>',
    controller: function ($scope) {
      var timer;
      var self = $scope;
      var duration = self.duration || 1000;
      self.isPlaying = true;
      self.currentIndex = 0;
      self.hasTransition = 'atob' in window;

      self.go = function (index) {
        if (timer) {
          $timeout.cancel(timer);
        }

        self.currentIndex = index;

        if (self.isPlaying) {
          timer = $timeout(function () {
            self.currentIndex = (self.currentIndex + 1) % self.items.length;
            self.go(self.currentIndex);
          }, self.interval + duration);
        }
      };

      self.pause = function () {
        $timeout.cancel(timer);
        self.isPlaying = false;
      };

      self.play = function () {
        self.isPlaying = true;
        self.go(self.currentIndex);
      };

      self.play();
    },
    link: function ($scope, $element) {
      if (!$scope.hasTransition) {
        $scope.$watch('currentIndex', function (newValue) {
          var items = $($element[0]).find('.Carousel-item');
          items
            .eq(newValue)
            .css('position', 'relative')
            .fadeIn($scope.duration || 1000)
            .siblings()
            .css('position', 'absolute')
            .fadeOut($scope.duration || 1000);
        });
      }
    }
  };
});
