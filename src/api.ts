import qs from 'qs';

export enum APIRoutes {
    home = "/",
    login = "/login",
    register = "/register",
    refresh = "/refresh"
}

export const getAPIUrl = (): string => {
    // TODO add proper .env handling
    return "http://localhost:8888";
}

export const getAPIWSUrl = (): string => {
    // TODO
    return "ws://localhost:8888";
}

export const getWSAuthMessage = (token: string): object => {
    return {
        message: "authentication",
        payload: {
            token: token
        }
    }
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
    return response;
}

export const processMessage = (data: any) => {
    /*
        Processes the incoming data
        Adds log item to the state
    */

    // Get type of the message and payload
    const type = data.payload.message;
    const payload = data.payload;
    console.log(`Message of type: ${type} with payload: ${payload}`);

    switch (type) {

    }
}