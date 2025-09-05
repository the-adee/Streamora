// this file is maintained to act as entry point that start the server.
// contains server logic not the application logic -> (middlewares, routes)
// easier for testing

import app from "./app.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {

  console.log(`Server is running on PORT: ${PORT}`);
  //   local route to open server '/'
  console.log(`Local: http://localhost:${PORT}/`);
  
});
