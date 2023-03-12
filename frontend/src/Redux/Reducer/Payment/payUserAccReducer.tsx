import PaymentConst from "@/Redux/Constant/Payment/PaymentConst";

const initialState = {
  account: [],
  error: null,
  messages: null,
  validate: null,
};

function payUserAccReducer(state = initialState, action: any) {
  switch (action.type) {
    case PaymentConst.GET_ACCOUNT_ACTIVE:
      return { ...state };
    case PaymentConst.GET_ACCOUNT_ACTIVE_SUCCESS:
      return { ...state, account: action.payload };
    case PaymentConst.CREATE_ACCOUNT:
      return { ...state };
    case PaymentConst.CREATE_ACCOUNT_SUCCESS:
      return { ...state, account: action.payload };
    case PaymentConst.CREATE_ACCOUNT_FAILED:
      return { ...state, error: action.payload };
    case PaymentConst.DELETE_ACCOUNT:
      return { ...state };
    case PaymentConst.DELETE_ACCOUNT_SUCCESS:
      return {
        ...state,
        account: state.account.filter(
          (items: any) => items.usacAccountNumber !== action.payload
        ),
      };
    case PaymentConst.CHECK_SECURE_CODE:
      return { ...state };
    case PaymentConst.CHECK_SECURE_CODE_SUCCESS:
      return {
        ...state,
        messages: action.payload.message,
        validate: action.payload.status,
      };
    case PaymentConst.CHECK_SECURE_CODE_FAILED:
      return {
        ...state,
        messages: action.payload.message,
        validate: action.payload.status,
      };
    case PaymentConst.UPDATE_SECURE_CODE:
      return {...state}
    case PaymentConst.UPDATE_SECURE_CODE_SUCCESS:
      return {...state, messages : action.payload.message, validate: action.payload.status}
    case PaymentConst.TOP_UP_WALLET:
      return { ...state };
    case PaymentConst.TOP_UP_WALLET_SUCCESS:
      state.account.splice(
        state.account.findIndex(
          (i: any) =>
            i.usacAccountNumber == action.payload.data.usacAccountNumber
        ),
        1,
        action.payload.data
      );
      return {
        ...state,
        account: [...state.account],
        messages: action.payload.message,
        validate: action.payload.status,
      };
    case PaymentConst.TOP_UP_WALLET_FAILED:
      return { ...state, message: action.payload };
    case PaymentConst.CREATE_TRANSACTION:
      return { ...state };
    case PaymentConst.CREATE_TRANSACTION_SUCCESS:
      return {
        ...state,
        messages: action.payload.message,
        validate: action.payload.status,
      };
    default:
      return state;
  }
}

export default payUserAccReducer;
