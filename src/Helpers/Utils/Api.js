import axios from "axios";

const apiRequest = async (endpoint, method, body, headers) => {
    try {
        const BASE_URL = 'http://localhost:8000/api/v1';
        const url = `${BASE_URL}/${endpoint}`;
        const response = await axios({
            url,
            method,
            data: method != 'GET' ? body : undefined,
            headers
        })

        // Return response data
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error("An unexpected error occurred");
    }
}

export default apiRequest;