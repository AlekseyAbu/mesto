

export class UserInfo {
    constructor({ nameSelector, aboutSelector, avatarSelektor }) {
        this._name = nameSelector;
        this._about = aboutSelector;
        this._avatar = avatarSelektor;
    }

    getUserInfo() {
        return{
            userName: document.querySelector(this._name).textContent,
            userAbout: document.querySelector(this._about).textContent,
            userAvatar: document.querySelector(this._about).style.backgroundImage
        }
    }

    setUserInfo({userName, userAbout, userAvatar}) {
        if(userName){
            document.querySelector(this._name).textContent = userName;
        }
        if(userAbout){
            document.querySelector(this._about).textContent = userAbout;
        }
        if(userAvatar) {
            document.querySelector(this._avatar).style.backgroundImage = `url(${userAvatar})`;
        }
    }
}