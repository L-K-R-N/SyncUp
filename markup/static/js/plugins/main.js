
new WOW({
	mobile: false
}).init();


// Custom select
if (document.querySelector(".custom-select-field")) {
	for (const dropdown of document.querySelectorAll(".custom-select-field")) {
		dropdown.addEventListener("click", function () {
			this.closest("[data-select]").classList.toggle("open")
		})
	}

	for (const option of document.querySelectorAll(".custom-select-options ul > li")) {
		option.addEventListener("click", function () {
			if (!this.classList.contains("selected")) {
				let select = this.closest("[data-select]")
				let selectInput = select.querySelector("input[type=hidden]")
				let selected = this.getAttribute("data-value")
				this.parentNode.querySelector("li.selected").classList.remove("selected")
				this.classList.add("selected")
				select.querySelector(".custom-select-field div").textContent = this.textContent
				select.setAttribute("data-select", selected)
				selectInput.value = selected
				select.classList.remove("open")
			}
		})
	}

	window.addEventListener("click", function (e) {
		for (const select of document.querySelectorAll("[data-select]")) {
			select.classList.remove("error")
			if (!select.contains(e.target)) {
				select.classList.remove("open")
			}
		}
	})
}


// Tabs

// При нажатии на заголовок таба, считывается значение его атрибута data-tab. 
// Далее ему и блоку с соответствующим значением атрибута 'data-tab' присваивается класс 'active-tab', а всем остальным блокам и заголовкам, у которых есть такой атрибут, класс 'active-tab' снимается


const tabPlugin = (header) => {
	
	header.addEventListener('click', (e) => {
		const target = e.target.closest('.prices-tabs__container-title');
		if (!target) return;

		

		for (let elem of document.querySelectorAll('[data-tab]')) {
			elem.classList.remove('active-tab');

			if (elem.getAttribute('data-tab') === target.getAttribute('data-tab')) {
				elem.classList.add('active-tab')
				target.classList.add('active-tab')
			}
		}
	})
}

tabPlugin(document.querySelector('.prices-tabs__header'));

// При нажатии на блок с вопросами, проверяем нажатие на хедер.
// Если у хедера есть класс 'active-accordion', убираем этот класс.
// Если класса нет, убираем его у всех других блоков и добавляем тому, на который нажали

const accordion = (cards) => {

	cards.addEventListener('click', (e) => {
		const target = e.target.closest('.questions__card-header')

		if (!target) return;

		const targetContent = document.getElementById(target.dataset.accordion)
		
		if (targetContent.classList.contains('active-accordion')) {
			targetContent.classList.remove('active-accordion');
			target.classList.remove('active-accordion');
			targetContent.style.height = 0;
			

		} else {
			for (let answer of document.querySelectorAll('.questions__card-answer')) {
				answer.classList.remove('active-accordion')
				answer.style.height = 0;

			}
			for (let header of document.querySelectorAll('.questions__card-header')) {
				header.classList.remove('active-accordion')
			}
			targetContent.classList.add('active-accordion')
			target.classList.add('active-accordion')
			targetContent.style.height = targetContent.scrollHeight + 'px';
			
		}
	})
}

accordion(document.querySelector('.questions__cards'))

// изменение цвета header'a

const changeHeaderBg = (header) => {
	document.addEventListener('scroll', () => {
		if (window.scrollY > 0) {
			header.classList.add('fixed')
			
		} else {
			header.classList.remove('fixed')
		}
	})
}

changeHeaderBg(document.querySelector('.header'))

// Появление / скрытие меню

// При клике на бургер будет проверяться наличие у меню класса 'show'
// Если он есть, то убираем, если нет, тогда добавляем

const toggleMenu = () => {
	const menu = document.querySelector('.header-menu')
	const list = document.querySelector('.header-menu__list')
	const burger = document.querySelector('.header-burger');
	document.querySelector('.header-burger').addEventListener('click', (e) => {
		
		menu.classList.toggle('show')
		burger.classList.toggle('show')
		document.body.classList.toggle('no-scroll')
		
		
		
	})

	document.querySelector('.header-menu__list').addEventListener('click', (e) => {
		// const target = e.target.closest('.header-menu__list__link')

		if (e.target.classList.contains('header-menu__list')) {
			console.log(1)
			menu.classList.remove('show');
			burger.classList.remove('show')
			document.body.classList.remove('no-scroll')
		}

		if (!e.target.closest('.header-menu__list__link')) return;

		menu.classList.remove('show');
		burger.classList.remove('show')
		document.body.classList.remove('no-scroll')

		
		
	})
}

toggleMenu()

// Паралакс

const mouseParallax = (container, elements) => {
	container.addEventListener('mousemove', (e) => {
		let clientX = e.clientX;
		let clientY = e.clientY;
		const containerLeft = container.getBoundingClientRect().left;
		const containerTop = container.getBoundingClientRect().top;

		const coordX = clientX - containerLeft - (container.offsetWidth / 2);
		const coordY = clientY - containerTop - (container.offsetHeight / 2);

		for (let elem of elements) {
			const speed = elem.dataset.mousespeed;
			const x = -(coordX * speed).toFixed(2)
			const y = -(coordY * speed).toFixed(2)
			elem.setAttribute('style', `transform: translate(${x}px, ${y}px)`)
			
		}
	})
}

