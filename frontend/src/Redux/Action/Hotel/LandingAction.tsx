import LandingConstant from "@/Redux/Constant/Hotel/LandingConstant";

export const getLanding = () => {
    return {
        type: LandingConstant.GET_LANDING,
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