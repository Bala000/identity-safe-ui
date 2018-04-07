export const individualService = {
    registerSSN,
    registerMerchant
};

function registerSSN(username, ssn) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, ssn })
    };

    return fetch('/individuals/registerSSN', requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        });
}

function registerMerchant(username, merchant, ttl) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, merchant, ttl })
    };

    return fetch('/individuals/registerMerchant', requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        });
}