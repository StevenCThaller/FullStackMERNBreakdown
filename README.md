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

--- 

## Full Stack Application Structure

The structure we used in this application is built around the idea that there are at least 2 distinct and separate applications that make up the overall application. These are the [client](packages/client) and [server](packages/server) applications.

Some applications, for example, will have a separate server for authentication that may be shared across several other applications. As such, both our `client` and `server` in a folder called `packages`.

Each application (`client` and `server`) have their own scripts and dependencies, but our application root also has its own scripts and dependencies.

#### **package.json**
The `package.json` in the root directory contains scripts and information regarding what's needed for the *overall* execution of the app. Basically, if we run a script out in the root directory, what is needed?

#### **Workspaces**
In `package.json`, you'll notice an array called `workspaces`. We can use `workspaces` within a Node.js application to offload certain functionalities to specific areas in our apps.

```json
{
  ...
  "workspaces": [
    "packages/*"
  ],
  ...
}
```

`packages/*` means that each directory within `packages` is its own Node workspace. If you wanted to install a specific package in the `client` app, you have two options:
1. Navigate into the `client` directory first, then run `npm install <whateverpackages>`
2. With `client` declared a workspace, you can run `npm install <whateverpackages> -w packageName` from the root directory.
   1. Example: From the root directory, running `npm install express -w server` will install `express` to the `server`

**packages/\***
```
.
+-- packages
|   +-- client                
|   |   +-- package.json      npm install <node packages> -w client
|   |   `...                  
|   |
|   `-- server                
|       +-- package.json      npm install <node packages> -w server
|       `...                  
+-- package.json
+-- package-lock.json
+-- .gitignore
+-- README.md

```

## Server Structure
Personally, I am a fan of more modularization over less modularization. I've worked on projects that were so heavily modularized that virtually every function was in its own file.

We don't need to break it down that far though.

### `packages/server`

```
.
+-- server
    +-- config
    |   `-- keys
    |
    +-- controllers
    |   `-- users.controller.js
    |
    +-- middleware
    |   `-- processUserBody.js
    |
    +-- models
    |   // empty for now
    |
    +-- routes
    |   +-- index.js
    |   `-- users.routes.js
    |
    +-- app.js
    `-- database.js
```

This is a solid starting point for a server's folder structure.
### **[server/config](packages/server/config)**
This is really for any and all functionality specific to configuring your server. In this app, we have a single file, [keys.js](packages/server/config/keys.js), that contains information that we may use multiple times throughout our application. It contains the port number of our server, the base API url, and the number of times we'd want to hash our passwords before storing them in the database.

### **[server/controllers](packages/server/controllers)** 
Remember that our Express endpoints are structured as such: `router.[request-method-type]('/endpoint/url', callbackFunctionToRunAtEndpoint)`. We can define those functions directly within the endpoint declaration, but those functions can get lengthy and complicated. In programming, `controllers` are sections of an application that `control` what happens under a given circumstance. Thus, in our `controllers` folder, we'll add the collections of functions, organized by category (i.e. `users.controller.js` contains the functions that primarily pertain to retrieving and/or modifying the `users`, while `posts.controller.js` would contain the functions that pertain to retrieving and/or modifying the `posts` in our application).

### **[server/middleware](packages/server/middleware)**
At our endpoints (and even before that), we might decided that requests should be run through a given function before being accessed by the endpoint callback function. For example, line 15 in [packages/server/app.js](packages/server/app.js): `app.use(express.json())` will run every single request through a function returned by `express.json()`, which results in our endpoints being able to access any `JSON` submitted in the request's body. But sometimes, we need to create our own middleware. That's where the files in this directory come into play.

### **[server/routes](packages/server/routes)** 
We should be pretty familiar with what this does. It directs the requests to different subsets ofendpoints based on portions of the URL. Our Express application should pretty much always follow REST Conventions:

![image](https://www.dropbox.com/s/k7mkxev38ddw1eo/intro-to-restful-routing-rest-routes.png?raw=1)


#### Sample REST Routing Table for This Application
URL Path | HTTP Method | Purpose
--- | --- | --- 
Routes Pertaining to Users -- users.routes.js
/my_api/users | GET | Retrieve all users from database
/my_api/users | POST | Create a new user in the database
/my_api/users/:userId | GET | Retrieve single user from database
/my_api/users/:userId | PUT or PATCH | Update a single user in database
/my_api/users/:userId | DELETE | Delete a single user in database
Routes Pertaining to Posts -- posts.routes.js
/my_api/posts | GET | Retrieve all posts from database
/my_api/posts | POST | Create a new post
/my_api/posts/:userId | GET | Retrieve a single post from database
/my_api/posts/:userId | PUT or PATCH | Update a single user in database
/my_api/posts/:userId | DELETE | Delete a single user in database

