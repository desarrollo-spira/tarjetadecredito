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
    //console.log('valid', valid);
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

var lessons = [
    {lesson: 1 , id: "r-jSB78lN_6uKTiU00B5ywjv2wKlOrEg", progress: 0, dataBlockID : "ckxo42rbm00713q6c306nhvyf"},
    {lesson: 2 , id: "Hi55433RIbRbXRSUYjrPESx4Ta8LyaVX", progress: 0, dataBlockID : "ckxo446ao00763q6cs8nr5ehm"},
    {lesson: 3 , id: "g94Tpe8OpeUybq30NgQVCxhbr1njI6FG", progress: 0, dataBlockID : "ckxo45e4q00773q6ctswew1lf"},
    {lesson: 3 , id: "g94Tpe8OpeUybq30NgQVCxhbr1njI6FG", progress: 0, dataBlockID : "ckxo45e4q00773q6ctswew1lf"},
];

function addIds(id) {
    
    let index = lessons.findIndex(e => e.id == id  );
    if(index != -1){

        btnElement = document.querySelector(`[data-block-id="${lessons[index].dataBlockID}"] button`);
        if (btnElement) {
            btnElement.id = `rise-lesson-${lessons[index].lesson}`;
        }
    
        if (lessons[index].lesson == 1) {
            setTimeout(() => {
                document.querySelector('video').classList.add(`rise-lesson-video-${lessons[index].lesson}`);
            }, 300);
        }
        
    }

}


//BCHS
function completeIds() {
    const $a = document.querySelectorAll(".lesson-link");
    let counter = 1;

    // $a.forEach((el) => {
    //     el.setAttribute("id", `step-${counter}`);
    //     counter++;
    // });

    $a.forEach((el) => {
        el.classList.add("link_content_blank");
        let div = document.createElement("div");
            div.setAttribute("id", `step-${counter}`);
            div.classList.add("link_content_blank_div");
        el.insertBefore(div, el.firstChild);
        counter++;
    });

    const $aActive = document.querySelector(".brand--beforeBackground");
    //const id = Number($aActive.getAttribute("id").split("-")[1]);
    const id = Number($aActive.firstChild.getAttribute("id").split("-")[1]);

    setIdLabel("[data-ba='common.continueBtn']", `btn-continue-${id}`);
    setIdLabel(".previous-lesson__link", `btn-prev-${id - 1}`, true);
    setIdLabel(".next-lesson__link", `btn-next-${id + 1}`, true);
    setIdLabel(".quiz-header__start-quiz", 'btn-start-quiz', true);
    setIdLabel(".restart-button__content", 'btn-try-again-quiz', true);
    setIdLabel(".quiz-results__footer a", 'btn-continue-cierre');
    
    // setIdLabel(".quiz-card__button", `btn-send-answer-${idQuestion}`);
    setIdBtnTargetBlank()
}

function setIdLabel($selector, id, add_content_blank = false) {
    const $label = document.querySelector($selector);
    const $id = document.querySelector(id);
    if ($label && !$id) {
        if(!add_content_blank){
                $label.setAttribute("id", id);
        }else{
            $label.classList.add("link_content_blank");
            let div = document.createElement("div");
                div.setAttribute("id", id);
                div.classList.add("link_content_blank_div");
                
            $label.insertBefore(div, $label.firstChild);
        }
    }
}
function setIdBtnTargetBlank() {
    const $btnsTargetBlank =
    document.querySelectorAll('[target="_blank"]');

    $btnsTargetBlank.forEach(($btn) => {
        const href = $btn.getAttribute("href");
        const splitHref = href.split("/");
        let textId = splitHref[splitHref.length - 1].replace("-", "");
        if (!textId) {
        textId = splitHref[splitHref.length - 2].replace("-", "");
        }
        $btn.setAttribute("id", `go-${textId}`);
        //console.log($btn);
    });
  }