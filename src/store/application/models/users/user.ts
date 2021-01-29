import Default from '../default'
import Address from './address'

export default class User extends Default {

    private _first_name: string | undefined
    private _last_name: string | undefined
    private _email: string | undefined
    private _phone: string | undefined
    private _birth_date: string | undefined
    private _address: Address | undefined

    /**
     * TODO Inicialização do tipo Objeto
     * Contructor() {} adicionado pois é do tipo Object (Address)
     * Apesar de também ser do tipo undefined é interessante inicializar com o tipo
     */
    constructor() {
        super()
        this._address = new Address()
    }

    get first_name(): string | undefined {
        return this._first_name
    }

    set first_name(value: string | undefined) {
        this._first_name = value
    }

    get last_name(): string | undefined {
        return this._last_name
    }

    set last_name(value: string | undefined) {
        this._last_name = value
    }

    get email(): string | undefined {
        return this._email
    }

    set email(value: string | undefined) {
        this._email = value
    }

    get phone(): string | undefined {
        return this._phone
    }

    set phone(value: string | undefined) {
        this._phone = value
    }

    get birth_date(): string | undefined {
        return this._birth_date
    }

    set birth_date(value: string | undefined) {
        this._birth_date = value;
    }

    get address(): Address | undefined {
        return this._address;
    }

    set address(value: Address | undefined) {
        this._address = value
    }

    public fromJSON(json: any): User {
        super.fromJSON(json)

        if (json.first_name !== undefined) this.first_name = json.first_name

        if (json.last_name !== undefined) this.last_name = json.last_name

        if (json.email !== undefined) this.email = json.email

        if (json.phone !== undefined) this.phone = json.phone

        if (json.birth_date !== undefined) this.birth_date = json.birth_date
        
        if (json.address !== undefined) this.address = new Address().fromJSON(json.address)        

        return this
    }

    public toJSON(): any {
        return {
            ...super.toJSON(),
            first_name: this.first_name ? this.first_name : undefined,
            last_name: this.last_name ? this.last_name : undefined,
            email: this.email ? this.email : undefined,
            phone: this.phone ? this.phone : undefined,
            birth_date: this.birth_date ? this.birth_date : undefined,
            address: this.address ? this.address.toJSON() : undefined,
        }
    }
}