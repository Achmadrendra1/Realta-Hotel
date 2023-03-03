import { empType } from '@/Redux/Constant/HR/empType'

const initialState = {
    details: null,
    deptHist: [],
    payHist: []
}

export const detailEmpReducer = ( state:object = initialState, action:any ) => {
    const { type, payload } = action
    switch(type){
        case empType.UPDATE_DATA_DETAIL:
            const newData = {
                userid: payload.userId,
                empid: payload.empId,
                nation: payload.nationalId,
                fullname: payload.fullName,
                birthdate: payload.birthDate,
                hiredate: payload.hireDate,
                marital: payload.marital,
                gender: payload.gender,
                salariedflag: payload.salaryFlag,
                status: payload.status,
                vacationhours: payload.vacation,
                sickleave: payload.sick,
                photourl: payload.image,
                jobname: payload.jobId,
                salary: payload.salary,
                frequentlypay: payload.frequenltyPay,
            }
            return{
                ...state,
                details: newData
            }
        case empType.GET_DETAIL_SUCCESS:
            return{
                details: payload.employees,
                deptHist: payload.deptHist,
                payHist: payload.payHist
            }
        case empType.GET_DETAIL:
        default:
            return state
    }
} 