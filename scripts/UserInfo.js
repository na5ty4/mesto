export class UserInfo {
    constructor({profileName, profileDescription}) {
        this._profileName = document.querySelector(profileName);
        this._profileDescription = document.querySelector(profileDescription);
    }

    getUserInfo() {
        const userInfo = {
            userName: this._profileName.textContent,
            userDescription: this._profileDescription.textContent
        };
        return userInfo;
    }

    setUserInfo(data) {
        const profileName = data['profilename'];
        const profileJob = data['profiledescription'];
        this._profileName.textContent = profileName;
        this._profileDescription.textContent = profileJob;
    }
}