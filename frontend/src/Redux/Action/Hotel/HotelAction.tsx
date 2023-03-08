import HotelConstant from "@/Redux/Constant/Hotel/HotelConstant";

//HOTEL
export const getHotel = (payload?: any) => {
  return {
    type: HotelConstant.GET_HOTEL,
    payload
  };
};

export const getHotelSuccess = (payload: any) => {
  return {
    type: HotelConstant.GET_HOTEL_SUCCESS,
    payload,
  };
};

export const getHotelFailed = (payload: any) => {
  return {
    type: HotelConstant.GET_HOTEL_FAILED,
    payload,
  };
};

export const getHotelID = (payload:any) => {
  return {
    type: HotelConstant.GET_HOTEL_ID,
    payload,
  };
};

export const getHotelIDSuccess = (payload: any) => {
  return {
    type: HotelConstant.GET_HOTEL_ID_SUCCESS,
    payload,
  };
};

export const getHotelIDFailed = (payload: any) => {
  return {
    type: HotelConstant.GET_HOTEL_ID_FAILED,
    payload,
  };
};



export const addHotel = (payload: any) => {
  return {
    type: HotelConstant.ADD_HOTEL,
    payload,
  };
};

export const addHotelSuccess = (payload: any) => {
  return {
    type: HotelConstant.ADD_HOTEL_SUCCESS,
    payload 
    };
};

export const addHotelFailed = (payload: any) =>{
    return {
        type: HotelConstant.ADD_HOTEL_FAILED,
        payload
    }
}

export const updateHotel = (payload: any) => {
  return {
    type: HotelConstant.UPDATE_HOTEL,
    payload
  }
}

export const updateHotelSucceed = (payload: any) => {
  return {
    type: HotelConstant.UPDATE_HOTEL_SUCCESS,
    payload
  }
}

export const updateHotelFailed = (payload: any) => {
  return {
    type: HotelConstant.UPDATE_HOTEL_FAILED,
    payload
  }
}

export const deleteHotel = (payload: any) => {
  return {
    type: HotelConstant.DEL_HOTEL,
    payload
  }
}

export const deleteHotelSucceed = (payload:any) => {
  return {
    type: HotelConstant.DEL_HOTEL_SUCCESS,
    payload
  }
} 

export const deleteHotelFailed = (payload:any) => {
  return {
    type: HotelConstant.DEL_HOTEL_FAILED,
    payload
  }
}

//ADDRESS & PROVINCE
export const getAddress = () => {
  return {
    type: HotelConstant.GET_ADDRESS,
  };
};

export const getAddressSuccess = (payload: any) => {
  return {
    type: HotelConstant.GET_ADDRESS_SUCCESS,
    payload,
  };
};

export const getAddressFailed = (payload: any) => {
  return {
    type: HotelConstant.GET_ADDRESS_FAILED,
    payload,
  };
};

export const getProvince = () => {
  return {
    type: HotelConstant.GET_PROVINCE,
  };
};

export const getProvinceSuccess = (payload: any) => {
  return {
    type: HotelConstant.GET_PROVINCE_SUCCESS,
    payload,
  };
};

export const getProvinceFailed = (payload: any) => {
  return {
    type: HotelConstant.GET_PROVINCE_FAILED,
    payload,
  };
};

//FACILITIES
export const getFacility = () => {
  return {
    type: HotelConstant.GET_FACILITIES,
  };
};

export const getFacilitylSuccess = (payload: any) => {
  return {
    type: HotelConstant.GET_FACILITIES_SUCCESS,
    payload,
  };
};

export const getFacilityFailed = (payload: any) => {
  return {
    type: HotelConstant.GET_FACILITIES_FAILED,
    payload,
  };
};

export const getFacilityID = (payload:any) => {
  return {
    type: HotelConstant.GET_FACILITIES_ID,
    payload
  };
};

export const getFacilityIDSuccess = (payload: any) => {
  return {
    type: HotelConstant.GET_FACILITIES_ID_SUCCESS,
    payload,
  };
};

export const getFacilityIDFailed = (payload: any) => {
  return {
    type: HotelConstant.GET_FACILITIES_ID_FAILED,
    payload,
  };
};

export const addFacility = (payload: any) => {
  return {
    type: HotelConstant.ADD_FACILITIES,
    payload,
  };
};

export const addFacilitySuccess = (payload: any) => {
  return {
    type: HotelConstant.ADD_FACILITIES_SUCCESS,
    payload 
    };
};

