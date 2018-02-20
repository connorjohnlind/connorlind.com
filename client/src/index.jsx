import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import './normalize.css';
import './assets/fonts/Raleway/Raleway.scss';
import './index.scss';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

/** ***NAVIGATION**** */
$(function() {
  const homeBottom = $('nav').position().top;
  const navHeight = $('nav').height();

  function highlightLink(href) {
    const $anchor = $(`a[href="${href}"]`);
    $('.active').removeClass('active');
    $($anchor).addClass('active');
  }

  $(window).scroll(function () {
    const pos = $(this).scrollTop();

    // Fixing Navigation Bar
    if (pos > homeBottom) {
      $('nav').addClass('fixed');
    } else {
      $('nav').removeClass('fixed');
    }

    // Link Hilighting
    if (pos < homeBottom) { highlightLink('#home'); }
    if (pos > $('#about-main').position().top - navHeight) { highlightLink('#about'); }
    if (pos > $('#portfolio-main').position().top - navHeight) { highlightLink('#portfolio'); }
    if (pos > $('#contact-main').position().top - navHeight) { highlightLink('#contact'); }
  });
});
