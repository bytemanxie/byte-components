# Byte Components

A modern React component library with TypeScript support. This library provides a set of reusable UI components to help you build beautiful and consistent web applications.

## Installation

```bash
npm install byte-components
# or
yarn add byte-components
```

## Usage

```jsx
import React from 'react';
import { Button, Menu, Icon } from 'byte-components';
import 'byte-components/dist/index.css';

function App() {
  return (
    <div>
      <Button btnType="primary" size="lg">Click Me</Button>
      <Icon icon="check" theme="success" />
      
      <Menu defaultIndex="0" mode="horizontal">
        <Menu.Item>Home</Menu.Item>
        <Menu.Item>About</Menu.Item>
        <Menu.SubMenu title="Dropdown">
          <Menu.Item>Option 1</Menu.Item>
          <Menu.Item>Option 2</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </div>
  );
}
```

## Available Components

- **Alert**: Display important messages to users
- **AutoComplete**: Input with auto-completion functionality
- **Button**: Various button styles and sizes
- **Form**: Form components with validation
- **Icon**: Icon components using FontAwesome
- **Input**: Text input components
- **Menu**: Navigation menu components
- **Progress**: Progress indicators
- **Select**: Dropdown selection components
- **Tabs**: Tab navigation components
- **Transition**: Animation components
- **Upload**: File upload components

## Documentation

For detailed documentation and examples, run Storybook locally:

```bash
npm run storybook
```

## License

MIT
