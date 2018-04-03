# Connor Lind's Personal Website

[Connorlind.com](http://www.connorlind.com) is a portfolio site and sandbox for my development as a full-stack Javascript engineer. I will implement new technologies here as I learn them.

This website is built "serverless" with Amazon Web Services.

## Notable Features

### [Redux Form](https://github.com/connorjohnlind/connorlind.com/tree/master/client/src/components/Contact) & [AWS Lambda](https://github.com/connorjohnlind/connorlind.com/blob/master/lambda/index.js)

Send an email with SES and store the result in DynamoDB:

```javascript
// client/actions/index.js

export const postContact = values => async (dispatch) => {
  try {
    // AWS API Gateway endpoint pointing to AWS Lambda function below
    await axios.post('https://hshb0eiukd.execute-api.us-west-2.amazonaws.com/api/contact', values);
    dispatch({ type: CONTACT_SUCCESS });
  } catch (error) {
    dispatch({ type: CONTACT_FAIL, payload: error.response });
  }
};

export const submitForm = values => (dispatch) => {
  dispatch({ type: CONTACT_LOADING });                  // adds a Spinner
  dispatch(postContact(values));
};
```
```javascript
/**** AWS Lambda function ****/

const AWS = require('aws-sdk');
const ses = new AWS.SES({ apiVersion: '2010-12-01' });
const dynamodb = new AWS.DynamoDB({ region: 'us-west-2', apiVersion: '2012-08-10' });

exports.handler = (event, context, callback) => {
	const eParams = {
		Destination: {
			ToAddresses: ['connorjohnlind@gmail.com'],
		},
		Message: {
			Body: {
				Html: {
					Charset: 'UTF-8',
					Data: `From ${event.name} (${event.email}): ${event.message}`,
				},
				Text: {
					Charset: 'UTF-8',
					Data: `From ${event.name} (${event.email}): ${event.message}`,
				},
			},
			Subject: {
				Charset: 'UTF-8',
				Data: 'New contact via connorlind.com',
			},
		},
		Source: 'connorjohnlind@gmail.com',
	};

	const dParams = {
		Item: {
			UserId: {
				S: 'user_' + Math.random(),
			},
			Name: {
				S: event.name,
			},
			Email: {
				S: event.email,
			},
			Message: {
				S: event.message,
			},
		},
		TableName: 'connorlind-contact',
	};

	ses.sendEmail(eParams, function(err, eData) {
		if (err) {
			console.log(err, err.stack); // an error occurred
			callback();
		} else {
			console.log(eData);
			dynamodb.putItem(dParams, function(err, dData) {
				if (err) {
					console.log(err);
					callback();
				} else {
					console.log(dData);
					callback(null, dData);
				}
		  });
		}
	});
};

```
### [jQuery Nav Bar](https://github.com/connorjohnlind/connorlind.com/blob/master/client/src/index.jsx)

Sticky navigation, one of jQuery's strong suits:

```javascript
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
```


### [Particle.js Banner](https://github.com/connorjohnlind/connorlind.com/blob/master/client/src/assets/config/particles.json)
Third-party canvas for the main banner area
