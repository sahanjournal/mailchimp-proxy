# Mailchimp API Proxy with Netlify

This project sets up a secure serverless API proxy using Netlify to add users to a newsletter list on Mailchimp without exposing the API key on the frontend. 

***This code is based on THE CITY's [Active Campaign API Proxy](https://github.com/thecityny/active-campaign-proxy)***

## Setup

1. Clone this repo and deploy it to [Netlify](www.netlify.com).
2. In your Netlify dashboard, go to your project settings and add the following environment variables:

- `MAILCHIMP_API_KEY` – Your Mailchimp API key
- `MAILCHIMP_AUDIENCE_ID` – The ID for the specific newsletter list to subscribe an email address. 

You can get these credentials from your Mailchimp admin account page.

3. Make sure the "Build command" is set to `npm install` and the Functions directory is set to `netlify/functions`.
4. Redeploy your project after setting environment variables.

## Usage

Send a POST request to `.netlify/functions/subscribe` with a JSON body like:

```json
{
  "email": "user@example.com",
  "city": "st-paul"
}
```

This will add the user to your Mailchimp list and assign them a tag of "Meet Your Mayor St. Paul".

## Example Usage

See the [NewsletterSignup component](https://github.com/thecityny/2025-meet-your-mayor/blob/main/src/components/NewsletterSignup.tsx) inside the [Meet Your Mayor 2025 codebase](https://github.com/thecityny/2025-meet-your-mayor/tree/main) for an example of how we use this API proxy in production. 
