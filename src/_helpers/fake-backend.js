// array in local storage for registered users
let users = JSON.parse(localStorage.getItem('users')) || [];
    
export function configureFakeBackend() {
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            //setTimeout(() => {

                // authenticate
                if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
                    // get parameters from post request
                    //console.log(opts.body)
                    let user = JSON.parse(opts.body);
                    console.log(user);
                    $.ajax({
                        type: 'POST',
                        url: 'http://localhost:8080/login',
                        contentType: 'application/json',
                        data: opts.body,
                        success: function () {
                            user.token= 'fake-jwt-token'
                            resolve({ ok: true, json: () => user });
                        }.bind(this),
                        error: function () {
                            reject('Unauthorised');
                        }.bind(this)
                    });

                    return
                }

                // get users
                if (url.endsWith('/users') && opts.method === 'GET') {
                    // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                        resolve({ ok: true, json: () => users });
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }

                    return;
                }

                // get user by id
                if (url.match(/\/users\/\d+$/) && opts.method === 'GET') {
                    // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                        // find user by id in users array
                        let urlParts = url.split('/');
                        let id = parseInt(urlParts[urlParts.length - 1]);
                        let matchedUsers = users.filter(user => { return user.id === id; });
                        let user = matchedUsers.length ? matchedUsers[0] : null;

                        // respond 200 OK with user
                        resolve({ ok: true, json: () => user});
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }

                    return;
                }

                // register user
                if (url.endsWith('/users/register') && opts.method === 'POST') {
                    // get new user object from post body

                    $.ajax({
                        type: 'POST',
                        url: 'http://localhost:8080/register',
                        contentType: 'application/json',
                        data: opts.body,
                        success: function () {
                            resolve({ok: true, json: () => ({})});
                        }.bind(this),
                        error: function () {
                            reject('Unauthorised');
                        }.bind(this)
                    });

                    return
                    // respond 200 OK

                }

                // delete user
                if (url.match(/\/users\/\d+$/) && opts.method === 'DELETE') {
                    // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                        // find user by id in users array
                        let urlParts = url.split('/');
                        let id = parseInt(urlParts[urlParts.length - 1]);
                        for (let i = 0; i < users.length; i++) {
                            let user = users[i];
                            if (user.id === id) {
                                // delete user
                                users.splice(i, 1);
                                localStorage.setItem('users', JSON.stringify(users));
                                break;
                            }
                        }

                        // respond 200 OK
                        resolve({ ok: true, json: () => ({}) });
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }

                    return;
                }


            if (url.endsWith('/individuals/registerSSN') && opts.method === 'POST') {
                // get parameters from post request
                console.log(opts.body)
                $.ajax({
                    type: 'POST',
                    url: 'http://localhost:8080/individuals/registerSSN',
                    contentType: 'application/json',
                    data: opts.body,
                    success: function () {
                        resolve({ok: true, json: () => ({})});
                    }.bind(this),
                    error: function () {
                        reject('Unauthorised');
                    }.bind(this)
                });

                return
            }

            if (url.endsWith('/individuals/registerMerchant') && opts.method === 'POST') {
                // get parameters from post request
                console.log(opts.body)
                $.ajax({
                    type: 'POST',
                    url: 'http://localhost:8080/individuals/registerMerchant',
                    contentType: 'application/json',
                    data: opts.body,
                    success: function () {
                        resolve({ok: true, json: () => ({})});
                    }.bind(this),
                    error: function () {
                        reject('Unauthorised');
                    }.bind(this)
                });

                return
            }

                // pass through any requests not handled above
                realFetch(url, opts).then(response => resolve(response));

            //}, 500);
        });
    }
}