# Web Admin Dashboard

A modern and responsive admin dashboard built with React, TypeScript, and Material-UI. This application provides a comprehensive set of tools for managing data, users, and system settings with an emphasis on user experience and visual aesthetics.

## Features

- **Modern UI/UX**: Clean and intuitive interface with support for both light and dark modes
- **Theme Customization**: Multiple color themes with gradient effects
  - 16 preset themes including Default, Modern, Elegant, Nature, Ocean, Sunset, etc.
  - Dynamic theme switching with smooth transitions
  - Customizable color schemes with gradient backgrounds

- **Data Management**:
  - Advanced DataGrid with sorting, filtering, and pagination
  - Custom toolbar with export, density, and column management
  - CRUD operations with dialog-based forms
  - Responsive layout for all screen sizes

- **Component Library**:
  - Built on Material-UI (MUI) components
  - Custom styled components with gradient themes
  - Reusable CRUD components for rapid development
  - Consistent styling across all components

## Tech Stack

- **Core**:
  - React 18+
  - TypeScript
  - Vite (for fast development and building)

- **UI Framework**:
  - Material-UI (MUI)
  - @mui/x-data-grid for advanced data tables
  - Custom theme provider for dynamic styling

- **Development Tools**:
  - ESLint with TypeScript support
  - Prettier for code formatting
  - Git for version control

## Getting Started

1. **Installation**:
   ```bash
   npm install
   ```

2. **Development**:
   ```bash
   npm run dev
   ```

3. **Build**:
   ```bash
   npm run build
   ```

4. **Preview Production Build**:
   ```bash
   npm run preview
   ```

## Project Structure

```
src/
├── components/         # Reusable components
│   ├── BaseCRUD/      # CRUD operation components
│   ├── Settings/      # Theme and layout settings
│   └── ...
├── pages/             # Page components
├── theme/             # Theme configuration
├── types/             # TypeScript type definitions
└── utils/             # Utility functions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
