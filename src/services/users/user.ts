import axios from 'axios'
import axiosInstace from '../axios'
import User from '../../store/application/models/users/user'
import { IPaginator } from '../../store/ducks/root.types'
import Address from '../../store/application/models/users/address'

class UserService {
    /**
     * TODO configurar corretamente todas as rotas
     */
    public create(newUser: User) {
        return axiosInstace.post(`/user/create`, newUser)
        return axiosInstace.post(`/gym/user/create`, newUser?.toJSON)
    }

    public getById(userId: string): Promise<any> {
        return axiosInstace.get(`/user/${userId}`)
    }

    public getAll(paginator?: IPaginator){
        const params = new URLSearchParams()
        if(paginator) {
            if(paginator.page === 0) {
                params.append('page', String(paginator.page + 1))
            }

            if(paginator.rows) {
                params.append('limit', String(paginator.rows))
            }
        }
        return axiosInstace.get(`/users`, { params })
        .then(response => {
            return { data: response.data, headers: response.headers }
        })
    }

    public updated(user: User): Promise<any> {
        return axiosInstace.patch(`/users/${user.id}/delete`, user)
    }

    public remove(userId: string){
        return axiosInstace.delete(`/user/${userId}/delete`)
    }

    public getZipCode(zip_code: string): Promise<any> {
        return axios.get(`https://viacep.com.br/ws/${zip_code}/json`)
            .then(response => {
                return new Address().fromJSON({
                    id: undefined,
                    street: response.data.logradouro,
                    distric: response.data.bairro,
                    city: response.data.localidade,
                    state: response.data.uf,
                    zip_code: response.data.cep?.replace(/[^0-9]/g, ''),
                    number: undefined
                })
            })
    }
}

export default new UserService()