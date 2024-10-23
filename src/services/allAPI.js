import commonAPI from "./commonAPI"
import SERVER_URL from "./serverUrl"


// addEmpDetailsAPI - called by Add component
export const addEmpDetailsAPI = async (details) => {
    return await commonAPI("POST",`${SERVER_URL}/allEmployeeDetails`,details)
}

// getAllEmpDetailsAPI - Called by View component
export const getAllEmpDetailsAPI = async () => {
    return await commonAPI("GET",`${SERVER_URL}/allEmployeeDetails`,"")
}

// removeEmpDetailsAPI - called by View component
export const removeEmpDetailsAPI = async (id) => {
    return await commonAPI("DELETE",`${SERVER_URL}/allEmployeeDetails/${id}`,{})
}

// updateEmployeeDetailsAPI
export const updateEmpDetailsAPI = async (id,updateEmployeeDetails)=>{
    return await commonAPI("PUT",`${SERVER_URL}/allEmployeeDetails/${id}`,updateEmployeeDetails)
}