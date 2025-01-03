import axiosInstance from "../Axios";

export const createProduct = async (formData) => {
    for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
    }

    try {
        const response = await axiosInstance.post('/product', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log(response)
        return response.data
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Server error";
        throw new Error(errorMessage);
    }
}


export const getProducts = async () => {
    try {
        const response = await axiosInstance.get('/product');
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Server error";
        throw new Error(errorMessage);
    }
};


export const updateProduct = async (id, productData) => {
    try {
        const response = await axiosInstance.put(`/product/update/${id}`, productData);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Server error";
        throw new Error(errorMessage);
    }
};


// Delete product
export const deleteProduct = async (id) => {
    try {
        const response = await axiosInstance.delete(`/product/delete/${id}`);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Server error";
        throw new Error(errorMessage);
    }
};

export const subscribeProduct = async (productId) => {
    try {
        const response = await axiosInstance.post('/users/subscribe', {
            productId,
        });
        return response.data;
    } catch (error) {
        console.error("Error subscribing to product:", error);
        throw error.response?.data || "An error occurred";
    }
};

export const subscribedToNewProductsAPI = async () => {
    try {
        const response = await axiosInstance.post('/users/subscribe-new-products', {
            subscribe: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error subscribing to product:", error);
        throw error.response?.data || "An error occurred";
    }
}

export const unsubscribeFromNewProductsAPI = async () => {
    try {
        const response = await axiosInstance.post('/users/unSubscribe-new-products', {
            subscribe: false,
        });
        return response.data;
    } catch (error) {
        console.error("Error subscribing to product:", error);
        throw error.response?.data || "An error occurred";
    }
}


export const getSubscribed = async () => {
    try {
        const response = await axiosInstance.get('/users/subscribe')
        return response.data
    } catch (error) {
        console.error("Error subscribing to product:", error);
        throw error.response?.data || "An error occurred";
    }
}
