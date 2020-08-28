export class UserInfo {
    constructor({userInfo, userName, userAvatar}) {
        this._name = userName;
        this._info = userInfo;
        this._url = userAvatar;
    }

    getUserInfo() {
        const data = {
            name: this._name.textContent,
            job: this._info.textContent
        }
        return data;
    }

    setUserInfo({name, job, url}) {
        this._name.textContent = name;
        this._info.textContent = job;
        this._url.style = `background-image: url(${url});`;
    }
}