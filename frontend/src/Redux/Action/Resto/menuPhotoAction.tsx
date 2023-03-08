import photoConstant from "@/Redux/Constant/Resto/photoConstant"

export const doGetPhoto = () => {
    return {
        type: photoConstant.GET_PHOTO
    }
}

export const doGetPhotoSucceed = (payload:any) => {
    // console.warn('dia action success ', payload);
    
    return {
        type: photoConstant.GET_PHOTO_SUCCEED,
        payload
    }
}

export const doGetPhotoFailed = (payload:any) => {
    return {
        type: photoConstant.GET_PHOTO_FAILED,
        payload
    }
}

export const doAddPhoto = (payload:any) => {
    console.log('masuk action');
    
    return{
        type: photoConstant.ADD_PHOTO,
        payload
    }
}

export const doAddPhotoSucceed = (payload:any) => {
    return {
        type: photoConstant.ADD_PHOTO_SUCCEED,
        payload
    }
}

export const doAddPhotoFailed = (payload:any) => {
    return {
        type: photoConstant.ADD_PHOTO_FAILED,
        payload
    }
}

export const doDeletePhoto = (payload:any) => {
    console.warn('masuk sini');
    
    return {
        type: photoConstant.DELETE_PHOTO,
        payload
    }
}

export const doDeletePhotoSucceed = (payload:any) => {
    return {
        type: photoConstant.DELETE_PHOTO_SUCCEED,
        payload
    }
}

export const doDeletePhotoFailed = (payload:any) => {
    return {
        type: photoConstant.DELETE_PHOTO_FAILED,
        payload
    }
}

export const doUpdatePrimary = (payload:any) => {
    return {
        type: photoConstant.UPDATE_PRIMARY,
        payload
    }
}

export const doUpdatePrimarySucceed = (payload:any) => {
    return {
        type: photoConstant.UPDATE_PRIMARY_SUCCEED,
        payload
    }
}

export const doUpdatePrimaryFailed = (payload:any) => {
    return {
        type: photoConstant.UPDATE_PRIMARY_FAILED,
        payload
    }
}