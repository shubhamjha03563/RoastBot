# Roast Bot

A facebook messenger bot that can roast you sometimes. Please don't feel bad because it probably doesn't care.

## Requirements

1. You must have a facebook page. When you message your page, the bot will reply.
2. You must setup facebook messenger. (Refer to https://bottender.js.org/docs/channel-messenger-setup)
3. Use this format of callback url during messenger setup - 'your-ngrok-url/webhooks/messenger'. Something like this - https://2402-267-395d-2169-a332.in.ngrok.io/webhooks/messenger
4. You must setup ngrok. (Refer to 'NGROK Setup' given below)
5. The bot will work for your account only. If you want it to interact with other users, you can add any facebook user as a tester in your app. This can be done in your facebook developer app profile inside [ Roles -> Roles -> Testers ].

## Usage

1. Open ".env" file and update the values/ settings to your own facebook credentials.
2. Open "/api/.env" and provide database credentials.  
3. Install the dependencies (Refer to 'Install Dependencies' given below)
4. Start the app (Refer to 'Run App' given below)
5. You are good to go and now you can message your bot by visiting your page and clicking on the message button.

## Install Dependencies

1. First navigate to the project folder in a new terminal.
2. Then type these commands:
```
npm install
cd api
npm install
```

## Run App

1. First navigate to the project folder in a new terminal.
2. Then type these commands:
```
npm start
```
3. Again navigate to the project folder in a new terminal (Don't close the previous one).
4. Then type these commands:
```
cd api
npm start
```

## Messaging

1. Click on Get Started and give the answers accordingly.
2. If you want to restart the conversation, send hi or Hi.

## NGROK Setup

1. Download the ngrok zip file.
2. Unzip the folder.
3. This will open a terminal.
4. Type this command in the terminal:
```
ngrok.exe http 5000
```
5. A url will be displayed inside the terminal. Something like this - http://127.0.0.1:4040 
6. Open the url, and click on the link given on the webpage. Something like this - https://2402-e280-2146-a6d-2ad9.in.ngrok.io

# API endpoints

1. `localhost:3000/messages` that list all messages received from users
2. `localhost:3000/messages/:id` to view single message by its ID
3. `localhost:3000/summary` to view this data exact data
  ```
  [
   { user: <user_id>, name: <user_name>, messages: [<list_of_users_messages>] },
   { user: <user_id>, name: <user_name>, messages: [<list_of_users_messages>] }
  ]
  ```
