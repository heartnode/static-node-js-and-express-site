[...document.querySelectorAll('img.thumbnail')].forEach((thumbnail)=>{

    thumbnail.addEventListener('mouseover',(e)=>{
        console.log('mouseover');
    })
});