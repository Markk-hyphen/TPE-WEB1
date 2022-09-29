
/*
let photos = ['img/escudo.jpeg', 'img/real_logo.png', "img/chucky1.jpg", "img/chucky2.jpg", "img/chucky3.jpg", "img/chucky.jpg"]
let photoI = 0; //photo Index
let nxtBtn = document.querySelector(".right");
let prvBtn = document.querySelector(".left");
let img = document.getElementById("imagen");


nxtBtn.addEventListener("click", ()=>{
    if (photoI == (photos.length - 1))
    {
        photoI = 0;
        img.removeAttribute("src");
        img.setAttribute("src", photos[photoI]);
    }else{
        photoI++;
        img.removeAttribute("src");
        img.setAttribute("src", photos[photoI]);
    }
});

prvBtn.addEventListener("click", ()=>{
    if (photoI == 0)
    {
        photoI = photos.length - 1;
        img.removeAttribute("src");
        img.setAttribute("src", photos[photoI]);
    }else{
        photoI--;
        img.removeAttribute("src");
        img.setAttribute("src", photos[photoI]);
    }
});


setInterval(changePhoto, 1500);

function changePhoto()
{   
    let leng = photos.length;
    let rand = Math.floor(Math.random() * leng);
    while (rand == photoI)
    {
        rand = Math.floor(Math.random() * leng);
    }
    photoI = rand;
    img.removeAttribute("src");
    img.setAttribute("src", photos[photoI]);
}
