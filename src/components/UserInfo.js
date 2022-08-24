export class UserInfo {
    constructor({profileName, profileDescription, profileAvatar}) {
        this._profileName = document.querySelector(profileName);
        this._profileDescription = document.querySelector(profileDescription);
        this._profileAvatar = document.querySelector(profileAvatar);
        this._id = 0;
    }

    getUserInfo() {
        const userInfo = {
            userName: this._profileName.textContent,
            userDescription: this._profileDescription.textContent
        };
        return userInfo;
    }

    getUserAvatar() {
        const userAvatar = {userAvatar: this._profileAvatar.textContent};
        return userAvatar;
    }

    getUserId() {
        return this._id;
    }

    setUserAvatar(data) {
        const profileAvatar = data['profileavatar'];
        this._profileAvatar.src = profileAvatar;
    }

    setUserInfo(data) {
        const profileName = data['profilename'];
        const profileJob = data['profiledescription'];
        this._profileName.textContent = profileName;
        this._profileDescription.textContent = profileJob;
    }

    setUserId(id) {
        this._id = id;
    }
}