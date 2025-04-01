import fetch from "node-fetch"; // To fetch alerts from the Alertmanager API
import nodemailer from "nodemailer"; // To send email

// Function to fetch alerts from Alertmanager
async function fetchAlerts() {
  try {
    const response = await fetch("http://127.0.0.1:9093/api/v2/alerts");
    const alerts = await response.json();

    if (alerts.length > 0) {
      console.log("Active Alerts:", alerts);
      sendEmail(alerts); // If alerts exist, send them via email
    } else {
      console.log("No active alerts.");
    }
  } catch (error) {
    console.error("Error fetching alerts:", error);
  }
}

// Function to send alerts to email
function sendEmail(alerts) {
  // Create a transporter for Nodemailer
  let transporter = nodemailer.createTransport({
    service: "gmail", // You can use other services (e.g., Outlook, Yahoo) here
    auth: {
      user: "hotmashmallow@gmail.com", // Your email address
      pass: "emam gezj cnuw yznk", // Your email password or an app-specific password
    },
  });

  // Prepare the email content
  let emailContent = `
        <h1>Active Alerts from Prometheus</h1>
        <ul>
            ${alerts
              .map(
                (alert) => `
                <li>
                    <strong>Alert Name:</strong> ${alert.labels.alertname} <br>
                    <strong>Namespace:</strong> ${alert.labels.namespace} <br>
                    <strong>Service:</strong> ${alert.labels.service} <br>
                    <strong>Summary:</strong> ${alert.annotations.summary} <br>
                    <strong>Started At:</strong> ${alert.startsAt} <br>
                </li>
            `
              )
              .join("")}
        </ul>
    `;

  // Setup email options
  let mailOptions = {
    from: "hotmashmallow@gmail.com", // Sender address
    to: "22024515@vnu.edu.vn", // Receiver address
    subject: "Prometheus Active Alerts", // Subject of the email
    html: emailContent, // HTML body content
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

// Call the fetchAlerts function
fetchAlerts();
