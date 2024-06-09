let items = document.querySelectorAll('.items .item');


let itemsCont = document.querySelector('.items');
function loadItems(){
    fetch('../res/items.json')
      .then(response => response.json())
      .then((json) =>{
          json.forEach((i)=>{
              let cont = document.createElement('div');
              let item = `
                            <div class="item">
                                <div class="img">
                                    <img class="fill" src="${i.img}" alt="">
                                </div>
                                <div class="id">${i.id}</div>
                                <div class="name">${i.name}</div>
                                <div class="price">
                                    <div class="p1">${i.prevPrice}</div>
                                    <div class="p2">${i.currPrice}</div>
                                </div>
                                <div class="btn"><span>Order Now</span></div>
                            </div>
                          `; // your HTML markup string
              cont.innerHTML = item;
            
              // Access elements within the item markup
              let id = cont.querySelector('.id'); // select the img element
              let img = cont.querySelector('.img img'); // select the img element
              let name = cont.querySelector('.name'); // select the name element
              let price = cont.querySelector('.price .p2'); // select the current price element
              
              let co = cont.querySelectorAll('.item');
              co.forEach((m)=>{
                 m.addEventListener('click', (p)=>{
                     let idd = id.textContent;
                     localStorage.setItem('itemId', idd);
                     location.href = '/order.html';
                 })
              })
 
              // Do something with the selected elements
              //console.log(item); // print the image source
              img.addEventListener('click', (l)=>{
                  /*effect here*/
                  
                  img.style.width = '120%'; 
                  img.style.height = '120%'; 
                  img.style.transition = '1s' ;
                  setTimeout(()=>{
                     img.style.width = '100%'; 
                     img.style.height = '100%'; 
  
                  },3000)
              });
              itemsCont.appendChild(cont);
          })
          
      } )
}
loadItems()


// looping through all items to add effect and redirect to order page;
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

        setLocalStaorage(id)
    });
    
});


// set to localstorage and then redirect to order
function setLocalStaorage(id){
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
