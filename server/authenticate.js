export default function validate (json, access) {
    let userID = validateJWT(json);
    if (access !== undefined)
        validateAccess(userID, access);
    return true;
}

function validateJWT (json) {
    let ok = false;
    let userID = "benpr438";
    
    return (ok && userID) || null;
}

function validateAccess (userID, accessBitFields) {

}

const EAUTH  = Object.freeze({
    none: 0,
    exoW: 1,
    exoR: 2,
    exoRW: 3,
    userR: 4,
    userW: 8,
    userRW: 12,
    all: 15 
});

export { validate, EAUTH };
