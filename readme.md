# EventBusJS

A minimal React event bus library for cross-component communication.

## Overview

EventBusJS is a lightweight event bus system designed to facilitate communication between isolated React components without the need for direct parent-child relationships. It allows components to subscribe to events and publish events in a decoupled manner, making your React application more modular and easier to maintain.

## Features

- **Simple API:** Easily subscribe to and publish events with minimal boilerplate.
- **Component Isolation:** Communicate between components without passing props or using context.
- **Lightweight:** Designed to be small and efficient, suitable for any React project.

## Usage

Here's a simple example to get you started with EventBusJS.

1. Subscribing to an Event in ComponentA
   In ComponentA, we subscribe to a custom event called "customEvent" and define a handler function that will run whenever the event is triggered.

```javascript
import React, { useEffect } from 'react';
import { useEventBus } from 'react-eventbus-js';

function ComponentA() {
    const { subscribe } = useEventBus();

    useEffect(() => {
        const unsubscribe = subscribe('customEvent', (message) => {
            console.log('Component A received:', message);
            // You can update the state or perform other side effects here
        });

        return () => unsubscribe();
    }, [subscribe]);

    return <div>Component A is listening for events</div>;
}

export default ComponentA;
```

2. Publishing an Event from ComponentB
   In ComponentB, we trigger the "customEvent" by calling the publish function. This event will be picked up by any components that have subscribed to it.

```javascript
import React from 'react';
import { useEventBus } from 'react-eventbus-js';

function ComponentB() {
    const { publish } = useEventBus();

    const handleClick = () => {
        publish('customEvent', 'Hello from B');
    };

    return (
        <button onClick={handleClick}>
            Trigger Event in Component A
        </button>
    );
}

export default ComponentB;
```

## Installation

Install EventBusJS via npm:

```bash
npm install react-eventbus-js

```
