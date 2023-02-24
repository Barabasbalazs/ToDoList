const envVariables = {
    authUrl : () => {
        const baseUrl = import.meta.env.APIURL || "localhost:8080/api";
        return `${baseUrl}/auth`;
    }
}

export default envVariables;