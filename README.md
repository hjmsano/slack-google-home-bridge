# Slack -> Google Home bridge

## Background
I wanted to listen notifications arrived in Slack channels through Google Home.

## What is this?
This is a minimum capability of Slack bot to transmit messages in the specific channel to [Google Home - Amazon Polly bridge](https://github.com/hjmsano/google-home-amazon-polly-bridge).

## Pre-requirements
1. [Google Home - Amazon Polly bridge](https://github.com/hjmsano/google-home-amazon-polly-bridge) must be running.
2. A Slack Bot API Token for your organization.

## Setup

- Create `device-settings.json` file. (you can copy `device-settings.sample.json` and modify few lines.)
    - A key is a Slack channel ID.
    - A value is a map object with `device`, `voice`, `lang`, `type`. See the Google Home - Amazon Polly bridge doc for more details.

### Docker

- Build a Docker image.
- Run the image with environment variables.

```sh
docker build -t slack-google-home-bridge .
docker run --net=host \
-e "SLACK_TOKEN=abcdefg1234567890xyz" \
-e "BRIDGE_URL=http://localhost:8080/" \
--restart=on-failure
slack-google-home-bridge
```

### Local

- Specify environment variables (or create `.env` file based on the template)
- Then, run the following two commands.

```sh
npm install
npm start
```

## Variables

### Environment Variables

All of these environment variables are required.

|Variable|Sample|Note|
|:----|:----|:----|
|SLACK_TOKEN|`abcdefg1234567890xyz`|Slack Bot APU Token|
|BRIDGE_URL|`http://localhost:8080/`|An endpoint URL of Google Home - Amazon Polly bridge|

## Usage
- Just send a message to the Slack channels you specified in `device-settings.json`
- To customize rules for handling incoming messages, or to modify messages before transmit to Google Home, edit codes inside `controller.hears()` method in `index.js`.