import HotelConstant from "@/Redux/Constant/Hotel/HotelConstant";

const initialState = {
  hotel: [],
  addrs: [],
  prov: [],
  facilities: [],
  fapho: [],
  hotelById: "",
  faciById: "",
  photo: [],
  faphistory: [],
  total: 0,
  currentPage: 1,
};

function HotelReducer(state = initialState, action: any) {
  switch (action.type) {
    case HotelConstant.GET_HOTEL:
      return { ...state };
    case HotelConstant.GET_HOTEL_SUCCESS:
      return {
        ...state,
        hotel: action.payload.data,
        total: action.payload.count,
        currentPage: action.payload.currentPage,
      };
    case HotelConstant.GET_ADDRESS:
      return { ...state };
    case HotelConstant.GET_ADDRESS_SUCCESS:
      return { ...state, addrs: action.payload };
    case HotelConstant.GET_PROVINCE:
      return { ...state };
    case HotelConstant.GET_PROVINCE_SUCCESS:
      return { ...state, prov: action.payload };
    case HotelConstant.GET_HOTEL_ID:
      return { ...state };
    case HotelConstant.GET_HOTEL_ID_SUCCESS:
      return getHotelById(state, action);
    case HotelConstant.GET_FACILITIES_ID:
      return { ...state };
    case HotelConstant.GET_FACILITIES_ID_SUCCESS:
      return getFacilityById(state, action);
    case HotelConstant.ADD_HOTEL:
      return { ...state };
    case HotelConstant.ADD_HOTEL_SUCCESS:
      return AddHotelSuccessed(state, action);
    case HotelConstant.UPDATE_HOTEL:
      return { ...state };
    case HotelConstant.UPDATE_HOTEL_SUCCESS:
      return UpdateHotelSuccessed(state, action);
    case HotelConstant.DEL_HOTEL:
      return { ...state };
    case HotelConstant.DEL_HOTEL_SUCCESS:
      return deleteHotelSucceed(state, action);
    case HotelConstant.GET_FACILITIES:
      return { ...state };
    case HotelConstant.GET_FACILITIES_SUCCESS:
      return { ...state, facilities: action.payload };
    case HotelConstant.ADD_FACILITIES:
      return { ...state };
    case HotelConstant.ADD_FACILITIES_SUCCESS:
      return AddFacilitySuccessed(state, action);
    case HotelConstant.UPDATE_FACILITIES:
      return { ...state };
    case HotelConstant.UPDATE_FACILITIES_SUCCESS:
      return UpdateFacilitySuccessed(state, action);
    case HotelConstant.DEL_FACILITIES:
      return { ...state };
    case HotelConstant.DEL_FACILITIES_SUCCESS:
      return deleteFacilitySucceed;
    case HotelConstant.GET_FAPHO:
      return { ...state };
    case HotelConstant.GET_FAPHO_SUCCESS:
      return { ...state, fapho: action.payload };
    case HotelConstant.ADD_FAPHO:
      return { ...state };
    case HotelConstant.ADD_FAPHO_SUCCESS:
      return AddFaphoSuccessed(state, action);
    case HotelConstant.UPDATE_FAPHO:
      return { ...state };
    case HotelConstant.UPDATE_FAPHO_SUCCESS:
      return UpdateFaphoSucceed(state, action);
    case HotelConstant.DEL_FAPHO:
      return { ...state };
    case HotelConstant.DEL_FAPHO_SUCCESS:
      return DeleteFaphoSuccessed(state, action);
    case HotelConstant.GET_FAPH:
      return { ...state };
    case HotelConstant.GET_FAPH_SUCCESS:
      return { ...state, faphistory: action.payload };
    case HotelConstant.ADD_FAPH_SUCCESS:
      return AddFaphSuccessed(state, action);
    case HotelConstant.UPDATE_FAPH:
      return { ...state };
    case HotelConstant.UPDATE_FAPH_SUCCESS:
      return UpdateFaphSucceed(state, action);
    case HotelConstant.DEL_FAPH:
      return { ...state };
    case HotelConstant.DEL_FAPH_SUCCESS:
      return DeleteFaphSuccessed(state, action);
    default:
      return state;
  }
}

const getHotelById = (state: any, action: any) => {
  const { payload } = action;
  return {
    ...state,
    hotelById: payload,
  };
};

const getFacilityById = (state: any, action: any) => {
  const { payload } = action;
  return {
    ...state,
    faciById: payload,
  };
};

const AddHotelSuccessed = (state: any, action: any) => {
  const { payload } = action;  
  return {
    ...state,
    hotel: [...state.hotel, payload.result],
  };
};

const UpdateHotelSuccessed = (state: any, action: any) => {
  const { payload } = action;
  const filterHotel = state.hotel.filter(
    (htl: any) => htl.hotelId !== payload.hotelId
  );
  return {
    ...state,
    hotel: [...filterHotel, payload],
  };
};
const deleteHotelSucceed = (state: any, action: any) => {
  const { payload } = action;
  const filterHotel = state.hotel.filter(
    (hotel: any) => hotel.hotelId !== payload
  );
  return {
    ...state,
    hotel: [...filterHotel],
  };
};

const AddFacilitySuccessed = (state: any, action: any) => {
  const { payload } = action;
  console.log(payload);
  
  return {
    ...state,
    facilities: [...state.facilities, payload.result],
  };
};

const UpdateFacilitySuccessed = (state: any, action: any) => {
  const { payload } = action;
  const filterFaci = state.facilities.filter(
    (faci: any) => faci.faciId !== payload.faciId
  );
  return {
    ...state,
    facilities: [...filterFaci, payload],
  };
};

const deleteFacilitySucceed = (state: any, action: any) => {
  const { payload } = action;
  const filterFaci = state.facilities.filter(
    (faci: any) => faci.faciId !== payload.faciId
  );
  return {
    ...state,
    facilities: [...filterFaci],
  };
};

const AddFaphoSuccessed = (state: any, action: any) => {
  const { payload } = action;  
  return {
    ...state,
    fapho: [payload.result],
  };
};

const UpdateFaphoSucceed = (state: any, action: any) => {
  const { payload } = action;
  const filterPhoto = state.photo.filter(
    (pht: any) => pht.faphoId !== payload.faphoId
  );
  return {
    ...state,
    photo: [...filterPhoto, payload],
  };
};
const DeleteFaphoSuccessed = (state: any, action: any) => {
  const { payload } = action;
  const filterPhoto = state.photo.filter(
    (pht: any) => pht.faphoId !== payload.faphoId
  );
  return {
    ...state,
    photo: [...filterPhoto],
  };
};

const AddFaphSuccessed = (state: any, action: any) => {
  const { payload } = action;
  return {
    ...state,
    faphistory: [...state.faphistory, payload.result],
  };
};

const UpdateFaphSucceed = (state: any, action: any) => {
  const { payload } = action;
  const filterPrice = state.faphistory.filter(
    (fph: any) => fph.faphId !== payload.faphId
  );
  return {
    ...state,
    faphistory: [...filterPrice, payload],
  };
};
const DeleteFaphSuccessed = (state: any, action: any) => {
  const { payload } = action;
  const filterPrice = state.faphistory.filter(
    (fph: any) => fph.faphId !== payload.faphId
  );
  return {
    ...state,
    faphistory: [...filterPrice],
  };
};
export default HotelReducer;
