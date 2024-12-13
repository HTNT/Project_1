import { axiosClient, baseURL } from "./axios-client";

const userAPI = {
    getUserById(id) {
        const url = `${baseURL}/users/${id}`;
        return axiosClient.get(url);
    },

    updateUser(token, id, body) {
        const url = `http://localhost:2206/api/users/${id}`;
        return axiosClient.put(url, body, {
            headers: {
                "x-auth-token": token.toString(),
            },
        });
    },
};
export default userAPI;
