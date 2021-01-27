import { Agent } from 'https'
import { AxiosInstance, default as axios } from 'axios'
import Interceptors from './interceptors'

class ConfigAxios {
    private readonly _instance: AxiosInstance

    constructor() {
        // Base adress configuration for backend service
        this._instance = axios.create({
            baseURL: 'http://localhost:3001',
            httpsAgent: new Agent({ rejectUnauthorized: false })
        })
        
        this.configResponseInterceptors()
    }

    /* Method for configuring the interceptors that acted on the request */
    private configResponseInterceptors(): void {
        this._instance
            .interceptors
            .response
            .use(
                undefined,
                Interceptors.handleError
            )
    }

    get instance(): AxiosInstance {
        return this._instance
    }
}

export default new ConfigAxios().instance