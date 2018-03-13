import 'babel-polyfill';
import 'particles.js';
import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';

import './index.scss';
import './assets/fonts/Raleway/Raleway.scss';
import favicon from './assets/favicon.ico'; // eslint-disable-line no-unused-vars
import Contact from './components/Contact/Contact';
import reducers from './reducers';

// Particle JS Banner
window.$ = $;
particlesJS.load('particles-js', './config/particles.json'); // eslint-disable-line no-undef
$('hidden').removeClass('hidden');

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, /* preloadedState, */ composeEnhancers(
  applyMiddleware(reduxThunk),
));
/* eslint-enable */

// Redux Form for Contact Section
ReactDOM.render(
  <Provider store={store}><Contact /></Provider>,
  document.getElementById('contact-root'),
);

// jQuery
$(() => {
  // viewportHeight fix for mobile devices
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    const viewportHeight = $(window).innerHeight();
    $('#home').css({ height: viewportHeight });
  }

  const navHeight = $('nav').height();
  let homeBottom = $('#main').position().top;
  let pos = $(window).scrollTop();

  const highlightLink = (href) => {
    const $anchor = $(`a[href="${href}"]`);
    $('.active').removeClass('active');
    $($anchor).addClass('active');
  };

  const scrollThenFixNav = (window) => {
    pos = $(window).scrollTop();

    if (pos > homeBottom) {
      $('nav').addClass('fixed');
    } else {
      $('nav').removeClass('fixed');
    }

    if (pos + $(window).height() === $(document).height()) {
      highlightLink('#contact');
    } else if (pos > $('#contact-main').position().top - navHeight) {
      highlightLink('#contact');
    } else if (pos > $('#portfolio-main').position().top - navHeight) {
      highlightLink('#portfolio');
    } else if (pos > $('#about-main').position().top - navHeight) {
      highlightLink('#about');
    } else if (pos < homeBottom) {
      highlightLink('#home');
    }
  };

  /* eslint-disable func-names, prefer-arrow-callback */
  // jQuery didn't like the ES6 syntax :(
  $(window).resize(function () {
    homeBottom = $('#main').position().top;
  });

  $(window).scroll(function () {
    scrollThenFixNav(this);
  });

  $('#scrollToAbout').click(function () {
    $('html, body').animate({
      scrollTop: $('#about').offset().top,
    }, 1000);
  });

  // if page is reloaded anywhere beyond Home section, call the menu fixer
  scrollThenFixNav(window);
});
