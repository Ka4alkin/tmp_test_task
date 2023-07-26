🍎linkToTask: https://docs.google.com/document/d/1sUmnikCRTQyU0jda2jZXD6rPPmOs-veD471m-QijmRY/edit

TO RUN APP IN DEV MOD:

- you should have installed mongoDb
- check it at http://localhost:27017/ must be the next text 'It looks like you are trying to access MongoDB over HTTP on the native driver port.'

- create vandal db: use vandal
- create users collection: db.createCollection('users')

in terminal do next steps

- cd server
- npm install
- npm run dev

- cd ../client
- npm install
- npm run dev

- make .env files at both server and client like at .env.example

also there are insomnia file config at dir server folder

at the end, you can see result at http://127.0.0.1:5173/

main stack ☠️: tailwind css, redux toolkit, express, mongo, react, ts