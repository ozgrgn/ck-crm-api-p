import fs from "fs";
import readline from "readline";
import { google } from "googleapis";
const SCOPES = ["https://www.googleapis.com/auth/calendar"];
const TOKEN_PATH = "credentials.json";

// Load client secrets from a local file.
const run = () => {
  try {
    const content = fs.readFileSync("client_secret.json");
    authorize(JSON.parse(content), insertEvents);
  } catch (err) {
    return console.log("Error loading client secret file:", err);
  }
};

run();

function authorize(credentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  let token = {};
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  // Check if we have previously stored a token.
  try {
    console.log("read token?");
    token = fs.readFileSync(TOKEN_PATH);
    console.log(token, "read token");
  } catch (err) {
    console.log("catch");
    return getAccessToken(oAuth2Client, callback);
  }
  oAuth2Client.setCredentials(JSON.parse(token));
  callback(oAuth2Client);
}

function getAccessToken(oAuth2Client, callback) {
  console.log("get access");
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  console.log("Authorize this app by visiting this url:", authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Enter the code from that page here: ", (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return callback(err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      try {
        fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
        console.log("Token stored to", TOKEN_PATH);
      } catch (err) {
        console.error(err);
      }
      callback(oAuth2Client);
    });
  });
}

function insertEvents(auth) {
  const calendar = google.calendar({ version: "v3", auth });
  var event = {
    summary: "Google I/O 2019",
    location: "800 Howard St.",
    description: "A chance to hear more.",
    start: {
      dateTime: "2019-11-28T09:00:00-07:00",
      timeZone: "America/Los_Angeles",
    },
    end: {
      dateTime: "2019-11-28T10:00:00-07:00",
      timeZone: "America/Los_Angeles",
    },
    recurrence: ["RRULE:FREQ=DAILY;COUNT=2"],
    attendees: [{ email: "lpage@example.com" }, { email: "sbrin@example.com" }],
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 24 * 60 },
        { method: "popup", minutes: 10 },
      ],
    },
  };

  calendar.events.insert(
    {
      auth: auth,
      calendarId: "primary",
      resource: event,
    },
    function (err, event) {
      if (err) {
        console.log(
          "There was an error contacting the Calendar service: " + err
        );
        return;
      }
      console.log("Event created: %s", event.data.htmlLink);
    }
  );
}
