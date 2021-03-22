let Bundle = {
	id : { type : 'json', file:'',url:''}
}

let data = null;
let url = 'http://localhost/ajax2/firma.json';
let getBundle = () => {
	
	const xhr = new XMLHttpRequest();
	xhr.responseType = 'json';
	xhr.open('GET', url, async = true);
	xhr.send();
	console.log(xhr.response);
	xhr.addEventListener('readystatechange', e => {
		if (xhr.readyState !== 4) {
			console.log(xhr.readyState);

		}
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				console.log('server works correct (code: 200)');
				console.log(xhr.response);
			}
			if (xhr.status === 404) {
				console.log("error 404");
			}
			if (xhr.status === 500) {
				console.log("error 500")
			}
			if (xhr.status === 503) {
				console.log("error 503")
			}
		}
	}, false) xhr.addEventListener('load', e => {
		console.log(xhr.response);
		data = xhr.response;

		if (data !== null) {
			let i = 1;
			let timeInt = 1000;
			let t1 = setInterval(function () {
					if (i === data.lenght - 1)
						clearInterval(t1);
					insItem(i++, data[i - 1]);
				}
				timeInt);
			data.forEach(item => insItem(i++, item));
			
		}
	}, false)
}

let insItem = (i, item) => {
	let main = document.querySelector('#main')
	let tpl = document.querySelector('#rowTplt')
	let r2 = tpl.content.cloneNode(true);
	let rid = r2.querySelector('#row-');
	rid.id = rid.id + 1;
	let cells = r2.querySelectorAll('p');
	cells[0].textContent = i;
	cells[1].textContent = item.imie;
	cells[2].textContent = item.nazwisko;
	cells[3].textContent = item.stanowisko;
	main.appendChild(r2);
}
window.addEventListener("load", getBundle, false);
