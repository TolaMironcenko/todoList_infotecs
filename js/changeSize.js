var isResizing = false,
	lastDownX = 0;

(() => {
	var container = document.querySelector(".list-and-edit"),
		left = document.querySelector(".todoList"),
		right = document.querySelector(".edit-block"),
		handle = document.getElementById("drag");
	// console.log(container.clientWidth*0.3)

	handle.onmousedown = function (e) {
		isResizing = true;
		lastDownX = e.clientX;
	};

	document.onmousemove = function (e) {
		// we don't want to do anything if we aren't resizing.
		if (!isResizing) {
			return;
		}

		var offsetRight = container.clientWidth - (e.clientX - container.offsetLeft);
		// console.log(offsetRight)

		if (offsetRight < container.clientWidth * 0.5) {
			left.style.right = container.clientWidth * 0.5 + "px"
			right.style.width = container.clientWidth * 0.5 + "px"
			handle.style.cursor = "w-resize"
		} else {
			if (offsetRight > container.clientWidth - container.clientWidth * 0.3) {
				left.style.right = container.clientWidth - container.clientWidth * 0.3 + "px"
				right.style.width = container.clientWidth - container.clientWidth * 0.3 + "px"
				handle.style.cursor = "e-resize"
			} else {
				left.style.right = offsetRight + "px"
				right.style.width = offsetRight + "px"
				handle.style.cursor = "col-resize"
			}
		}

		// left.style.right = offsetRight < container.clientWidth*0.5 ? container.clientWidth*0.5 + "px" : offsetRight + "px"; 
		// right.style.width = offsetRight < container.clientWidth*0.5 ? container.clientWidth*0.5 + "px" : offsetRight + "px"; 
	}

	document.onmouseup = function (e) {
		// stop resizing
		isResizing = false;
	}
})();