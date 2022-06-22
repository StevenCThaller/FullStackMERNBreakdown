# EXPRESS APP DEEP DIVE

## Contents
This lecture covered a TON. For a basic rundown:
- Express app creation
- Creating custom scripts to run your applications that utilize Node.js
- Running your express application through babel (allows for the same structure of imports and exports as our React applications, which also uses babel)
- Modularization of Express applications
- Using environment variables to hide sensitive information that is necessary to run your applications
- Using pre-built middlware
- Building and using custom middleware

## Modular App Folder Structure

The structure we used in this application is built around the idea that there are at least 2 distinct and separate applications that make up the overall application. These are the [client](/StevenCThaller/FullStackMERNBreakdown/blob/lecture-code/packages/client) and [server](/StevenCThaller/FullStackMERNBreakdown/blob/lecture-code/packages/server) applications.