const envVariables = {
    authUrl : (): string => {
        const baseUrl = import.meta.env.APIURL || "http://127.0.0.1:8080/api";
        return `${baseUrl}/auth` as const;
    }
}

export default envVariables;