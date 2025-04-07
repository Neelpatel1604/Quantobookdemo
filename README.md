# QuantoBooks - AI-Powered Bookkeeping Platform

QuantoBooks is a modern web application that provides AI-powered bookkeeping tools for e-commerce businesses. The platform includes a dashboard with financial insights and an AI chat interface powered by Perplexity Sonar.

## Features

- **Dashboard**: Financial widgets and interactive charts
- **AI Chat**: Real-time AI assistant for financial queries powered by Perplexity Sonar
- **Mobile Responsive**: Fully responsive design that works on all devices
- **Offline Support**: Chat messages are saved in localStorage when offline
- **Multi-Chat System**: Save and manage multiple chat conversations
- **File Upload**: Attach financial documents to your queries

## Technology Stack

- Next.js 13+ (App Router) with TypeScript
- Shadcn UI components
- Chart.js for data visualization
- Perplexity AI API integration
- Tailwind CSS for styling
- localStorage for offline data persistence

## Live Demo

Visit the live application: [QuantoBooks Demo](https://your-netlify-url.netlify.app)

## Setup Instructions

### Prerequisites

- Node.js 18+ and npm
- Perplexity AI API key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/quantobooks.git
   cd quantobooks
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory with the following variables:
   ```
   # AI Service API Keys
   PERPLEXITY_API_KEY=your_perplexity_api_key_here
   NEXT_PUBLIC_PERPLEXITY_API_KEY=your_perplexity_api_key_here
   
   # Application Settings
   NEXT_PUBLIC_API_URL=http://localhost:3000/api
   
   # Feature Flags
   NEXT_PUBLIC_ENABLE_FILE_UPLOAD=true
   NEXT_PUBLIC_ENABLE_RECONCILIATION=false
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to http://localhost:3000

## AI Configuration

The application uses Perplexity's Sonar model for the AI chat assistant. You need to:

1. Get an API key from [Perplexity API](https://docs.perplexity.ai)
2. Add it to your `.env.local` file as shown above

You can configure the AI behavior in `lib/ai.ts`:
- Model selection (default: 'sonar')
- Temperature settings
- Token limits

## Markdown Support

The AI responses are formatted with Markdown for better readability:

- **Bold text** for important terms and financial concepts
- Lists and numbered steps
- Headers for section organization
- Code blocks for data
- Tables for financial data presentation

## Chat History Management

The application provides a robust chat history system:

- Automatically saves chats to localStorage
- Multiple conversation support with date-based organization
- Export chats as text files
- Delete individual conversations
- Offline mode with message queueing

## Deploying to Netlify

### Setup

1. Push your repository to GitHub, GitLab, or Bitbucket
2. Log in to your Netlify account and click "Add new site" > "Import an existing project"
3. Connect to your Git provider and select your repository
4. Configure the build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
5. Click "Deploy site"

### Environment Variables

Add the following environment variables in the Netlify dashboard (Site settings > Environment variables):

| Variable | Description | Example Value |
|----------|-------------|---------------|
| `PERPLEXITY_API_KEY` | Your Perplexity API key | pplx-xxxxxxxxxxxxxxx |
| `NEXT_PUBLIC_PERPLEXITY_API_KEY` | Public API key for client | pplx-xxxxxxxxxxxxxxx |
| `NEXT_PUBLIC_API_URL` | Base URL for API requests | https://your-app.netlify.app/api |
| `NEXT_PUBLIC_ENABLE_FILE_UPLOAD` | Enable file upload feature | true |
| `NEXT_PUBLIC_ENABLE_RECONCILIATION` | Enable reconciliation features | false |

## Folder Structure

- `/app`: Next.js app directory (pages, layouts, routes)
- `/components`: Reusable UI components
  - `/ui`: Shadcn UI components
  - `/chat`: Chat interface components
  - `/dashboard`: Dashboard widgets
- `/hooks`: Custom React hooks (useChat, etc.)
- `/lib`: Utility functions and API clients
- `/public`: Static assets (images, icons)

## Local Storage Structure

The application uses localStorage for offline persistence:

- `chatHistories`: JSON array of chat conversations
- `activeChatId`: ID of the currently active chat

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT](LICENSE)

## Credits

- UI Components: [Shadcn UI](https://ui.shadcn.com/)
- AI Integration: [Perplexity API](https://docs.perplexity.ai)
- Icons: [Lucide Icons](https://lucide.dev/)
