import PaymentConst from "@/Redux/Constant/Payment/PaymentConst";

const initialState = {
  payPaga: [],
  error: null,
  total: 0,
  currentPage: 1,
};

function payPagaReducer(state = initialState, action: any) {
  switch (action.type) {
    case PaymentConst.GET_PAYMENT_GATEWAY_REQUEST:
      return { ...state };
    case PaymentConst.GET_PAYMENT_GATEWAY_REQUEST_SUCCESS:
      return { 
        ...state, 
        payPaga: action.payload.data,
        total : action.payload.count,
        currentPage : action.payload.currentPage
      };
    case PaymentConst.ADD_PAYMENT_GATEWAY:
      return { ...state };
    case PaymentConst.ADD_PAYMENT_GATEWAY_SUCCESS:
      return { ...state, payPaga: action.payload };
    case PaymentConst.ADD_PAYMENT_GATEWAY_FAILED:
      return { ...state, error: action.payload };
    case PaymentConst.UPDATE_PAYMENT_GATEWAY:
      return { ...state };
    case PaymentConst.UPDATE_PAYMENT_GATEWAY_SUCCESS:
      state.payPaga.splice(
        state.payPaga.findIndex(
          (i: any) => i.pagaEntityId == action.payload.pagaEntityId
        ),
        1,
        action.payload
      );
      return {
        ...state,
        payPaga: [...state.payPaga],
      };
    case PaymentConst.UPDATE_PAYMENT_GATEWAY_FAILED:
      return { ...state, error: action.payload };
    case PaymentConst.DELETE_PAYMENT_GATEWAY:
      return { ...state };
    case PaymentConst.DELETE_PAYMENT_GATEWAY_SUCCESS:
      return {
        ...state,
        payPaga: state.payPaga.filter(
          (items: any) => items.pagaEntityId !== +action.payload
        ),
        total : state.total -1
      };
    default:
      return state;
  }
}

export default payPagaReducer;
