type SAME_SITE = "Strict" | "Lax" | "None";
export interface COOKIE_PARAMS {
    lifeTime?: number | string | Date, //Время жизни в секундах (number ==> Max-Age) или точная дата строкой/объектом Date (string|Date ==> Expires)
    path?:string,
    domain?: string,
    sameSite?: SAME_SITE,
    secure?: boolean,
    httpOnly?: boolean, // На клиенте JS не может установить true, но полезно для типизации/SSR
    partitioned?: boolean
}

export function getCookieByName(name: string): string | undefined {
    /**
     * Возвращает куку по названию. Если не находи куку возвращает undefined.
     */
    if (typeof document === "undefined") return undefined;

    const specialChars = name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1');
    const matches = document.cookie.match(new RegExp(`(?:^|; )${specialChars}=([^;]*)`));

    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function getCookieByValue(value: string): string[] {
    /**
     * Ищет ВСЕ куки с указанным значением. Возвращает массив (пустой если не нашлись куки).
     */
    if (typeof document === "undefined") return [];

    const cookies = document.cookie.split("; ");
    const foundNames: string[] = [];
    const targetValue = encodeURIComponent(value);

    for (const cookie of cookies) {
        if (!cookie) continue;
        const [cookieName, cookieValue] = cookie.split("=");
        if (cookieValue === targetValue) {
            foundNames.push(decodeURIComponent(cookieName));
        }
    }

    return foundNames;
}

export function setCookie(name: string, value:string, params: COOKIE_PARAMS = {}) {
    /**
     * порядок параметров: name=value; Max-Age|Expires; Path; Domain; Secure; SameSite; HttpOnly; Partioned
     * httpOnly куки нельзя прочитать в JS (Работает только на backend)
     */
    var _cookie = `${name}=${value}; `;
    
    if (params.sameSite === "None"){params.secure = true;} //Secure всегда true при SameSite = "None"

    // Валидация превиксов (__Secure-) и (__Host-)
    if (name.startsWith("__Secure-")){params.secure=true;}
    if (name.startsWith("__Host-")){
        params.secure = true;
        params.path = "/";
        delete params.domain;
    }

    // Max-Age|Expires
    if (params.lifeTime !== undefined){
        if (typeof params.lifeTime === "number"){_cookie += `max-age=${params.lifeTime}; `;}
        else if (typeof params.lifeTime === "string"){_cookie += `expires=${params.lifeTime}; `;}
        else if (params.lifeTime instanceof Date){_cookie += `expires=${params.lifeTime.toUTCString()}; `;}
    }
    _cookie += `path=${params.path || "/"}; `;
    if (params.domain){_cookie += `domain=${params.domain}; `;}
    if (params.secure){_cookie += "secure; ";}
    if (params.sameSite){_cookie += `samesite=${params.sameSite}; `;}
    if (params.httpOnly){_cookie += "httponly; ";}
    if (params.partitioned){_cookie += "partitioned";}

    if (typeof document !== "undefined") {
        document.cookie = _cookie;
    }
}

export function deleteCookie(name: string, path?: string, domain?: string){
    setCookie(name, "", {path : path || "/", domain : domain, lifeTime : -1})
}