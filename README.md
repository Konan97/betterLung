# repo-exercise
If you clone the project, run the command ```npm install``` before starting the application with ```npm run dev```.<br />
<br />

You can install a JSON server globally on your machine using the command ```npm install -g json-server```.<br />
However, a global installation is not necessary. From the root directory of your app, we can run the json-server using the command npx:

```npx json-server --port 3001 --watch db.json``` To start a json server
<br />

```json-server --port 3001 --watch db.json``` The --watch option automatically looks for any saved changes to db.json.<br />
```npm install axios``` using the axios library instead for communication between the browser and server.
<br />

```node index.js``` or ```npm start``` to run the ```index.js``` program at root of the project
<br />

```npm install express``` Express library to ease server-side development with Node
<br />

```npm install``` to install all up-to-date dependencies of the project defined in package.json
<br />
For backend, if we make changes to the application's code we have to restart the application to see the changes. 
<br />

```npm install --save-dev nodemon``` nodemon will watch the files in the directory in which nodemon was started, and if any files change, nodemon will automatically restart your node application. <br />

We can start our application with nodemon like this: ```node_modules/.bin/nodemon index.js```<br />

```{
  // ..
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  // ..
}```
We can now start the server in development mode with the command: <br/>

```npm run dev```

<br />

cross-origin resource sharing ```npm install cors```

