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
