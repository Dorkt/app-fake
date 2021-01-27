export class JsonUtils {
    public static isJSONString(str: string): boolean {
        try {
            return typeof JSON.parse(str) === 'object';
        }catch(e){
            return false;
        }
    }
}