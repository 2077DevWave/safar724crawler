/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request, env, ctx) {
	  const url = new URL(request.url);
	  const date = url.searchParams.get("Date");
	  const destination = url.searchParams.get("Destination");
	  const origin = url.searchParams.get("Origin");
  
	  if (!date || !destination || !origin) {
		return new Response("Missing parameters: Date, Destination, and Origin are required.", { status: 400 });
	  }
  
	  const targetUrl = `https://service.safar724.com/buses/api/bus/route?Date=${encodeURIComponent(date)}&Destination=${encodeURIComponent(destination)}&Origin=${encodeURIComponent(origin)}`;
  
	  let response = await fetch(targetUrl, {
		method: "GET",
		headers: {
		  "Host": "service.safar724.com",
		  "Sec-Ch-Ua-Platform": "\"Linux\"",
		  "Accept-Language": "en-US,en;q=0.9",
		  "Accept": "application/json, text/plain, */*",
		  "Sec-Ch-Ua": "\"Not?A_Brand\";v=\"99\", \"Chromium\";v=\"130\"",
		  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.6723.70 Safari/537.36",
		  "Sec-Ch-Ua-Mobile": "?0",
		  "Origin": "https://safar724.com",
		  "Sec-Fetch-Site": "same-site",
		  "Sec-Fetch-Mode": "cors",
		  "Sec-Fetch-Dest": "empty",
		  "Referer": "https://safar724.com/",
		  "Accept-Encoding": "gzip, deflate, br",
		  "Priority": "u=1, i"
		}
	  });

	  response = await response.json();
	  response.items = response.items.map(item => {
		item.buy_link = `https://safar724.com/checkout/${response.originCode}/${response.originEnglishName}/${response.destinationCode}/${response.destinationEnglishName}/${response.date}/${item.id}-${item.destinationCode}#step-reserve`;
		return item;
	  });
  
	  const data = JSON.stringify(response); // might be gzipped or plain JSON
	  return new Response(data, {
		status: response.status,
		headers: { "Content-Type": "application/json" }
	  });
	}
  }
  
