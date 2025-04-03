# Better Lung
LLM powered medical assistant web application for Non-small cell lung cancer patients.

## Table of Contents

- [Introduction](#introduction)
- [Technologies Used](#technologies-used)
- 📂 [Setup Instructions](#setup-instructions)
- 🔗 [Live Demo]
- [Usage](#usage)
- 🚀 [Contributing](#contributing)
- [License](#license)
- [Style](#style)

🔗 [Live Demo]<br/>
## Setup Instructions
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

```npm install``` to install all up-to-date dependencies of the project defined in package.json<br/>

```npm install --save-dev nodemon``` nodemon will watch the files in the directory in which nodemon was started, and if any files change, nodemon will automatically restart your node application. <br />

We can start our application with nodemon like this: ```node_modules/.bin/nodemon index.js```<br />

```npm run dev``` <br />

cross-origin resource sharing ```npm install cors```<br/>

For Front-end production build ```npm run build```<br/>

```http://localhost:3001/index.html``` to view the Front-end<br/>

Install the Node.js Driver `npm install mongodb@6.15`

## Contributing

Contributions are welcome! Please open an issue or submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Style

Please follow the Google TypeScript Style Guide `https://google.github.io/styleguide/tsguide.html`

