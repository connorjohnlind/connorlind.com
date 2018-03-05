module.exports = (app) => {
  // send off email (reset form on client side)
  app.post('/api/contact', async (req, res) => {
    console.log('contact');
    res.send({});
  });
};

// app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
//     const { title, subject, body, recipients } = req.body;
//
//     const survey = new Survey({
//       title,
//       subject,
//       body,
//       recipients: recipients.split(',').map(email => ({ email: email.trim() })),
//       _user: req.user.id,
//       dateSent: Date.now(),
//     });
//
//     // send an email
//     const mailer = new Mailer(survey, surveyTemplate(survey));
//
//     try {
//       await mailer.send();
//       await survey.save();
//       req.user.credits -= 1;
//       const user = await req.user.save();
//
//       res.send(user);
//
//     } catch (err) {
//       res.status(422).send(err);
//     }
//   });
