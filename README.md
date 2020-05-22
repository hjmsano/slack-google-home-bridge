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
-e "SLACK_CLIENT_ID=123498762048" \
-e "SLACK_CLIENT_SECRET=a1a12345a22a1a0c98765e22a256e123" \
-e "SLACK_CLIENT_SIGNING_SECRET=a512a6ab2048009642a9e1239c123456" \
-e "SLACK_TOKEN=abab-123456987654-1234556789012-AABCEf1abcdefgH12a9876" \
-e "BRIDGE_URL=http://localhost:8080/" \
--restart=on-failure
slack-google-home-bridge
```

### Local

- Specify environment variables (or create `.env` file based on the template)
- Then, run the following two commands.

```sh
yarn install
yarn start
```

## Variables

### Environment Variables

All of these environment variables are required.

|Variable|Sample|Note|
|:----|:----|:----|
|SLACK_CLIENT_ID|`123498762048.54321567890123`|Slack Client ID|
|SLACK_CLIENT_SECRET|`a1a12345a22a1a0c98765e22a256e123`|Slack Client Secret|
|SLACK_CLIENT_SIGNING_SECRET|`a512a6ab2048009642a9e1239c123456`|Slack Client Signing Secret|
|SLACK_TOKEN|`abab-123456987654-1234556789012-AABCEf1abcdefgH12a9876`|Slack Bot User OAuth Access Token|
|BRIDGE_URL|`http://localhost:8080/`|An endpoint URL of Google Home - Amazon Polly bridge|

## Usage
- Just send a message to the Slack channels you specified in `device-settings.json`
- To customize rules for handling incoming messages, or to modify messages before transmit to Google Home, edit codes inside `controller.hears()` method in `index.js`.
