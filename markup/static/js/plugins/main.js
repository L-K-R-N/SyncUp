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
		if (window.scrollY > 34) {
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
	document.querySelector('.header-burger').addEventListener('click', (e) => {
		
		menu.classList.toggle('show')
		document.body.classList.toggle('no-scroll')
	})

	document.querySelector('.header-menu__list').addEventListener('click', (e) => {
		const target = e.target.closest('.header-menu__list__link')

		if (!target) return;

		menu.classList.remove('show');
		document.body.classList.remove('no-scroll')
	})
}

toggleMenu()

// Паралакс

const parallax = (container, elements) => {
	container.addEventListener('mousemove', (e) => {
		let clientX = e.clientX;
		let clientY = e.clientY;
		const containerLeft = container.getBoundingClientRect().left;
		const containerTop = container.getBoundingClientRect().top;

		const coordX = clientX - containerLeft - (container.offsetWidth / 2);
		const coordY = clientY - containerTop - (container.offsetHeight / 2);

		for (let elem of elements) {
			const speed = elem.dataset.speed;
			const x = -(coordX * speed).toFixed(2)
			const y = -(coordY * speed).toFixed(2)
			elem.setAttribute('style', `transform: translate(${x}px, ${y}px)`)
			
		}
	})
}

parallax(document.querySelector('.intro'), document.querySelectorAll('.intro__img'))
parallax(document.querySelector('.intro'), document.querySelectorAll('.circle'))
// Появление первого блока

document.addEventListener('DOMContentLoaded', () => {
	document.querySelector('.intro__title').classList.add('show')
	document.querySelector('.intro__desc').classList.add('show')
	document.querySelector('.intro__info__buttons').classList.add('show')
	document.querySelector('.intro__img-container').classList.add('show')
	console.log(1)
})