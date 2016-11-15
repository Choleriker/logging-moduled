# logger-moduled

Simple logging service for loggin to the browser's consonle. This small helper I already use as base logger in my application.

## Features

* debug(), trace(), info(), warn(), error() functions
* grouping like in console with group(), groupCollapsed(), groupEnd()

## Installation

````bash
npm install logger-moduled -save
````

## Usage

````typescript
import { getLogger, LoggingService } from 'logger-moduled';

LoggingService.enable(); // remove that line for production build so logging features are disabled

class SomeClass {

    log: LoggingService;

    constructor() {
        this.log = getLogger(this);
        this.log.debug('Debug message from service');
    }
}
````

