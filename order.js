    let itemFeatures = document.querySelector('.main .dits .contents .more .feature');
    let customPhoto = document.querySelector('.main .dits .contents .bx .img');
    let customText = document.querySelector('.main .dits .contents .bx .txt');
    let moreInformation = document.querySelector('.main .dits .txt');
    let prevPrice = document.querySelector('.main .imgPart .price .p1');
    let currPrice = document.querySelector('.main .imgPart .price .p2');
    let itemPhoto = document.querySelector('.main .imgPart .img');
    let itemGallery = document.querySelector('.main .imgPart .gallery .imgs');
    let itemImage = document.querySelector('.main .imgPart .name');
    //let gallery = document.querySelector('');
    
    // item constructor (boject)
    function item (id, img, nm, p1, p2, gal, moinf, cubx, cubxinf, featu){
        this.id = id;
        this.image =  img;
        this.name =  nm;
        this.prevPrice = p1;
        this.currPrice = p2;
        this.gallery = gal;
        this.moreInfo = moinf;
        this.customBox = cubx;
        this.customBoxInfo = cubxinf;
        this.features = featu;
    }
    
    // fetch item json with id stored in the local storage ;
    function loadId(){
        fetch('../res/items.json')
        .then(response => response.json())
        .then((json) =>{
            json.forEach((i)=>{
                let storedId = localStorage.getItem('itemId')
                let id = i.id;
                if (id == storedId){
                    let ite = json[storedId-1];
                    let itm = new item(ite.id, ite.img, ite.name, ite.prevPrice, ite.currPrice, ite.gallery, ite.moreInfo, ite.customBox, ite.customBoxInfo, ite.features);
                    load(itm)
                }
            });
        });
    };loadId();
    
    
    // Get item 
    function load(item){
        if (localStorage.getItem('itemId') !== null){
            //console.log(item.id)
            // create image elem and apend it to item
            let img = document.createElement('img');
            img.setAttribute('src', item.image);
            img.setAttribute('class', 'fill');
            itemPhoto.appendChild(img);
            // append item value 
            itemImage.innerHTML = item.name;
            // append gallery to function
            loadGallery(item.gallery);
            // append price to function
            loadPrice(item.prevPrice, item.currPrice);
            // add more info
            loadInfo(item.moreInfo);
            // load custom photo && text
            loadCustomPhoto(item.customBox, item.customBoxInfo);
            // load item features 
            loadFeature(item.features)
        }else{
            window.location.href = '../home.html';
        }
    }
    
    // Load gallery of item
    function loadGallery(gal){
        gal.forEach((e) => {
            let imgCont = `
                            <div class="img">
                                <img src='${e}' class='fill'></img>
                            </div>
                          `;
            let cont = document.createElement('div');
            cont.innerHTML = imgCont;
            itemGallery.appendChild(cont);    
        })
    }
    
    
    
    // Load price of item
    function loadPrice(p1, p2){
        prevPrice.innerHTML = p1;
        currPrice.innerHTML = p2;
    }
    
    
    // Load more info txt of item
    function loadInfo(more) {
        moreInformation.innerHTML = more;
        //console.log(more)
    }
    
    // Load custom
    function loadCustomPhoto(photo, text) {
        //load img
        let img = `<img src='${photo}' class='fill'></img>`;
        customPhoto.innerHTML = img;
        //load txt
        customText.innerHTML = text;
    }
    
    
    // load features
    function loadFeature(ftr){
        ftr.forEach((e) =>{
            let ul = document.createElement('ul');
            let li = `<li>${e}</li>`;
            ul.innerHTML = li;
                itemFeatures.appendChild(ul)
        });
        //let ftrCont = 
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
    
    
    
    // FORM SUBMITION
    const form = {
        cont: document.querySelector('.orderform'),
        
        inp: {
            surname: document.querySelector('.no1 input'),
            name: document.querySelector('.no2 input'),
            state: document.querySelector('.no3 input'),
            LGA: document.querySelector('.no4 input'),
            email: document.querySelector('.no5 input'),
            phone: document.querySelector('.no6 input'),
            quantity: document.querySelector('.no7 input'),
            amount: document.querySelector('.no8 input'),
            errorMsg: document.querySelector('.orderform .errMsg'),
            errorMg: document.querySelector('.orderform .errMsg span'),
            btn: document.querySelector('.btn span')
        }
        
    }
    
    
    
    
    // always make a calculation to multiply the amount by the quantity 
    form.inp.quantity.value = 1;
    setInterval(() =>{
        let quant = form.inp.quantity.value;
        let initial_amt = currPrice.innerHTML;
        form.inp.amount.value = quant * initial_amt
        //console.log(amt)
    },0);
    
    
    
    let sdbtn = form.cont.querySelector('.btn span');
    sdbtn.addEventListener('click', processForm);
    let err = 'Please fill all fields';
    function processForm() {
        let els = form.inp;
        if (els.surname.value === '' || els.name.value === '' || els.state.value === '' || els.LGA.value === '' || els.email.value === '' || els.phone.value === '' || els.quantity.value === '') {
            els.errorMsg.style.height = "50px";// enable error box
            els.errorMsg.style.width = "100%";// enable error box
            els.errorMsg.style.padding = "0px 10px";// enable error box
            setTimeout(()=>{
                els.errorMg.innerHTML = err;
            }, 500);
        } else {
            els.errorMsg.style.height = "0px";// disable error box
            els.errorMsg.style.width = "0px";// disable error box
            els.errorMsg.style.padding = "0px 0px";// enable error box
            els.errorMg.innerHTML = "";
            // use axios to submit inputs to the process file...
            // values of inputs 
            let snm = els.surname.value,
                nm = els.name.value,
                st = els.state.value,
                lga = els.LGA.value,
                em = els.email.value,
                ph = els.phone.value,
                qu = els.quantity.value,
                am = els.amount.value,
                productId = localStorage.getItem('itemId');
                
                axios.post('../extra/sendForm.php', {
                    surname: snm,
                    name: nm,
                    state: st,
                    LGA: lga,
                    email: em,
                    phone: ph,
                    quantity: qu,
                    amount: am,
                    product_id: productId
                })
                .then(function(response) {
                    if (response.status == 200){
                        alert('sent');
                        alert(response.data);
                    }else{
                        console.log('failed')
                    }
                })
                .catch(function(error) {
                    console.error('Error:', error);
                });
        }
    }