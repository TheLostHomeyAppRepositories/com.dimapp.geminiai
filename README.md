# Gemini for Homey

**Send prompts to Google Gemini from Homey Flows and use the AI's answer in your automations.**

This Homey app integrates Google's Gemini AI (gemini-1.5-flash model) into your smart home ecosystem, allowing you to create intelligent automations powered by generative AI. Send prompts to Gemini directly from Homey Flows and use the AI responses to make your home smarter and more responsive.

## Features

- **Flow Action**: "Send Prompt" action card that accepts text prompts and returns AI-generated responses
- **Token Support**: Returns an "answer" token that can be used in subsequent Flow cards
- **API Key Management**: Simple settings interface to securely store your Google Gemini API key

## Requirements

- Homey Pro with firmware >=12.4.0
- Google Gemini API key (free tier available)

## Installation

### From Homey App Store
1. Open the Homey app on your mobile device
2. Go to "More" → "Apps"
3. Search for "Gemini for Homey"
4. Install the app

### For Development
1. Clone this repository
2. Install dependencies: `npm install`
3. Use the Homey CLI to run: `homey app run`

## Getting Your Google Gemini API Key

### Step 1: Access Google AI Studio
1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Sign in with your Google account

### Step 2: Create an API Key
1. Click on "Get API Key" in the left sidebar
2. Click "Create API key in new project" (or select an existing project)
3. Your API key will be generated automatically
4. **Important**: Copy and save your API key immediately - you won't be able to see it again

### Step 3: (Optional) Configure Usage Limits
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to "APIs & Services" → "Credentials"
3. Find your API key and click on it to set usage restrictions and quotas

### Pricing Information
- Google Gemini API offers a generous free tier
- Free tier includes up to 15 requests per minute
- For current pricing details, visit [Google AI Pricing](https://ai.google.dev/pricing)

## Setup

### 1. Configure API Key
1. After installing the app, open the Homey app
2. Go to "More" → "Apps" → "Gemini for Homey"
3. Click "Settings"
4. Enter your Google Gemini API key
5. Click "Save"

### 2. Create a Flow
1. Open the Homey app and go to "Flows"
2. Create a new Flow or edit an existing one
3. Add the "Send Prompt" action card from the "Gemini for Homey" app
4. Enter your prompt text
5. Use the "Gemini answer" token in subsequent Flow cards

## Usage Examples

### Basic Example
```
WHEN: Motion is detected in the living room
THEN: Send Prompt "Generate a welcoming message for someone entering the living room"
AND: Speak the Gemini answer
```

### Smart Lighting
```
WHEN: Someone says "Set mood lighting"
THEN: Send Prompt "Suggest appropriate lighting settings for a relaxing evening at home"
AND: Use the response to configure your lights
```

### Weather Advisory
```
WHEN: Weather changes
THEN: Send Prompt "Create a brief weather advisory based on today's forecast: [weather token]"
AND: Send notification with Gemini answer
```

### Home Security
```
WHEN: Security sensor triggers
THEN: Send Prompt "Generate a security alert message for [sensor name] at [time]"
AND: Log the Gemini answer
```

## Technical Details

### Project Structure
```
├── app.js                      # Main app logic and Flow action registration
├── app.json                    # App manifest (generated from .homeycompose)
├── package.json                # Node.js dependencies
├── lib/
│   └── GeminiClient.js         # Google Gemini API client
├── settings/
│   └── index.html              # API key configuration interface
├── .homeycompose/
│   ├── app.json                # App configuration source
│   └── flow/
│       └── actions/
│           └── send-prompt.json # Flow action definition
└── assets/                     # App icons and images
```

### Dependencies
- `@google/generative-ai`: Official Google Generative AI SDK
- `homey`: Homey Apps SDK v3

### Flow Action Details
- **ID**: `send-prompt`
- **Input**: Text prompt (string)
- **Output**: `answer` token (string) containing Gemini's response
- **Model**: Uses Gemini 1.5 Flash for fast, efficient responses

## Development

### Prerequisites
- Node.js (v16 or higher)
- Homey CLI: `npm install -g homey`

### Local Development
```bash
# Clone the repository
git clone https://github.com/your-username/com.dimapp.geminiforhomey.git
cd com.dimapp.geminiforhomey

# Install dependencies
npm install

# Run the app in development mode
homey app run

# Validate the app
homey app validate

# Build for production
homey app build
```

### Testing
1. Install the app on your development Homey
2. Configure your API key in the app settings
3. Create test Flows with the "Send Prompt" action
4. Monitor logs using `homey app log`

## Privacy & Security

- **API Key Storage**: Your Google Gemini API key is stored securely in Homey's settings
- **Data Processing**: Prompts and responses are processed by Google's Gemini API
- **No Data Retention**: This app doesn't store or log your prompts or AI responses
- **Local Processing**: The app runs on your Homey device; only API calls are sent to Google

## Troubleshooting

### Common Issues

**"API key not configured" error**
- Ensure you've entered your API key in the app settings
- Verify the API key is correct and hasn't expired

**"Error sending prompt" in Flow**
- Check your internet connection
- Verify your API key has sufficient quota
- Ensure the prompt text is not empty

**Empty or "none" responses**
- Check Google AI Studio for API usage limits
- Verify your API key has the necessary permissions
- Try with a simpler prompt

### Debug Information
Enable debug logging in the Homey CLI:
```bash
homey app log --level debug
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -am 'Add new feature'`
5. Push to the branch: `git push origin feature-name`
6. Create a Pull Request

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

## Author

**Simone Di Maio**  
Email: simone.dimaio77@gmail.com

## Support

- **Issues**: Report bugs and feature requests on [GitHub Issues](https://github.com/your-username/com.dimapp.geminiforhomey/issues)

## Changelog

### v1.0.0
- Initial release
- Basic "Send Prompt" Flow action
- Google Gemini 1.5 Flash integration
- Multi-language support (English/Italian)
- Settings interface for API key configuration


