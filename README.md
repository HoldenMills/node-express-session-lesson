#Express and Session storage

##Objectives
Students will be able to...
- ... describe the purpose of session storage
- ... mount session middleware in the correct order on an express application
- ... store, retrieve, and transform session data on each request

##What do we need session storage for?
We need session storage as a server-side store of client data.

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
First, we're going to mount our session middleware on our express application. For the solution, see branch **mount-middleware**.

Next, we will write some routes that generate, store, and transform session
data.

Finally, we will look into storing our session data in an actual database
using the `connect-mongo` module.

As a bonus, if we blaze through this material in record time, we'll might look
into session hijacking.
