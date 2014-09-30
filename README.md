#tommy-angular-carousel
A simple carousel component for angular

##Installation
1. With Bower :
   - `bower install --save tommy-angular-carousel`

   Or download `tommy-angular-carousel.js` manually

2. include `tommy-angular-carousel.js` after your `angular.js` file

3. adding `tommy-angular-carousel` as a module dependency to your application

##Useage
###Binding
```html
<div tom-carousel
     tom-carousel-items="someController.banners"
     tom-carousel-interval="6000"></div>
```

- tom-carousel-items: array includes objects with at least the `image` property
- tom-carousel-interval: autochange interval
- tom-carousel-duration: transition duration
