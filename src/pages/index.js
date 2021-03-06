import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { popupOpenButton, popupCardOpenButton, nameInput, jobInput, cardContainer, popupOpenAvatar, popupCardBasket } from '../utils/constants.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithSubmit } from '../components/PopupWithSubmit.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import '../pages/index.css';
import { togglePreloader } from '../utils/preloader.js';


const config = {
    formElement: '.popup__form',
    inputElement: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

const editForm = new FormValidator(config, '.popup_profile');
const addCardForm = new FormValidator(config, '.popup_card');

editForm.enableValidation();
addCardForm.enableValidation();

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/',
    headers: {
        authorization: '251eb665-7100-400a-a869-0fac2a58b885',
        'Content-Type': 'application/json'
    },
    groupID: 'cohort-14'
})



api.getAppInfo()
    .then((res) => {
        const [initialCard, profileData] = res;
        const userIdme = profileData._id;
        function generateCard(item, toAppend) {
            const card = new Card(
                {
                    data: item,
                    userIdme,
                    handleCardClick: () => {
                        openPopupImg.open(item);
                        openPopupImg.setEventListeners();
                    },
                    handleLikeClick: (id) => {
                        api.likeCard(id).then(res => {
                            card.updateLikes(res.likes);
                        })
                        .catch((err) => {
                            console.log(err); 
                          });
                    },
                    handleDislikeClick: (id) => {
                        api.dislikeCard(id).then(res => {
                            card.updateLikes(res.likes);
                        })
                        .catch((err) => {
                            console.log(err); 
                          });
                    },
                    handleDeleteClick: (id) => {
                        popupDeletCard.setSubmitAction(() => {
                            api.deletInitialCards(id).then(res => {
                                card.deleteCard();
                                popupDeletCard.close();
                            })
                            .catch((err) => {
                                console.log(err); 
                              });
                        })
                        popupDeletCard.open();
                    }
                },
                '#card');
                if(toAppend){
                    const cardElement = card.generedCard();
                    cardList.appendItem(cardElement);
                }
                else{
                    const cardElement = card.generedCard();
                    cardList.prependItem(cardElement);
                }
            // const cardElement = card.generedCard();
            // cardList.addItem(cardElement);
        }

        const popupDeletCard = new PopupWithSubmit('.popup_confirm')
        popupDeletCard.setEventListeners();

        //Uploading cards from the server
        const cardList = new Section({
            items: initialCard,
            renderer: (items) => {
                generateCard(items, true);
            }
        },
            cardContainer);
        cardList.renderItems();
        const openPopupImg = new PopupWithImage('.popup-img');
        openPopupImg.setEventListeners();

        //Creating a card via Popup
        const popupFormCard = new PopupWithForm('.popup_card', {
            submitForm: (item) => {
                togglePreloader(true, '.popup__save_card')
                api.createInitialCards(item).then(res => {
                    togglePreloader(false, '.popup__save_card')
                    generateCard(res, false);
                    popupFormCard.close();
                })
                .catch((err) => {
                    console.log(err); 
                  });
            }
        });
        popupFormCard.setEventListeners();
        popupCardOpenButton.addEventListener('click', () => {
            popupFormCard.open();
        })

        return (profileData)
    })
    .then((profileData) => {
        console.log(profileData.avatar)
        const userInfoProfile = new UserInfo({
            nameSelector: '.profile__title',
            aboutSelector: '.profile__subtitle',
            avatarSelektor: '.profile__foto'
        })

        //Inserting the value from the server
        userInfoProfile.setUserInfo({ userName: profileData.name, userAbout: profileData.about, userAvatar: profileData.avatar })

        popupOpenButton.addEventListener('click', () => {
            const userItems = userInfoProfile.getUserInfo();
            console.log(userItems)
            nameInput.value = userItems.userName;
            jobInput.value = userItems.userAbout;
            popupFormProfile.open();
        })

        const popupFormProfile = new PopupWithForm('.popup_profile',
            {
                submitForm: (item) => {
                    togglePreloader(true, '.popup__save')
                    api.creatProfile(item).then((item) => {
                        togglePreloader(false, '.popup__save')
                        userInfoProfile.setUserInfo({ userName: item.name, userAbout: item.about })
                        popupFormProfile.close();
                    })
                    .catch((err) => {
                        console.log(err); 
                      });
                }
            })

        popupFormProfile.setEventListeners();

        //Replacing an avatar
        const popupFormAvatar = new PopupWithForm('.popup_avatar',
            {
                submitForm: (item) => {
                    togglePreloader(true, '.popup__save_avatar')
                    api.creatAvatar(item.name).then((res) => {
                        togglePreloader(false, '.popup__save_avatar')
                        console.log({ userAvatar: res.avatar })
                        popupOpenAvatar.style.backgroundImage = `url(${res.avatar})`
                        popupFormAvatar.close();
                    })
                    .catch((err) => {
                        console.log(err); 
                      });
                }
            }
        )
        popupFormAvatar.setEventListeners();

        popupOpenAvatar.addEventListener('click', () => {
            popupFormAvatar.open();
        })
    })
    .catch(err => console.error(err))
    .finally(_ => togglePreloader(false, '.popup__save_avatar'), togglePreloader(false, '.popup__save'), togglePreloader(false, '.popup__save_card'))

///// Открытие попапа с данными профиля
// const userInfoProfile = new UserInfo({
//     name: name,
//     job: job
// })

// popupOpenButton.addEventListener('click', () => {
//     const userItems = userInfoProfile.getUserInfo();
//     nameInput.value = userItems.name;
//     jobInput.value = userItems.job;
//     popupFormProfile.open();
// })

// const popupFormProfile = new PopupWithForm('.popup_profile',
//     {
//         submitForm: (item) => {
//             userInfoProfile.setUserInfo(item)
//             popupFormProfile.close();
//         }
//     })

// popupFormProfile.setEventListeners();




