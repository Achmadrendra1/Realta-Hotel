import PaymentConst from "@/Redux/Constant/Payment/PaymentConst";

const initialState = {
  payBank: [],
  allBank: [],
  error: null,
  total: 0,
  currentPage: 1,
};

function payBankReducer(state = initialState, action: any) {
  switch (action.type) {
    case PaymentConst.GET_BANK_REQUEST:
      return { ...state };
    case PaymentConst.GET_BANK_REQUEST_SUCCESS:
      return {
        ...state,
        payBank: action.payload.data,
        total: action.payload.count,
        currentPage: action.payload.currentPage,
      };
    case PaymentConst.GET_ALL_BANK_REQUEST:
      return {
        ...state
      }
    case PaymentConst.GET_ALL_BANK_REQUEST_SUCCESS:
      return {
        ...state,
        allBank : action.payload
      }
    case PaymentConst.ADD_BANK:
      return { ...state };
    case PaymentConst.ADD_BANK_SUCCESS:
      return { 
        ...state, 
        payBank: action.payload.data,
        total: action.payload.count,
        currentPage: action.payload.currentPage,
      };
    case PaymentConst.ADD_BANK_FAILED:
      return { ...state, error: action.payload };
    case PaymentConst.UPDATE_BANK:
      return { ...state };
    case PaymentConst.UPDATE_BANK_SUCCESS:
      state.payBank.splice(
        state.payBank.findIndex(
          (i: any) => i.bankEntityId == action.payload.bankEntityId
        ),
        1,
        action.payload
      );
      return {
        ...state,
        payBank: [...state.payBank],
      };
    case PaymentConst.UPDATE_BANK_FAILED:
      return { ...state, error: action.payload };
    case PaymentConst.DELETE_BANK:
      return { ...state };
    case PaymentConst.DELETE_BANK_SUCCESS:
      
      return {
        ...state,
        payBank: state.payBank.filter(
          (items: any) => items.bankEntityId !== +action.payload
        ),
        total : state.total -1
      };
    default:
      return state;
  }
}

export default payBankReducer;