// mouseParallax(document.querySelector('.intro'), document.querySelectorAll('.intro__img'))
// parallax(document.querySelector('.intro'), document.querySelectorAll('.circle'))
// Появление первого блока



// document.addEventListener('DOMContentLoaded', () => {
// 	new WOW().init();
// })



const scrollParallax = () => {
	document.addEventListener('scroll', () => {
		for (let elem of document.querySelectorAll('.scrollParallax')) {
			const speed = elem.dataset.scrollspeed || 5;
			console.log(speed)
			elem.setAttribute('style', `transform: translateY(${(window.scrollY / speed)}px)`)
		}
	})
	
}

scrollParallax();



(function() {
	let open = document.querySelector('.call-main')
	let menu = document.querySelector('.call')
	open.addEventListener("click", () => {
	menu.classList.toggle('active');
	})
})()


// Scroll to anchors
// (function () {

//     const smoothScroll = function (targetEl, duration) {
//         const headerElHeight =  document.querySelector('.header').clientHeight;
//         let target = document.querySelector(targetEl);
//         let targetPosition = target.getBoundingClientRect().top - headerElHeight;
//         let startPosition = window.pageYOffset;
//         let startTime = null;
    
//         const ease = function(t,b,c,d) {
//             t /= d / 2;
//             if (t < 1) return c / 2 * t * t + b;
//             t--;
//             return -c / 2 * (t * (t - 2) - 1) + b;
//         };
    
//         const animation = function(currentTime){
//             if (startTime === null) startTime = currentTime;
//             const timeElapsed = currentTime - startTime;
//             const run = ease(timeElapsed, startPosition, targetPosition, duration);
//             window.scrollTo(0,run);
//             if (timeElapsed < duration) requestAnimationFrame(animation);
//         };
//         requestAnimationFrame(animation);

//     };

//     const scrollTo = function () {
//         const links = document.querySelectorAll('.js-scroll');
//         links.forEach(each => {
//             each.addEventListener('click', function () {
//                 const currentTarget = this.getAttribute('href');
//                 smoothScroll(currentTarget, 1000);
//             });
//         });
//     };
//     scrollTo();
// }());





// 	form.addEventListener('submit', (e) => {
		

		
// 	})



const inputValidate = (input) => {
	
	
		if (input.value.trim() === "") {
			onError(input, 'Не указано имя')
			
		} else {
			onValid(input);
			return true;
		}
	
	
	
}

const emailValidate = (email) => {
	if (email.value.trim() === '') {
		onError(email, 'Не указана почта')
		
	} else if (!isValidEmail(email.value.trim())) {
		console.log(1)
		onError(email, 'Неверно указана почта')
		
	} else {
		onValid(email)
		return true;
	}
}

document.querySelector('.consultation__form-button')
.addEventListener('click', (e) => {
	e.preventDefault();
	if (!inputValidate(document.querySelector('#consultation__input-name')) || !emailValidate(document.querySelector('#consultation__input-email'))) {
		return;
	} else {
		
		const form = document.forms.consultation;
		const submit = document.querySelector('.consultation__submit');
		submit.classList.add('active');
		setTimeout(() => {
			submit.classList.remove('active');

			for (let elem of document.querySelectorAll('.consultation__form-element')) {
				elem.value = ''
				elem.classList.remove('valid')
			}
		}, 1500)

	}
	

	
})


const onError = (input, text) => {
	const id = input.id;
	const message = document.querySelector(`[for="${id}"]`);
	input.classList.remove('valid');
	input.classList.add('error');
	message.innerText = text;
	message.classList.add('active')
}

const onValid =(input) => {
	const id = input.id;
	const message = document.querySelector(`[for="${id}"]`);
	input.classList.add('valid');
	input.classList.remove('error');
	message.innerText = '';
	message.classList.remove('active')

}

const isValidEmail = (email) => {
	return /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i.test(email)
}


const submitForm = () => {
	
	
}




// const formValidate = () => {

// 	const form = document.forms.consultation;

// 	form.addEventListener('submit', (e) => {
// 		console.log(1)
// 		for (let elem of document.querySelectorAll('.consultation__form-element')) {
// 			const value = elem.value;
// 			const id = elem.id;
// 			const label = document.querySelector(`[for="${id}"]`);

			
// 			if (!value) {
// 				label.classList.add('.show')
// 			} else {
// 				label.classList.remove('.show')
// 			}
// 		}

		
		

// 		// if (!e.target.value) {
					
// 		// 	console.log(label)
// 		// 	label.classList.add('show')
// 		// } else {
// 		// 	label.classList.remove('show')
// 		// }
// 		// switch(id) {

// 		// 	case 'consultation__input-name': 

				
// 		// 		break;

// 		// 	case 'consultation__input-email': 

// 		// 		break;
// 		// }
// 	})
// }

// formValidate()