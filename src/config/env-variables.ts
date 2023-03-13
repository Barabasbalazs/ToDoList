
const baseUrl = import.meta.env.APIURL || "http://127.0.0.1:8080/api";

const envVariables = {
    authUrl : (): string => {
        return `${baseUrl}/auth` as const;
    },
    todoUrl : (): string => {
        return `${baseUrl}/todos` as const;
    }
}

export default envVariables;