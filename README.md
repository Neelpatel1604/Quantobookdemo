# QuantoBooks - AI-Powered Bookkeeping Platform

QuantoBooks is a modern web application that provides AI-powered bookkeeping tools for e-commerce businesses. The platform includes a dashboard and AI chat interface.

## Features

- **Dashboard**: Financial widgets and interactive charts
- **AI Chat**: Real-time AI assistant for financial queries powered by OpenAI
- **File Upload**: PDF statement uploads and processing

## Technology Stack

- Next.js with TypeScript
- Shadcn UI components
- Chart.js for data visualization
- OpenAI API integration

## Setup Instructions

### Prerequisites

- Node.js 18+ and npm/yarn
- OpenAI API key (for AI functionality)

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
   OPENAI_API_KEY=your_openai_api_key_here
   
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

The application uses OpenAI's API for the AI chat assistant. You need to:

1. Get an API key from [OpenAI](https://platform.openai.com)
2. Add it to your `.env.local` file as `OPENAI_API_KEY`

You can configure the AI behavior in `lib/ai.ts`:
- Model selection (GPT-4, GPT-3.5, etc.)
- Temperature settings
- Token limits

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `OPENAI_API_KEY` | Your OpenAI API key | - |
| `NEXT_PUBLIC_API_URL` | Base URL for API requests | http://localhost:3000/api |
| `NEXT_PUBLIC_ENABLE_FILE_UPLOAD` | Enable file upload feature | true |
| `NEXT_PUBLIC_ENABLE_RECONCILIATION` | Enable reconciliation features | false |

## Folder Structure

- `/app`: Next.js app directory containing pages
- `/components`: Reusable UI components
- `/hooks`: Custom React hooks
- `/lib`: Utility functions and API clients
- `/public`: Static assets

## License

[MIT](LICENSE)
