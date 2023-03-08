import menuConstant from "@/Redux/Constant/Resto/menuConstant";

const initialState = {
    restoMenus: []
}

function restoMenuReducer( state = initialState, action:any ){
    switch (action.type) {
        case menuConstant.GET_MENUS:
            return {...state};
        case menuConstant.GET_MENUS_SUCCEED:
            return {...state, restoMenus: action.payload};
        
        case menuConstant.UPDATE_MENU:
            return {...state}
        case menuConstant.UPDATE_MENU_SUCCEED:
            return {...state, restoMenus: action.payload};
            // return applyUpdateMenu(state, action);

        case menuConstant.ADD_MENU:
            return {...state};
        case menuConstant.ADD_MENU_SUCCEED:
            return {...state, restoMenus: [...state.restoMenus, action.payload]};

        case menuConstant.DELETE_MENU:
            return {...state};
        case menuConstant.DELETE_MENU_SUCCEED:
            return {
                ...state,
                restoMenus: state.restoMenus.filter( (menu) => menu !== action.payload.id)
            }

        default:
            // return {...state, restoMenus: action.payload};
            return {...state};
    }
}

async function applyUpdateMenu(state:any, action:any){
    return await state.restoMenus.map((menu:any) => {
        if(menu.remeId === action.payload.id){
            return {
                ...state,
                ...action.payload
            }
        }else{
            return state;
        }
    })
}

export default restoMenuReducer;