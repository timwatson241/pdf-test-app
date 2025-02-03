import express from 'express';
import puppeteer from 'puppeteer';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import PreTripReport from './components/PreTripReport';

const app = express();
const port = 3000;

// The root endpoint renders a simple HTML page with links to view the HTML version or generate the PDF.
app.get('/', (req, res) => {
  res.send(`
    <h1>PDF Generator Test App</h1>
    <ul>
      <li><a href="/test-html">View HTML Version</a></li>
      <li><a href="/generate-pdf">Generate PDF Version</a></li>
    </ul>
  `);
});

// The /generate-pdf endpoint renders the React component to an HTML string and then uses Puppeteer to generate a PDF.
app.get('/generate-pdf', async (req, res) => {
  let browser;
  try {
    // Render the PreTripReport React component to a static HTML string.
    const html = ReactDOMServer.renderToString(React.createElement(PreTripReport));
    
    // Build a complete HTML document string.
    // The CSS in the <style> block sets the @page margins.
    // Here, the top margin is set to 15mm so that the header (inserted later) is close to the content.
    const fullHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            @page {
              size: A4;
              /* The top margin is reduced (15mm) to bring the header closer to the content. */
              margin: 15mm 10mm 10mm 10mm;
            }
            body {
              margin: 0;
              /* Use system fonts for consistency. */
              font-family: system-ui, -apple-system, sans-serif;
            }
          </style>
        </head>
        <body>
          ${html}
        </body>
      </html>
    `;
    
    // Launch Puppeteer in headless mode. The no-sandbox flags help when running in restricted environments.
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    // Create a new page and set its content to our full HTML.
    // The waitUntil: 'networkidle0' option waits until there are no more network connections.
    const page = await browser.newPage();
    await page.setContent(fullHtml, { waitUntil: 'networkidle0' });
    
    // Define a header template that will appear on every page of the PDF.
    // This header is rendered by Puppeteer separately from the main document.
    // Note: Adjust styling in this template to fit your design requirements.
    const headerTemplate = `
      <div style="font-size:12px; width:100%; text-align:center; border-bottom:1px solid #0A0A0A; padding-bottom:5px;">
        Pre-Trip Checklist - 4Season Transportation - ${new Date().toLocaleDateString()}
      </div>
    `;
    
    // Generate the PDF using Puppeteer.
    // The PDF options include:
    //   - format: 'A4'
    //   - printBackground: true (to print any background colors/images)
    //   - displayHeaderFooter: true to enable header/footer rendering.
    //   - headerTemplate: the header defined above.
    //   - footerTemplate: an empty footer in this case.
    //   - margin: specifies the margins for the PDF document.
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate,
      footerTemplate: '<div></div>',
      margin: {
        top: '15mm',
        right: '10mm',
        bottom: '10mm',
        left: '10mm'
      }
    });
    
    // Set the response headers so that the browser recognizes the response as a PDF file.
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="pre-trip-report.pdf"'
    });
    // Send the generated PDF buffer as the response.
    res.end(pdfBuffer);
    
  } catch (err) {
    console.error(err);
    res.status(500).send('Error generating PDF');
  } finally {
    if (browser) {
      await browser.close();
    }
  }
});

// The /test-html endpoint renders the HTML version of the report, which is useful for debugging layout issues.
app.get('/test-html', (req, res) => {
  const html = ReactDOMServer.renderToString(React.createElement(PreTripReport));
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { margin: 0; font-family: system-ui, -apple-system, sans-serif; }
          @media print {
            body { margin: 0; }
          }
        </style>
      </head>
      <body>
        ${html}
      </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
