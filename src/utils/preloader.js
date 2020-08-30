export const togglePreloader = (show, button) => {
    const preloader = document.querySelector(button)
    if(show) {
        preloader.textContent = 'Сохранение...'
    }
    else{
        preloader.textContent = 'Сохранить'
    }
}