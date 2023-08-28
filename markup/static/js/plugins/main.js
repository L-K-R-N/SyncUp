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
			targetContent.style.height = 0;

		} else {
			for (let elem of document.querySelectorAll('.questions__card-answer')) {
				elem.classList.remove('active-accordion')
				elem.style.height = 0;
			}
			targetContent.classList.add('active-accordion')
			targetContent.style.height = targetContent.scrollHeight + 'px'
		}
	})
}

accordion(document.querySelector('.questions__cards'))
