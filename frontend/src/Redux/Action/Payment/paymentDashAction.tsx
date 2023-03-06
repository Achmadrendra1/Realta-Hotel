import PaymentConst from "@/Redux/Constant/Payment/PaymentConst"

export const doTransactionRequest = (payload?: any) => {
    return {
        type: PaymentConst.GET_PAYMENT_HISTORY_DASH,
        payload
    }
}
export const doTransactionRequestSuccess = (payload: any) => {
    return {
        type: PaymentConst.GET_PAYMENT_HISTORY_DASH_SUCCESS,
        payload
    }
}
export const doTransactionRequestFailed = (payload: any) => {
    return {
        type: PaymentConst.GET_PAYMENT_HISTORY_DASH_SUCCESS,
        payload
    }
}

//Bank Request
export const doBankRequest = (payload?: any) => {
    return {
        type: PaymentConst.GET_BANK_REQUEST,
        payload
    }
}
export const doBankRequestSuccess = (payload: any) => {
    return {
        type: PaymentConst.GET_BANK_REQUEST_SUCCESS,
        payload
    }
}
export const doBankRequestFailed = (payload: any) => {
    return {
        type: PaymentConst.GET_BANK_REQUEST_FAILED,
        payload
    }
}

//Bank Add
export const doAddBank = (payload: any) => {
    return {
        type: PaymentConst.ADD_BANK,
        payload
    }
}
export const doAddBankSuccess = (payload: any) => {
    return {
        type: PaymentConst.ADD_BANK_SUCCESS,
        payload
    }
}
export const doAddBankFailed = (payload: any) => {
    return {
        type: PaymentConst.ADD_BANK_FAILED,
        payload
    }
}

//Bank Update
export const doUpdateBank = (payload: any) => {
    return {
        type: PaymentConst.UPDATE_BANK,
        payload
    }
}
export const doUpdateBankSuccess = (payload: any) => {
    return {
        type: PaymentConst.UPDATE_BANK_SUCCESS,
        payload
    }
}
export const doUpdateBankFailed = (payload: any) => {
    return {
        type: PaymentConst.UPDATE_BANK_FAILED,
        payload
    }
}

//Bank Delete
export const doDeleteBank = (payload:any)=>{
    return {
        type : PaymentConst.DELETE_BANK,
        payload
    }
}
export const doDeleteBankSuccess = (payload:any)=>{
    return {
        type : PaymentConst.DELETE_BANK_SUCCESS,
        payload
    }
}
export const doDeleteBankFailed = (payload:any)=>{
    return {
        type : PaymentConst.DELETE_BANK_FAILED,
        payload
    }
}

//Get Payment Gateway
export const doPagaRequest = (payload? :any)=>{
    return {
        type : PaymentConst.GET_PAYMENT_GATEWAY_REQUEST,
        payload
    }
}
export const doPagaRequestSuccess = (payload:any)=>{
    return {
        type : PaymentConst.GET_PAYMENT_GATEWAY_REQUEST_SUCCESS,
        payload
    }
}
export const doPagaRequestFailed = (payload:any)=>{
    return {
        type : PaymentConst.GET_PAYMENT_GATEWAY_REQUEST_FAILED,
        payload
    }
}

//Add Paga
export const doPagaCreate = (payload:any) => {
    return {
        type : PaymentConst.ADD_PAYMENT_GATEWAY,
        payload
    }
}
export const doPagaCreateSuccess = (payload:any) => {
    return {
        type : PaymentConst.ADD_PAYMENT_GATEWAY_SUCCESS,
        payload
    }
}
export const doPagaCreatFailed = (payload:any) => {
    return {
        type : PaymentConst.ADD_PAYMENT_GATEWAY_FAILED,
        payload
    }
}

//Update Paga
export const doPagaUpdate = (payload:any) => {
    return {
        type : PaymentConst.UPDATE_PAYMENT_GATEWAY,
        payload
    }
}
export const doPagaUpdateSuccess = (payload:any) => {
    return {
        type : PaymentConst.UPDATE_PAYMENT_GATEWAY_SUCCESS,
        payload
    }
}
export const doPagaUpdateFailed = (payload:any) => {
    return {
        type : PaymentConst.UPDATE_PAYMENT_GATEWAY_FAILED,
        payload
    }
}

// Delete Paga
export const doPagaDelete = (payload:any) => {
    return {
        type : PaymentConst.DELETE_PAYMENT_GATEWAY,
        payload
    }
}
export const doPagaDeleteSuccess = (payload:any) => {
    return {
        type : PaymentConst.DELETE_PAYMENT_GATEWAY_SUCCESS,
        payload
    }
}
export const doPagaDeleteFailed = (payload:any) => {
    return {
        type : PaymentConst.DELETE_PAYMENT_GATEWAY_FAILED,
        payload
    }
}

//Get User Account
export const doUsacRequest = (payload: any)=>{
    return {
        type : PaymentConst.GET_ACCOUNT_ACTIVE,
        payload
    }
}
export const doUsacRequestSuccess = (payload:any) => {
    return {
        type : PaymentConst.GET_ACCOUNT_ACTIVE_SUCCESS,
        payload
    }
}
export const doUsacRequestFailed = (payload:any) => {
    return {
        type : PaymentConst.GET_ACCOUNT_ACTIVE_FAILED,
        payload
    }
}