export const addFacilityFailed = (payload: any) =>{
    return {
        type: HotelConstant.ADD_FACILITIES_FAILED,
        payload
    }
}

export const updateFacility = (payload: any) => {
  return {
    type: HotelConstant.UPDATE_FACILITIES,
    payload,
  };
};

export const updateFacilitySuccess = (payload: any) => {
  return {
    type: HotelConstant.UPDATE_FACILITIES_SUCCESS,
    payload 
    };
};

export const updateFacilityFailed = (payload: any) =>{
    return {
        type: HotelConstant.UPDATE_FACILITIES_FAILED,
        payload
    }
}
export const deleteFacility = (payload: any) =>{
  return {
    type: HotelConstant.DEL_FACILITIES,
    payload
  }
}

export const deleteFacilitySucceed = (payload: any) =>{
  return {
    type: HotelConstant.DEL_FACILITIES_SUCCESS,
    payload
  }
}

export const deleteFacilityFailed = (payload: any) =>{
  return {
    type: HotelConstant.DEL_FACILITIES_FAILED,
    payload
  }
}

//FAPHO
export const getFaph = () => {
  return {
    type: HotelConstant.GET_FAPH,
  };
};
export const getFaphSuccess = (payload: any) => {
  return {
    type: HotelConstant.GET_FAPH_SUCCESS,
    payload,
  };
};
export const getFaphFailed = (payload: any) => {
  return {
    type: HotelConstant.GET_FAPH_FAILED,
    payload,
  };
};

export const addFaph = (payload: any) => {
  return {
    type: HotelConstant.ADD_FAPH,
    payload,
  };
};
export const addFaphSuccess = (payload: any) => {
  return {
    type: HotelConstant.ADD_FAPH_SUCCESS,
    payload 
    };
};
export const addFaphFailed = (payload: any) =>{
    return {
        type: HotelConstant.ADD_FAPH_FAILED,
        payload
    }
}

export const updateFaph = (payload: any) => {
  return {
    type: HotelConstant.UPDATE_FAPH,
    payload,
  }
}
export const updateFaphSuccess = (payload: any) => {
  return {
    type: HotelConstant.UPDATE_FAPH_SUCCESS,
    payload,
  }
}
export const updateFaphFailed = (payload: any) => {
  return {
    type: HotelConstant.UPDATE_FAPH_FAILED,
    payload,
  }
}

export const deleteFaph = (payload: any) => {
  return {
    type: HotelConstant.DEL_FAPH,
    payload
  }
}
export const deleteFaphSuccess = (payload: any) => {
  return {
    type: HotelConstant.DEL_FAPH_SUCCESS,
    payload
  }
}
export const deleteFaphFailed = (payload: any) => {
  return {
    type: HotelConstant.DEL_FAPH_FAILED,
    payload
  }
}

//FAPHO
export const getFapho = () => {
  return {
    type: HotelConstant.GET_FAPHO,
  };
};
export const getFaphoSuccess = (payload: any) => {
  return {
    type: HotelConstant.GET_FAPHO_SUCCESS,
    payload,
  };
};
export const getFaphoFailed = (payload: any) => {
  return {
    type: HotelConstant.GET_FAPHO_FAILED,
    payload,
  };
};

export const addFapho = (payload: any) => {
  return {
    type: HotelConstant.ADD_FAPHO,
    payload,
  };
};
export const addFaphoSuccess = (payload: any) => {
  return {
    type: HotelConstant.ADD_FAPHO_SUCCESS,
    payload 
    };
};
export const addFaphoFailed = (payload: any) =>{
    return {
        type: HotelConstant.ADD_FAPHO_FAILED,
        payload
    }
}

export const updateFapho = (payload: any) => {
  return {
    type: HotelConstant.UPDATE_FAPHO,
    payload,
  }
}
export const updateFaphoSuccess = (payload: any) => {
  return {
    type: HotelConstant.UPDATE_FAPHO_SUCCESS,
    payload,
  }
}
export const updateFaphoFailed = (payload: any) => {
  return {
    type: HotelConstant.UPDATE_FAPHO_FAILED,
    payload,
  }
}

export const deleteFapho = (payload: any) => {
  return {
    type: HotelConstant.DEL_FAPHO,
    payload
  }
}
export const deleteFaphoSuccess = (payload: any) => {
  return {
    type: HotelConstant.DEL_FAPHO_SUCCESS,
    payload
  }
}
export const deleteFaphoFailed = (payload: any) => {
  return {
    type: HotelConstant.DEL_FAPHO_FAILED,
    payload
  }
}