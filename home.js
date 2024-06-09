let items = document.querySelectorAll('.container .items .item');

/*
let itemsCont = document.querySelector('.container .items');
function loadItems(){
    fetch('../res/items.json')
      .then(response => response.json())
      .then((json) =>{
          json.forEach((i)=>{
              let cont = document.createElement('div');
              let item = `
                            <div class="item">
                                <div class="img">
                                    <img class="fill" src="apps/legacy.store/images/ei_1705442621563-removebg-preview.png" alt="">
                                </div>
                                <div class="id">${i.id}</div>
                                <div class="name">${i.name}</div>
                                <div class="price">
                                    <div class="p1">${i.prevPrice}</div>
                                    <div class="p2">${i.currPrice}</div>
                                </div>
                                <div class="btn"><span>Order Now</span></div>
                            </div>
                
                         `;
              //console.log(i)
              cont.innerHTML = item;
              itemsCont.appendChild(cont)
              //console.log(cont)
          })
          
      } )
}
loadItems()
*/


// looping through all items;
items.forEach((i) =>{
    let img = i.querySelector('.img img');
    let id = i.querySelector('.id').innerHTML;
    // add eventlistener to each looped items;
    i.addEventListener('click', ()=>{
        // reloop all items;
        items.forEach((e)=>{
            //reset image size to initial 
            let img2 = e.querySelector('.img img');
            img2.style.height = '100%';
            img2.style.width = '100%';
            //reset box shadow to initial 
            e.style.boxShadow = '0px 0px 0px'
        });
        img.style.transition = '1s'
        img.style.height = '120%';
        img.style.width = '120%'

        i.style.boxShadow = '0px 0px 8px #ADADAD80';//add shadow when unclicked
        setLocalStaorage(id)
    });
    
});


// set to localstorage and then redirect to order
function setLocalStaorage(id){
    localStorage.setItem('itemId', id);
    location.href = '../order.html'
    
}


/* Opening  and closing of nav box */
let navBtn = document.querySelector('.header .navbtn');
let navBox = document.querySelector('.header .navbox');
let toggleStatue = 'ON';

navBtn.addEventListener('click', ()=>{
    if (toggleStatue == 'ON'){
        //turned on;
        navBox.style.transition = '.3s';
        navBox.style.height = '220px';
        
        toggleStatue = 'OFF'
    }else{
        //turned off;
        navBox.style.height = '0px'
        
        toggleStatue = 'ON'
    }
})



const texts = [
    ['Best', 'High', 'Luxurious'],
    ['High', 'Superior', 'Premium'],
    ['Great', 'Top-notch', 'Elite']
];
let index = 0;

function changetxt() {
    let el1 = document.querySelector('.container .hd .anim1');
    let el2 = document.querySelector('.container .hd .anim2');
    let el3 = document.querySelector('.container .hd .anim3');
    el1.textContent = texts[index][0];
    el2.textContent = texts[index][1];
    el3.textContent = texts[index][2];
    index = (index + 1) % texts.length;
    
    
    el1.style.transition = '.2s';
    el1.style.opacity = '1';
    el1.style.fontSize = '30px';
    
    el2.style.transition = '.2s';
    el2.style.opacity = '1';
    el2.style.fontSize = '30px';
    
    el3.style.transition = '.2s';
    el3.style.opacity = '1';
    el3.style.fontSize = '30px';

    
    setTimeout(()=>{
        el1.style.fontSize = '25px';
        el1.style.opacity = '0';
        el2.style.fontSize = '25px';
        el2.style.opacity = '0';
        el3.style.fontSize = '25px';
        el3.style.opacity = '0';
    },300)
}

setInterval(changetxt, 700);