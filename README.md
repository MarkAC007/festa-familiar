# Food Menu Web App

This is a food menu web application built with React, TypeScript, and Vite.

## Getting Started

### Prerequisites

- Node.js (version 12.22.0 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd food-menu-web-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

### Running the App

To start the app in development mode, run:

```
npm run dev
```


This command will start the Vite development server. By default, the app should be available at `http://localhost:5173`.

### Other Available Scripts

- `npm run build`: Builds the app for production
- `npm run lint`: Runs the linter to check for code style issues
- `npm run preview`: Previews the built app locally

## Environment Variables

Make sure to set up your environment variables in a `.env` file in the root of your project. The following variables are required:


VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key


Replace `your_supabase_url` and `your_supabase_anon_key` with your actual Supabase project credentials.

## Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS
- Supabase

## License

[Add your license information here]