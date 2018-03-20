/* eslint-disable */
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
					Data:
						'This message body contains HTML formatting. It can, for example, contain links like this one: <a class="ulink" href="http://docs.aws.amazon.com/ses/latest/DeveloperGuide" target="_blank">Amazon SES Developer Guide</a>.',
				},
				Text: {
					Charset: 'UTF-8',
					Data: 'This is the message body in text format.',
				},
			},
			Subject: {
				Charset: 'UTF-8',
				Data: 'Test email',
			},
		},
		ReplyToAddresses: [],
		ReturnPath: '',
		ReturnPathArn: '',
		Source: 'sender@example.com',
		SourceArn: '',
	};

	const dDarams = {
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
      Date: {
				S: event.date,
			},
		},
		TableName: 'connorlind-contact',
	};

	ses.sendEmail(eParams, function(err, eData) {
		if (err) {
      console.log(err, err.stack); // an error occurred
      callback();
    }
		else {
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
