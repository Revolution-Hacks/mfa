import qs from 'qs';
// Add case-insenstitive (`i`) modifier to regex. (we can't lowercase the message body before matching incase some codes are alpha case-sensitive)
// Make sure the code is in capture group 1
const regex = [
	// Bill.com + PayPal
	/code: (\d+)/i,
	// Bill.com + SVB
	/code is (\d+)/i,
	// Bill Pay (payee activation)
	/activation code for.*is (\d+)/,
	// Twilio + BitClout + Clubhouse
	/code is: (\d+)/i,
	// SendGrid
	/code for SendGrid: (\d+)/i,
	// Stripe
    /code is: (\d{3}-\d{3})/i,
	// Namecheap
	/code - (\d+)/i,
	// Google
	/(G-\d+) is your Google/i,
	// TikTok
	/\[TikTok\] (\d+) is your verification/i,
	// generic — from '443-98' short code
	/(\d+) is your verification code/i,
	// Authy
	/manually enter: (\d+)/i,
	// last ditch resorts
	/code:? ?(\d+)/i,
	/(\d+) is your/i,
	/(\d{4,8})/,
	/(\d+)/,
];

export async function POST(request) {
	let code;
	const parsedBody = qs.parse(await request.text());
	const { Body, From } = parsedBody;
	regex.forEach((re) => {
		const match = Body.match(re);
		if (match) {
			console.log(`Received code: ${match[1]} from ${From}`);
			code = match[1];
		}
	});
	// Send message
	let req = await fetch("https://slack.com/api/chat.postMessage", {
		method: "POST",
		headers: {
			"Content-type": "application/json",
			"Authorization": `Bearer ${process.env.SLACK_BOT_TOKEN}`,
		},
		body: JSON.stringify({
			channel: "C07NE41NJAU",
			text: `\`${code}\`\nRaw Message: \`${Body}\`\nFrom: ${From}`,
		}),
	})
	console.log(await req.text())
}