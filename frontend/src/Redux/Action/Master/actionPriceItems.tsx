//package lib

//Artifical
import ActionTypes from '@/Redux/Constant/Master/masterActionType';

//----------------------------------------------------------------------------------
// GET Table PriceItems

export const doPriceItems = () => {
  return {
    type: ActionTypes.GET_PRICE_ITEMS,
  };
};
export const doPriceItemsSucceed = (payload: any) => {
  return {
    type: ActionTypes.GET_PRICE_ITEMS_SUCCEED,
    payload,
  };
};
export const doPriceItemsFailed = (payload: any) => {
  return {
    type: ActionTypes.GET_PRICE_ITEMS_FAILED,
    payload,
  };
};

//----------------------------------------------------------------------------------
// ADD Table PriceItems

export const doAddPriceItems = (payload: any) => {
  return {
    type: ActionTypes.ADD_PRICE_ITEMS,
    payload,
  };
};
export const doAddPriceItemsSucceed = (payload: any) => {
  return {
    type: ActionTypes.ADD_PRICE_ITEMS_SUCCEED,
    payload,
  };
};
export const doAddPriceItemsFailed = (payload: any) => {
  return {
    type: ActionTypes.ADD_PRICE_ITEMS_FAILED,
    payload,
  };
};

//----------------------------------------------------------------------------------
// UPDATE Table PriceItems

export const doUpdatePriceItems = (payload: any) => {
  return {
    type: ActionTypes.UPDATE_PRICE_ITEMS,
    payload,
  };
};
export const doUpdatePriceItemsSucceed = (payload: any) => {
  return {
    type: ActionTypes.UPDATE_PRICE_ITEMS_SUCCEED,
    payload,
  };
};
export const doUpdatePriceItemsFailed = (payload: any) => {
  return {
    type: ActionTypes.UPDATE_PRICE_ITEMS_FAILED,
    payload,
  };
};

//----------------------------------------------------------------------------------
// DEL Table PriceItems

export const doDelPriceItems = (payload: any) => {
  return {
    type: ActionTypes.DEL_PRICE_ITEMS,
    payload,
  };
};
export const doDelPriceItemsSucceed = (payload: any) => {
  return {
    type: ActionTypes.DEL_PRICE_ITEMS_SUCCEED,
    payload,
  };
};
export const doDelPriceItemsFailed = (payload: any) => {
  return {
    type: ActionTypes.DEL_PRICE_ITEMS_FAILED,
    payload,
  };
};
