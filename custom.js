let tg = window.Telegram.WebApp;

tg.MainButton.text = "Back"; //изменяем текст кнопки 
tg.MainButton.show()
Telegram.WebApp.onEvent('mainButtonClicked', function(){
    window.location.href = "https://carrion626.github.io/home.html";
});


