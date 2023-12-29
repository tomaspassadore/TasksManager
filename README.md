# Tasks Manager
## https://tasks-manager-xyz.vercel.app
### Technologies

![](https://img.shields.io/badge/node_js-gray?style=for-the-badge&logo=node.js) ![](https://img.shields.io/badge/express-gray?style=for-the-badge&logo=express)  ![](https://img.shields.io/badge/mongo_db-gray?style=for-the-badge&logo=mongodb)  ![](https://img.shields.io/badge/react-gray?style=for-the-badge&logo=react)   ![](https://img.shields.io/badge/JAVASCRIPT-gray?style=for-the-badge&logo=javascript) ![](https://img.shields.io/badge/tailwind_css-gray?style=for-the-badge&logo=tailwindcss) ![](https://img.shields.io/badge/Styled--components-gray?style=for-the-badge&logo=styled-components)

![](./github-images/banner-1.jpg)
![](./github-images/banner-2.jpg)

## Try it on localhost
### 1. Install the dependencies
```
npm install 
```
### 2. Add the first file .env
In the `api` folder create a file called .env with the following variables. Replace each value of the variables.

**NOTE**: You will need an account in [Atlas MongoDB](https://www.mongodb.com/es/atlas/database) service, and connect a new project or any existing through the string connection.
```
PORT = <PORT>
DB_URL = <Your_MongoDB_Atlas_String_Connection>
TOKEN_SECRET = <TOKEN_SECRET>
FRONTEND_URL = 'http://localhost:5173'
```
*Note*: By default vite uses port 5173.
### 3. Add the other file .env
In the `client` folder create a file called .env with the following variable. Replace the `PORT` value with the one you used in the previous step.
```
VITE_BACKEND_URL = 'http://localhost:<PORT>'
```
### 4. Run the API
Open a new terminal and inside of `api` folder run `npm run dev`
### 5. Run the client
Open another terminal and inside of `client` folder run `npm run dev`. Later open http://localhost:5173 in your browser to view the app running
