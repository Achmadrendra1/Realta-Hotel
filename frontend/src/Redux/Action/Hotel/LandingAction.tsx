import LandingConstant from "@/Redux/Constant/Hotel/LandingConstant";

export const getLanding = (payload?: any) => {
    return {
        type: LandingConstant.GET_LANDING,
        payload
    };
};

export const getLandingSuccess = (payload?: any) => {
    return {
        type: LandingConstant.GET_LANDING_SUCCESS,
        payload
    };
};

export const getLandingFailed = (payload?: any) => {
    return {
        type: LandingConstant.GET_LANDING_FAILED,
        payload
    };
};