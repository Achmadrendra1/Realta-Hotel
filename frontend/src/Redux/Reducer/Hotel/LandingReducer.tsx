import LandingConstant from "@/Redux/Constant/Hotel/LandingConstant";

const initialState = {
  landing: [],
};

export const LandingReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LandingConstant.GET_LANDING:
      return { ...state };
    case LandingConstant.GET_LANDING_SUCCESS:
      return { ...state, landing: action.payload };
    case LandingConstant.GET_LANDING_FAILED:
      return { ...state };
  }
};
