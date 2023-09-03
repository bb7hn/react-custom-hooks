# React Custom Hooks

This package contains predefined ready to use custom `React hooks`

[![npm version](https://badge.fury.io/js/r-custom-hooks.svg)](https://www.npmjs.com/package/r-custom-hooks) ![license](https://img.shields.io/github/license/bb7hn/react-custom-hooks.svg) [![coverage](https://codecov.io/github/bb7hn/react-custom-hooks/graph/badge.svg?token=MQMFW6N80S)](https://codecov.io/github/bb7hn/react-custom-hooks)

![publish workflow](https://github.com/bb7hn/react-custom-hooks/actions/workflows/npm-publish.yml/badge.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/bb7hn/react-custom-hooks/badge.svg)](https://snyk.io/test/github/bb7hn/react-custom-hooks)

![Eslint](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white)![VsCode](https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)

## Quick Start

To use the `React Custom Hooks` in your React project, you can install it using npm or yarn:

```bash
npm install r-custom-hooks
# or
yarn add r-custom-hooks
```

## HOOKS

<details>
  <summary><b><i>useCookie</i></b></summary>
  <p>This hook is for managing cookies in your application.</p>

```ts
import React from 'react';
import {useCookie} from 'r-custom-hooks';

function MyComponent() {
  // Use the useCookie hook to get, update, and delete cookies
  const [username, setUsername, deleteUsername] = useCookie('username', 'Guest', 7);

  const handleUpdateUsername = () => {
    const newUsername = prompt('Enter your username:');
    if (newUsername) {
      setUsername(newUsername, 7); // Set the username with a 7-day expiration
    }
  };

  const handleDeleteUsername = () => {
    deleteUsername(); // Delete the username cookie
  };

  return (
    <div>
      <p>Welcome, {username}!</p>
      <button onClick={handleUpdateUsername}>Update Username</button>
      <button onClick={handleDeleteUsername}>Delete Username</button>
    </div>
  );
}

export default MyComponent;

```
</details>

<details>
  <summary><b><i>useDebounce</i></b></summary>
  <p>This is a hook for debouncing values in your application.</p>

```ts
import React, { useState } from 'react';
import {useDebounce} from 'r-custom-hooks';

function MyComponent() {
  const [inputValue, setInputValue] = useState('');
  const debouncedValue = useDebounce(inputValue, 500);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Type something..."
      />
      <p>Debounced Value: {debouncedValue}</p>
    </div>
  );
}

export default MyComponent;

```
</details>

<details>
  <summary><b><i>useEventListener</i></b></summary>
  <p>This is a hook for adding event listeners to elements or the window.</p>

```ts
import React, { useRef } from 'react';
import {useEventListener} from 'r-custom-hooks';
import { EventType } from './types';

function MyComponent() {
  const myElementRef = useRef(null);

  const handleEvent = (event) => {
    // Your event handling logic here
    console.log('Event occurred:', event);
  };

  // Attach the event listener to the element
  useEventListener(EventType.CLICK, handleEvent, myElementRef);

  return (
    <div>
      <button ref={myElementRef}>Click me</button>
    </div>
  );
}

export default MyComponent;

```

</details>

<details>
  <summary><b><i>useHistoricalState</i></b></summary>
  <p>This hook is for managing historical states with the ability to undo, redo, and navigate to specific states.</p>

```ts
import React from 'react';
import {useHistoricalState} from 'r-custom-hooks';

function MyComponent() {
  const [count, setCount, history] = useHistoricalState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  const handleUndo = () => {
    history.previous(); // Go back to the previous state
  };

  const handleRedo = () => {
    history.next(); // Go forward to the next state (if available)
  };

  const handleGoTo = (index) => {
    history.go(index); // Go to a specific state in the history
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>
      <button onClick={handleUndo}>Undo</button>
      <button onClick={handleRedo}>Redo</button>
      <button onClick={() => handleGoTo(0)}>Go to Initial State</button>
    </div>
  );
}

export default MyComponent;
```

</details>

<details>
  <summary><b><i>useOutsideClick</i></b></summary>
  <p>This is a hook for detecting clicks outside a specified element</p>

```ts
import React, { useRef, useState } from 'react';
import {useOutsideClick} from 'r-custom-hooks';

function MyComponent() {
  const containerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  // Define a callback function to close the element when clicked outside
  const closeElement = () => {
    setIsOpen(false);
  };

  // Attach the useOutsideClick hook to the container element and the closeElement callback
  useOutsideClick(containerRef, closeElement);

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle Element</button>
      {isOpen && (
        <div ref={containerRef} className="element-to-close">
          <!-- Your element content here -->
        </div>
      )}
    </div>
  );
}

export default MyComponent;
```

</details>

<details>
  <summary><b><i>useUnmount</i></b></summary>
  <p>This hook is for executing a callback when a component unmounts.</p>

```ts
import React from 'react';
import {useUnmount} from 'r-custom-hooks';

function MyComponent() {
  // Define a cleanup function to run when the component unmounts
  const cleanup = () => {
    console.log('Component unmounted');
    // Perform any necessary cleanup here
  };

  // Attach the useUnmount hook with the cleanup function
  useUnmount(cleanup);

  // Your component logic here

  return (
    <div>
      <p>This is my component.</p>
    </div>
  );
}

export default MyComponent;

```

</details>