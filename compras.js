// Variables
window.onload = function () {
	let $items = document.querySelector('#items');
	let carrito = [];
	let total = 0;
	let $carrito = document.querySelector('#carrito');
	let $total = document.querySelector('#total');

	let baseDeDatos = [
		{
			id: 1,
			nombre: ' HP Gaming Pavilion - 15-cx0140tx',
			precio: 10000,
			src: 'hp.jpg'
		},
		{
			id: 2,
			nombre: 'Notebook HP Pavilion x360 14-cd0009la',
			precio: 12999,
			src: 'hp2.jpg'
		},
		{
			id: 3,
			nombre: ' HP 24-F0035A 23.8" All-in-One PC',
			precio: 10999,
			src: 'hp3.jpg'
		},
		{
			id: 4,
			nombre: 'Notebook HP 15ab106la',
			precio: 16000,
			src: 'hp4.jpg'
		},
		{
			id: 5,
			nombre: 'HP 24-R018LA AIO',
			precio: 12000,
			src: 'hp5.jpg'
		}
	];

	/**
	 * Renderiza los elementos del array baseDeDatos
	 * @author Ricardo Mena
	 */
	function renderItems() {
		for (let info of baseDeDatos) {
			// Crea una nueva fila
			var newTableRow = document.createElement('tr');

			// Crea el contenido de la columna "computadores"
			var tdImage = document.createElement('td');
			var foto = document.createElement('img');
			foto.setAttribute('src', info ['src']);
			tdImage.appendChild(foto);

			// Crea el contenido de la columna "articulo"
			var tdDescription = document.createElement('td');
			var ul = document.createElement('ul')
			var li = document.createElement('li')
			li.innerHTML = '<h3>' + info['nombre'] + '</h3>'
			ul.appendChild(li);
			tdDescription.appendChild(ul)

			// Crea el contenido de la columna "precios"
			var tdPrice = document.createElement('td');
			tdPrice.setAttribute('bgcolor', 'grey');
			tdPrice.style['text-align'] = 'center';
			var buttonPrice = document.createElement('button');
			buttonPrice.setAttribute('data-id', info['id']);

			// Agrega un evento al boton
			buttonPrice.addEventListener('click', anyadirCarrito);

			buttonPrice.innerText = info['precio'];
			tdPrice.appendChild(buttonPrice);

			// Agrega cada celda a la nueva fila
			newTableRow.appendChild(tdImage);
			newTableRow.appendChild(tdDescription);
			newTableRow.appendChild(tdPrice);

			// Por ultimo agrega la fila a la tabla
			$items.appendChild(newTableRow);
		}
	}

	/**
	 * Agrega un elemento al carrito de compras
	 * @author Ricardo Mena
	 */
	function anyadirCarrito(evt) {
		var idItem = this.getAttribute('data-id');

		// Verifica si el producto ya existe en el carrito
		var exist = carrito.filter(function(itemIn) {
			return idItem == itemIn;
		});

		// Anyadimos el Nodo a nuestro carrito
		carrito.push(idItem);

		// Calculo el total
		calcularTotal();

		// Renderizamos el carrito
		renderizarCarrito();

	}

	/**
	 * Renderiza el carrito cada que se agrega un item
	 * @author Ricardo Mena
	 */
	function renderizarCarrito() {
		// Vaciamos todo el html
		$carrito.textContent = '';
		// Generamos los Nodos a partir de carrito
		carrito.forEach(function (item, indice) {
			// Obtenemos el item que necesitamos de la variable base de datos
			let miItem = baseDeDatos.filter(function (itemBaseDatos) {
				return itemBaseDatos['id'] == item;
			});

			// Creamos el nodo del item del carrito
			let miNodo = document.createElement('li');
			miNodo.classList.add('list-group-item', 'text-right');
			miNodo.textContent = `${miItem[0]['nombre']} - ${miItem[0]['precio']}$`;

			// Boton de borrar
			let miBoton = document.createElement('button');
			miBoton.classList.add('btn', 'btn-danger', 'mx-5');
			miBoton.textContent = 'X';
			miBoton.setAttribute('posicion', indice);
			miBoton.addEventListener('click', borrarItemCarrito);
			//Contador
			document.getElementById("contador").innerHTML = carrito.length;
			// Mezclamos nodos
			miNodo.appendChild(miBoton);
			$carrito.appendChild(miNodo);

		})
	}

	/**
	 * Renderiza el carrito y recalcula el total
	 * @author Ricardo Mena
	 */
	function borrarItemCarrito() {
		// Obtenemos la posicion que hay en el boton pulsado
		let posicion = this.getAttribute('posicion');
		// Borramos la posicion que nos interesa
		carrito.splice(posicion, 1);
		// volvemos a renderizar
		renderizarCarrito();
		// Calculamos de nuevo el precio
		calcularTotal();
		
	}

	/**
	 * Calcula el total de la compra
	 * @author Ricardo Mena
	 */
	function calcularTotal() {
		// Limpiamos precio anterior
		total = 0;

		// Recorremos el array del carrito
		for (var item of carrito) {
			// De cada elemento obtenemos su precio
			var miItem = baseDeDatos.filter(function (itemDb) {
				return itemDb['id'] == item;
			});

			if (miItem.length) {
				total = total + miItem[0]['precio'];
			}

		}

		// Formateamos el total para que solo tenga dos decimales
		var totalDosDecimales = total.toFixed(2);

		// Renderizamos el precio en el HTML
		$total.textContent = totalDosDecimales;
	}

	// Eventos
	// Inicio
	renderItems();
}
