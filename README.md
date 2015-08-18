#Express and Sessions

##Objectives
Students will be able to...
- ... describe the purpose of session storage
- ... mount session middleware in the correct order on an express application
- ... store, retrieve, and transform session data on each request

##What do we need sessions for?
We need sessions as a server-side store of client data.

Specifically, we use it to store data that doesn't need long-term persistence,
but will likely be used again, potentially for the last time, when the same
client makes another HTTP request. We call such data **session data**.

###When would we need to do that?
A highly common use case is user authentication. Rather than requiring the
user to authenticate on a per-request basis, we store their login as session
data and associate it with a session secret, which we then send to the client
as a cookie.

The client then echoes this secret in a `cookie` header on each following HTTP
request, allowing our application to keep the state of their session.

##First things first
Fork and clone this repo, `cd` into the repo's root directory, and run the
following commands:

###Install dependencies
First, install the dependencies already in your `package.json`:
```bash
$ npm install
```

Next, install the centerpiece of this lesson, the `express-session` module:
```bash
$ npm install express-session --save
```

##Code-along
First, we're going to mount our session middleware on our express application. For the solution, see branch **mount-session**.

Next, we will look into storing our session data in an actual database
using the `connect-mongo` module. For the solution, see branch
**mongo-storage**.

Finally, we will write some routes that generate, store, and transform session
data.

As a bonus, if we blaze through this material in record time, we'll might look
into session hijacking.

##Lab
Get into your project groups and create a fresh file in your `routes` directory.

```bash
$ cd routes
$ touch lab.js
```

Write a module to build and export a `Router`. Use `routes/index.js` as a reference if necessary.

The `Router` must have at least one of the following types of routes:

- a GET route that reads session data and sends it in a response
- a DELETE route that destroys a session data attribute
- a route that transforms session data somehow. By *transform*, I mean change
in some way.

Reach:

- attach a middleware to your `Router` that runs before any of your route
handlers. It should increment a counter variable in the user's session, or
initialize the counter if it does not already exist.

##Demo
Session hijacking, if there is time.
