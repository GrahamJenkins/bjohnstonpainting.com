const headers = {
  "Access-Control-Allow-Origin" : "*", // better change this for production
  "Access-Control-Allow-Methods": "POST",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};
exports.handler = function(event, context, callback) {
  // only allow POST requests
  if (event.httpMethod !== "POST") {
    return callback(null, {
      statusCode: 410,
      headers,
      body: JSON.stringify({
        message: 'Only POST requests allowed.',
      }),
    });
  }

  // parse the body to JSON so we can use it in JS
  const payload = JSON.parse(event.body);

  // Fields: name, email, phone, address, service, time, reason, message
  // validate the form
  if (
    !payload.name ||
    !payload.email ||
    !payload.phone
  ) {
    return callback(null, {
      statusCode: 422,
      headers,
      body: JSON.stringify({
        message: 'Contact information incomplete!',
      }),
    });
  }

  // set up email
  const nodemailer = require('nodemailer');
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD
    }
  });
  transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: process.env.SMTP_TO,
    subject: "Contact Received: " + payload.name,
    html: `<h4>Contact from your web site</h4>
    <strong>Name</strong>: ${payload.name}<br />
    <strong>Email</strong>: ${payload.email}<br />
    <strong>Phone</strong>: ${payload.phone}<br />
    <strong>Address</strong>: ${payload.address}<br />
    <strong>Service</strong>: ${payload.service}<br />
    <strong>Time</strong>: ${payload.time}<br />
    <strong>Reason</strong>: ${payload.reason}<br />
    <strong>Message</strong><br />
    ${payload.message}
    `,
  // Fields: name, email, phone, address, service, time, reason, message
  })
  return callback(null, {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      message: "Message sent successfully!",
      url: "/confirm"
    }),
  });
}