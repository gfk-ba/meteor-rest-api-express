meteor-rest-api-express
====================

## Install:

```
meteor add gfk:rest-api-express
```


## Use:
```

function auth1 (params, body, header) {
    if (body.apiKey) {
        return checkApiKey(body.apiKey);
    } else {
        return false;
    }
}

restapi = new RestApi(undefined, auth1, console);

// code to run on server at startup
restapi.add('/car/:carId', {
    'get': function (params) {
        return getStuff(params.carId);
    },
    'post': function (params, body) {
        return updateStuff(params.carId, body)
    }
});
```

## Advanced use example

Because connect is awesome you can even have multiple instances of the rest-api package without breaking anything.
This could be handy when you have different endpoints with different methods of authenticating.

```
function auth1 (params, body, header) {
    if (header.Authorization) {
        return checkBasicAuth(header.Authorization);
    } else {
        return false; //No auth Authorization sent
    }
}

function auth2 (params, body, header) {
    if (body.apiKey) {
        return checkApiKey(body.apiKey);
    } else {
        return false;
    }
}

restapi = new RestApi(undefined, auth1, console);
restapi2 = new RestApi(undefined, auth2, console);

Meteor.startup(function () {
    var Future = Npm.require('fibers/future');

    // code to run on server at startup
    restapi.add('/123/:variable', {
        'get': function (params) {
            var future = new Future();

            setTimeout(function () {
                future.return({
                    foo: 'bar1234 ' + params.variable
                });
            }, 5000);

            return future.wait();
        },
        'post': function (params, body) {
            console.log(params);
            console.log(body);
            return {
                foopost: 'bar1234 ' + params.variable
            };
        }
    });

    restapi2.add('/sample/:variable', {
        'get': function (params) {
            var future = new Future();

            setTimeout(function () {
                future.return({
                    foo: 'bar1234 ' + params.variable
                });
            }, 200);

            return future.wait();
        },
        'post': function (params, body) {
            return {
                foopost: 'bar1234 ' + params.variable
            };
        }
    });
});
```

## API Docs

## RestApi(settings, authenticationHandler, [logger=console])

Wrapper for connect middleware

### Params:

* **Object** *settings* Settings to use for setting up this rest-api
* **Function** *authenticationHandler* The authenticationHandler that will be first called on overy request
* **Object** *[logger=console]* The logger to use

## handleError(err, req, res)

Handles connect errors

### Params:

* **Object** *err* The connect error object
* **Object** *req* The connect request object
* **Object** *res* The connect response object

## add(url, handlers, [get=undefined], [post=undefined], [put=undefined], [delete=undefined])

Adds a route for a rest request.

Note: handlers should return a json object which will in turn be put in the response.

### Params:

* **String** *url* The url for which to add a router for example /123
* **Object** *handlers* The object with handlers for the different request types('get', 'post', 'put', 'delete')
* **Function** *[get=undefined]* The handler to call when there's a get request for the route
* **Function** *[post=undefined]* The handler to call when there's a post request for the route
* **Function** *[put=undefined]* The handler to call when there's a put request for the route
* **Function** *[delete=undefined]* The handler to call when there's a delete request for the route

## defaultSettings

The default settings to be used for the rest-api instance
