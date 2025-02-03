h as `breakInside: avoid`) on key containers to keep critical elements (like section headers and the first detail) together across columns or pages.

- **Notes Block Adjustment:**  
  Uses React refs and a `useEffect` hook to detect if the "Notes:" header is separated from its text and then adjusts the top margin of the notes block accordingly.

- **PDF Generation:**  
  The report is first rendered as an HTML page (using a React component) and then converted to PDF via Puppeteer.

- **Sample Output:**  
  See the provided sample PDF output in [`Pre Trip Report sample.pdf`](Pre%20Trip%20Report%20sample.pdf).

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later is recommended)
- [npm](https://www.npmjs.com/)

## Installation

1. Clone the repository or download the source code.
2. Open a terminal in the project folder.
3. Install dependencies by running:

```npm install

```

## Running the Application

To start the server, run:

```npm start

```

This command uses ts-node to run the TypeScript file src/server.ts.

The server will be available at http://localhost:3000.

## Endpoints

- **Root:** [http://localhost:3000](http://localhost:3000)  
  Displays a simple HTML page with links to the PDF and HTML versions.

- **HTML Version:** [http://localhost:3000/test-html](http://localhost:3000/test-html)  
  Renders the pre-trip report as HTML (useful for debugging layout issues).

- **PDF Version:** [http://localhost:3000/generate-pdf](http://localhost:3000/generate-pdf)  
  Generates and downloads the PDF version of the pre-trip report.

## Project Structure

- **src/server.ts:**  
  Sets up the Express server and uses Puppeteer to convert the rendered HTML (from React) into a PDF.

- **src/components/PreTripReport.tsx:**  
  Contains the main React component that renders the pre-trip report. This component includes:

  - Predefined sample data (organization info, information, vehicle details, and several initial sections).
  - Logic to generate 70 additional sections with randomized detail items and notes.
  - CSS styling and layout rules to create a multi-column layout and control overflow.
  - Logic using React refs and `useEffect` to adjust the positioning of the notes block if the "Notes:" header becomes separated from its text.

- **Pre Trip Report sample.pdf:**  
  A sample PDF output demonstrating the generated report.
