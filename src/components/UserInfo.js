export class UserInfo {
    constructor({userInfo, userName}) {
        this._name = userName;
        this._info = userInfo;
    }

    getUserInfo() {
        const data = {
            name: this._name.textContent,
            job: this._info.textContent
        }
        return data;
    }

    setUserInfo({name, job}) {
        this._name.textContent = name;
        this._info.textContent = job;
    }
}