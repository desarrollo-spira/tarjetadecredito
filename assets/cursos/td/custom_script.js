function valid_avance(cap) {
    setTimeout(() => {
        console.log('here1');
        let remesas_avance = localStorage.remesas_avance ? JSON.parse(localStorage.remesas_avance) : [];
        let avance = remesas_avance[cap];
        if (avance == 100) {
            addBtnContinue()
        }

        let bar;
        if (cap == 1) {
            bar = document.querySelector('.progress__indicator.brand--background');
        } else {
            bar = document.querySelector('.progress-bar__fill');
            console.log('here2', bar);
        }

        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === "attributes") {
                    let av;
                    if (cap == 1) {
                        av = bar.style.transform.split(',')[0].slice(12).replace('%', '');
                    } else {
                        console.log('here3');
                        av = bar.style.width.replace('%', '');
                    }
                    update_avance(cap, av)
                }
            });
        });

        observer.observe(bar, {
            attributes: true //configure it to listen to attribute changes
        });
    }, 500);
}

function addBtnContinue() {
    let valid = document.querySelector('.content-btn-next-rise');
    console.log('valid', valid);
    if (!valid) {
        let div = document.createElement("div");
        div.className = "content-btn-next-rise"
        let link = document.createElement("a");
        link.innerText = "CONTINUAR J";
        link.href = '/tarjetadecredito/curso.html'
        div.appendChild(link);

        // document.querySelector('section').appendChild(div);

        document.querySelector('.blocks-lesson').appendChild(div);


        // let btn = `
        //         <div style="padding-top: 30px; padding-bottom: 30px;">
        //             <div>
        //                 <div class="animated fadeIn" style="animation-duration: 0.75s; opacity: 1; animation-delay: 0s;">
        //                     <div class="block-text--onecol">
        //                         <div class="block-text__container">
        //                             <div class="block-text__row">
        //                                 <div class="block-text__col">
        //                                     <a class="continue-btn brand--background" href="/tarjetadecredito/curso.html">CONTINUAR</a>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     `;

    }
}

function update_avance(cap, av) {
    let remesas_avance = localStorage.remesas_avance ? JSON.parse(localStorage.remesas_avance) : [];
    let largo = remesas_avance.length;
    if (largo == 0) {
        remesas_avance = `{"${cap}":${av}}`;
        localStorage.setItem('remesas_avance', remesas_avance);
    } else {
        remesas_avance[cap] = av;
        localStorage.setItem('remesas_avance', JSON.stringify(remesas_avance));
    }
    console.log('av', av);
    if (av == 100) {
        addBtnContinue();
    }
}

// function clickBody() {
//   remesas_avance = localStorage.remesas_avance ? JSON.parse(localStorage.remesas_avance) : [];

//   let largo = remesas_avance.length;
//   if (largo == 0) {
//     remesas_avance = {cap:100};
//   }else{
//     remesas_avance[cap] = 100;
//   }
//   localStorage.setItem( 'remesas_avance' , JSON.stringify(remesas_avance));

//   addBtnContinue();
// }