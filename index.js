// OVERALL BACKGROUND IMAGE
let backgroundEndpoint =
	'https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature';

fetch(backgroundEndpoint)
	.then((res) => res.json())
	.then((data) => {
		// console.log(data.urls.regular)
		document.body.style.backgroundImage = `url(${data.urls.regular})`;
		document.getElementById('author').textContent = `By: ${data.user.name}`;
	})
	.catch((res) => console.log('error', res));

// CRYPTO CURRENCY UPDATE
const bitcoinEndpoint = 'https://api.coingecko.com/api/v3/coins/bitcoin';
// console.log(CoinEndpoint)
fetch(bitcoinEndpoint)
	.then((res) => res.json())
	.then((data) => {
		document.getElementById('cryptoTitle').innerHTML = `
    <img src=${data.image.small} />
    <span>${data.name}</span>`;

		document.getElementById('cryptoContent').innerHTML = `
      <p> 👌 Current Market Price: USD ${data.market_data.current_price.usd.toLocaleString(
				'en-US',
			)} </p>
      <p> 👍 Highest Price: USD ${data.market_data.high_24h.usd.toLocaleString(
				'en-US',
			)} </p>
      <p> 👎 Lowest Price: USD ${data.market_data.low_24h.usd.toLocaleString(
				'en-US',
			)} </p>
`;
	})
	.catch((err) => console.log(err));

// TIME
function getCurrentTime() {
	const time = new Date();
	document.getElementById('time').textContent = time.toLocaleTimeString(
		'en-us',
		{ timeStyle: 'short' },
	);
}
setInterval(getCurrentTime, 1000);

function getCurrentDate() {
	let currentDate = new Date().toISOString().slice(0, 10);
	document.getElementById('dateDay').textContent = currentDate;
}
getCurrentDate();

// WEATHER
navigator.geolocation.getCurrentPosition((position) => {
	fetch(
		`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`,
	)
		.then((res) => {
			if (!res.ok) {
				throw Error('Weather data not available');
			}
			return res.json();
		})
		.then((data) => {
			// console.log(data)
			const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

			document.getElementById('weather').innerHTML = `
                <img src=${iconUrl} />
                <p class="text-center text-3xl">${Math.round(
									data.main.temp,
								)} °C</p>
                <p class="text-center text-3xl">${data.name}</p>
            `;
		})
		.catch((err) => console.log(err));
});
