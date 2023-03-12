import photoConstant from "@/Redux/Constant/Resto/photoConstant";

const initialState = {
    menuPhoto: []
}

function menuPhotoReducer(state = initialState, action:any){
    switch (action.type){
        case photoConstant.GET_PHOTO:
            // console.warn('isi get photo ', state);
            
            return {...state};
        case photoConstant.GET_PHOTO_SUCCEED:
            // console.warn('get photo succeed ' , action.payload);
            
            return {...state, menuPhoto: action.payload}

        case photoConstant.ADD_PHOTO: 
            return {...state};
        case photoConstant.ADD_PHOTO_SUCCEED:
            return {
                ...state,
                menuPhoto:[...state.menuPhoto, action.payload]
            }

        case photoConstant.DELETE_PHOTO: 
            return {...state};
        case photoConstant.DELETE_PHOTO_SUCCEED:
            return {
                ...state,
                menuPhoto: state.menuPhoto.filter(photo => {
                    photo !== action.payload.id;
                })
            }

        case photoConstant.UPDATE_PRIMARY:
            return {...state};
        case photoConstant.UPDATE_PRIMARY_SUCCEED:
            return updatePrimaryPhoto(state, action);
        default:
            // return {...state, menuPhoto: action.payload}
            return state;
    }
}

async function updatePrimaryPhoto(state:any, action:any) { 
    
    return await state.menuPhoto.map((rowPhoto:any)=>{
        if(rowPhoto.remp_id === action.payload.rempid){
            return {
                ...state, 
                ...action.payload
            }
        }else{
            return state;
        }
    })
}

export default menuPhotoReducer;