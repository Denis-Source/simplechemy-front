import qs from 'qs';

export enum APIRoutes {
    login = "/login",
    register = "/register"
}

export const getAPIUrl = (): string|undefined => {
    // TODO
    return "http://localhost:8888";
}

export const fetchAPI = async (
    path: string,
    options: RequestInit,
    params?: object
): Promise<any> => {
    options = {
        headers: {
            'Content-Type': 'application/json',
        },
        ...options,
    };
    const queryString = qs.stringify(params);
    const url = `${getAPIUrl()}${path}?${queryString}`;
    const response = await fetch(url, options);

    console.log(`Fetching ${url}`);

    // TODO add custom message handling
    if (!response.ok) {
        const msg = "Error fetching data";
        console.log(msg, response);
        throw new Error(msg);
    }
    return await response.json();
}