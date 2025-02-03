# Pre Trip Report PDF Generator

This project generates a PDF version of a pre-trip report using Node.js, Express, Puppeteer, and React. The report includes detailed sections with multi-column layouts, dynamically generated content, and notes with custom overflow behavior.

## Features

- **Multi-Column Layout:** The report is rendered in two columns using CSS multi-column layout.
- **Dynamic Sections:** In addition to some predefined sections, 70 additional sections are generated with random details and notes.
- **Overflow Control:** Uses CSS properties like `breakInside: avoid` to prevent critical elements from splitting across columns or pages.
- **Adjustable Notes Block:** A mechanism (using refs and a `useEffect` hook) adjusts the positioning of the notes block if the "Notes:" header is separated from its text.
- **PDF Generation:** Uses Puppeteer to render a fully styled HTML report into a PDF.
- **Sample Output:** See the sample output file [`Pre Trip Report sample.pdf`](Pre%20Trip%20Report%20sample.pdf) included in the root folder.

## Prerequisites

- [Node.js](https://nodejs.org/en/) (v12 or later recommended)
- [npm](https://www.npmjs.com/)

## Installation

1. Clone the repository or download the source code.
2. Open a terminal in the project folder.
3. Install the dependencies by running:

   ```bash
   npm install
   ```
