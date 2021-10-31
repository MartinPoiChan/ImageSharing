class StandardResponse {
    /**
     * Always use this object when sending a response to the user
     * @constructor
     * @param {string} pResult - 0:error 1:success
     * @param {string} pData - Any data for the front end to use.
     * @param {string} pProgrammerMessage - A message for the programmer ('The instance on node 152 has lost contact').
     * @param {string} pFrontEndMessage - A message for the front end user ('The service has lost its internet connection').
    */
    constructor(pResult, pData, pProgrammerMessage, pFrontEndMessage) {
        if (pResult == 0) this.result = 'error';
        if (pResult == 1) this.result = 'success';
        this.data = pData;
        this.programmerMessage = pProgrammerMessage;
        this.frontEndMessage = pFrontEndMessage;
    }
}

module.exports = {
    StandardResponse
}