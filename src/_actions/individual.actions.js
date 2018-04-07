import {individualService} from "../_services";
import {individualConstants} from "../_constants";
import {alertActions} from "./index";

export const individualActions = {
    registerSSN,
    registerMerchant
};

function registerSSN(username, ssn) {
    return dispatch => {

       individualService.registerSSN(username, ssn).then(
           error => {
               dispatch(failure(error));
               dispatch(alertActions.error(error));
           }
       )
    };
    function failure(error) { return { type: individualConstants.REGISTER_SSN_FAILURE, error } }
}

function registerMerchant(username, merchant, ttl) {
    return dispatch => {

        individualService.registerMerchant(username, merchant, ttl).then(
            error => {
                dispatch(failure(error));
                dispatch(alertActions.error(error));
            }
        )
    };
    function failure(error) { return { type: individualConstants.REGISTER_SSN_FAILURE, error } }
}