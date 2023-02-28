import PaymentConst from "@/Redux/Constant/Payment/PaymentConst"

export const doCreateAccount = (payload: any) => {
    return {
        type: PaymentConst.CREATE_ACCOUNT,
        payload
    }
}
export const doCreateAccountSuccess = (payload: any) => {
    return {
        type: PaymentConst.CREATE_ACCOUNT_SUCCESS,
        payload
    }
}
export const doCreateAccountFailed = (payload: any) => {
    return {
        type: PaymentConst.CREATE_ACCOUNT_FAILED,
        payload
    }
}

export const doDeleteAccount = (payload: any) => {
    return {
        type: PaymentConst.DELETE_ACCOUNT,
        payload
    }
}

export const doDeleteAccountSuccess = (payload: any) => {
    return {
        type : PaymentConst.DELETE_ACCOUNT_SUCCESS,
        payload
    }
}

export const doDeleteAccountFailed = (payload: any) => {
    return {
        type : PaymentConst.DELETE_ACCOUNT_FAILED,
        payload
    }
}

export const doCheckSecureCode = (payload: any) => {
    return {
        type : PaymentConst.CHECK_SECURE_CODE,
        payload
    }
}

export const doCheckSecureCodeSuccess = (payload: any) => {
    return {
        type : PaymentConst.CHECK_SECURE_CODE_SUCCESS,
        payload
    }
}

export const doCheckSecureCodeFailed = (payload : any) => {
    return {
        type : PaymentConst.CHECK_SECURE_CODE_FAILED,
        payload
    }
}

export const doTopUp = (payload: any) => {
    return {
        type : PaymentConst.TOP_UP_WALLET,
        payload
    }
}

export const doTopUpSuccess = (payload: any) => {
    return {
        type : PaymentConst.TOP_UP_WALLET_SUCCESS,
        payload
    }
}

export const doTopUpFailed = (payload : any) => {
    return {
        type : PaymentConst.TOP_UP_WALLET_FAILED,
        payload
    }
}

export const doGetHistory = () => {
    return {
        type : PaymentConst.GET_HISTORY_PAYMENT
    }
}
export const doGetHistorySuccess = (payload:any) => {
    return {
        type : PaymentConst.GET_HISTORY_PAYMENT_SUCCESS,
        payload
    }
}
export const doGetHistoryFailed = (payload:any) => {
    return {
        type : PaymentConst.GET_HISTORY_PAYMENT_FAILED,
        payload
    }
}