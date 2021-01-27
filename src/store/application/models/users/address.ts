import { JsonUtils } from '../../utils/json.util';

export default class Address {
    private _street: string | undefined;
    private _zip_code: string | undefined;
    private _city: string | undefined;
    private _number: number | undefined;
    private _state: string | undefined;

    get street(): string | undefined {
        return this._street;
    }

    set street(value: string | undefined) {
        this._street = value;
    }

    get zip_code(): string | undefined {
        return this._zip_code;
    }

    set zip_code(value: string | undefined) {
        this._zip_code = value;
    }

    get city(): string | undefined {
        return this._city;
    }

    set city(value: string | undefined) {
        this._city = value;
    }
    adress
    get number(): number | undefined {
        return this._number;
    }

    set number(value: number | undefined) {
        this._number = value;
    }

    get state(): string | undefined {
        return this._state;
    }

    set state(value: string | undefined) {
        this._state = value;
    }

    public fromJSON(json: any): Address {
        if(!json){
            return this;
        }

        if(typeof json === 'string') {
            if(!JsonUtils.isJSONString(json)) {
                return this;
            }
            json = JSON.parse(json);
        }

        if(json.street !== undefined) {
            this.street = json.street;
        }

        if(json.zip_code !== undefined) {
            this.zip_code = json.zip_code;
        }

        if(json.city !== undefined) {
            this.city = json.city;
        }

        if(json.number !== undefined) {
            this.number = json.number;
        }

        if(json.state !== undefined) {
            this.state = json.state;
        }
        
        return this;
    }

    public toJSON(): any {
        return {
            street: this.street ? this.street : undefined,
            zip_code: this.zip_code ? this.zip_code : undefined,
            city: this.city ? this.city : undefined,
            number: this.number ? this.number : undefined,
            state: this.state ? this.state : undefined
        }
    }
}