import dayjs from 'dayjs';
import { extend, ResponseError } from 'umi-request';
import { message } from 'antd';
import { v4 as uuidv4 } from 'uuid';
// import { isDateString } from './utils';
interface IRequestErrorOptions {
    showErrorMessage: boolean;
}
const formatParams = (params: any) => {
    for (const key in params) {
        const value = params[key];
        // if (isDateString(value)) {
        //     params[key] = dayjs(value).utc().format();
        // }
    }
    return params;
};

export const ErrorHandler = async function (error: ResponseError, options?: IRequestErrorOptions) {
    if (error.response) {
        console.log(error.response.status);
        console.log(error.response.headers);
        console.log(error.data);
        console.log(error.request);
    } else {
        ResponseErrorHandle(error, options);
    }
    throw error;
};
export function ResponseErrorHandle(res: CommonDTO<any>, options?: IRequestErrorOptions) {
    console.log(res);
    let showErrorMessage = true;
    if (options) {
        showErrorMessage = options.showErrorMessage;
    }
    if (showErrorMessage) {
        // message.error(`${res.msg}`);
    }
}

export const request = extend({
    prefix: '',
    // timeout: 86400000,
    errorHandler: ErrorHandler as any,
});

request.interceptors.request.use((url, options) => {
    const uuid = uuidv4();
    const newOptions = Object.assign(options, {
        headers: {
            ...options.headers,
            ['X-Request-ID']: uuid,
        },
    });
    return {
        url: url,
        options: { ...newOptions, interceptors: true, params: formatParams(options.params) },
    };
});

// clone response in response interceptor
request.interceptors.response.use(async (response, options) => {
    // HTTP ERROR
    if (response.status !== 200) {
        // message.error(`${response.status}: ${response.statusText}`);
        throw {
            code: response.status,
            msg: response.statusText,
        };
    }
    if (options.responseType === 'blob') {
        return response;
    }
    const res = await response.clone().json();
    console.log(res)
    if (!isSuccess(res)) {
        throw res;
    }

    return response;
});

export interface CommonDTO<T = any> {
    code?: number;
    data?: T;
    msg?: string;
}

export const isSuccess = <T>(res: CommonDTO<T>) => res?.code === 0;
