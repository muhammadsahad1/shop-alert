import axiosInstance from "../Axios";

export const userSignup = async (userData) => {
    try {
        console.log("data frontend =>", userData)
        const response = await axiosInstance.post('/auth/signup', userData);
        console.log(response.data)
        return response.data;
    } catch (error) {

        const errorMessage = error.response?.data?.message || "Server error";
        throw new Error(errorMessage);
    }
};


export const userLogin = async (userData) => {

    try {
        console.log("use", userData);
        const response = await axiosInstance.post('/auth/login', userData);
        console.log(response)
        return response.data;
    } catch (error) {

        const errorMessage = error.response?.data?.message || "Server error";
        throw new Error(errorMessage);
    }
};

export const userLogout = async () => {
    const response = await axiosInstance.post('/auth/logout', {}, { withCredentials: true })
    console.log("ress", response);

    return response.data
}