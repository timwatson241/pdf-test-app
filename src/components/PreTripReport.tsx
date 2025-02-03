// src/components/PreTripReport.tsx

import React, { CSSProperties, FC } from "react";

// ---------- Existing Sample Data ----------
// This is the initial sample data including organization info, information, vehicle details, and several sections.
const sampleData = {
  organization: {
    name: "4Season Transportation",
    website: "4seasonstransport.com",
    phone: "+1-587-434-3192",
    address: "#102 85 Freeport Blvd NE Calgary, AB",
  },
  information: {
    trip: "CBE-002 AM",
    result: "Failed",
    submittedBy: "Grace Millar",
    contact: "+1 403 983 7388",
    inspectionDate: "12/15/2023",
    inspectionTime: "8:30AM",
    route: "CBE-0002",
  },
  vehicleDetails: {
    unit: "1097",
    licensePlate: "EX8 49F",
    cvipExpiry: "12/15/2026",
    odometer: "193,994 km",
    fuel: "1/2",
  },
  sections: [
    {
      title: "Under the Vehicle",
      items: [
        { label: "Objects", value: "Pass" },
        { label: "Leaks", value: "Pass" },
      ],
      notes:
        "Section notes live here. Lorem ipsum dolor sit amet consectetur. Ullamcorper mollis vulputate integer augue lobortis porta. Sapien sit duis et morbi. At augue semper arcu ipsum. Elit nec turpis tristique venenatis risus scelerisque vulputate id nullam. Convallis diam vestibulum tellus adipiscing.",
    },
    {
      title: "Walk Around",
      items: [
        { label: "Exhaust", value: "Pass" },
        { label: "Windshield & Mirrors", value: "Pass" },
        { label: "Emergency Door", value: "Fail" },
        { label: "Wheels & Tires", value: "Pass" },
        { label: "Wheelchair Lift", value: "Pass" },
        { label: "Wheelchair Access", value: "Pass" },
      ],
      notes:
        `Section notes live here. Lorem ipsum dolor sit amet consectetur. Ullamcorper mollis vulputate integer augue lobortis porta. `.repeat(
          10
        ),
    },
    {
      title: "Interior",
      items: [
        { label: "Defrost Heaters", value: "Pass" },
        { label: "Documents", value: "Pass" },
        { label: "Exits", value: "Pass" },
        { label: "Fire Extinguisher", value: "N/A" },
        { label: "First Aid Kit", value: "Pass" },
        { label: "Floors", value: "Pass" },
        { label: "Fuel Level", value: "Pass" },
        { label: "Horn", value: "Pass" },
        { label: "Seatbelt Cutter", value: "Pass" },
        { label: "Seats", value: "Pass" },
        { label: "Triangles", value: "Pass" },
        { label: "Windows", value: "Pass" },
        { label: "Wipers", value: "Pass" },
      ],
      notes:
        "Section notes live here. Lorem ipsum dolor sit amet consectetur. Ullamcorper mollis vulputate integer augue lobortis porta. Sapien sit duis et morbi. At augue semper arcu ipsum.",
    },
    {
      title: "Lights",
      items: [
        { label: "Break Lights", value: "Pass" },
        { label: "Headlights & Taillights", value: "Pass" },
        { label: "Signal Lights", value: "Fail" },
        { label: "4-Way Hazards", value: "Pass" },
        { label: "8-Way/Stop Lights", value: "Pass" },
        { label: "Stepwell Lights", value: "Pass" },
      ],
      notes:
        `Section notes live here. Lorem ipsum dolor sit amet consectetur. Ullamcorper mollis vulputate integer augue lobortis porta. `.repeat(
          8
        ),
    },
  ],
};

// ---------- Generate Additional New Sections ----------
// We create additional sections with randomized content.
// A Lorem Ipsum string is used for the notes. Some sections will have no notes.
const loremIpsum =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ";

// Create 40 new sections
const additionalSections = Array.from({ length: 80 }, (_, sectionIndex) => {
  // Generate a random number of details (between 5 and 10) for each section.
  const detailCount = Math.floor(Math.random() * 6) + 5;
  const details = Array.from({ length: detailCount }, (_, detailIndex) => ({
    label: `New detail ${detailIndex + 1}`,
    value: "Dummy data",
  }));

  // 80% chance to include notes.
  const includeNotes = Math.random() < 0.8;
  // If including notes, vary the length by repeating the Lorem Ipsum text a random number of times (between 5 and 20).
  const notes = includeNotes
    ? loremIpsum.repeat(Math.floor(Math.random() * 16) + 5)
    : undefined;

  return {
    title: `New Section ${sectionIndex + 1}`,
    items: details,
    notes,
  };
});

// Combine the existing sampleData.sections with the additional sections.
const allSections = [...sampleData.sections, ...additionalSections];

// ---------- Styles ----------
// These styles define the overall layout of the report.
// The report uses a multi-column layout via CSS (see contentColumns below).
// The "breakInside: avoid" property on certain containers prevents them from being split across columns or pages.
const styles: Record<string, CSSProperties> = {
  page: {
    margin: 0,
    // The page has no additional padding as margins are controlled by the Puppeteer @page CSS.
    width: "100%",
    minHeight: "297mm", // A4 paper height in millimeters.
    boxSizing: "border-box",
    position: "relative",
  },
  // contentColumns uses CSS multi-column layout properties.
  // - columnCount: number of columns to split the content into.
  // - columnGap: space between columns.
  // - columnFill: defines how content is balanced among columns.
  contentColumns: {
    columnCount: 2,
    columnGap: "3.44em",
    columnFill: "auto",
  },
  // Each section has a bottom margin to separate it from the next.
  section: {
    marginBottom: "2em",
  },
  // The section header displays the section title with a bottom border.
  sectionHeader: {
    fontSize: "0.75em",
    fontWeight: 600,
    borderBottom: "1px solid #0A0A0A",
    paddingBottom: "0.5em",
    marginBottom: "1em",
  },
  // Each detail item is rendered in a flex container.
  // The borderBottom here creates a divider line between details.
  item: {
    display: "flex",
    padding: "0.88em 0",
    borderBottom: "1px solid #CCCAD0",
    // breakInside: "avoid" prevents this element from being split across columns or pages.
    breakInside: "avoid",
  },
  // Styling for the detail label.
  label: {
    flex: 4,
    fontSize: "0.625em",
    color: "#3D3D3D",
  },
  // Styling for the detail value.
  value: {
    flex: 6,
    fontSize: "0.6875em",
    paddingLeft: "1em",
  },
  // Styling for the notes text.
  notes: {
    fontSize: "0.6875em",
    lineHeight: 1.4,
    whiteSpace: "pre-line",
    textAlign: "justify",
  },
  // Styling for the "Notes:" header.
  notesHeader: {
    fontSize: "0.75em",
    fontWeight: 600,
    marginBottom: "0.5em",
  },
};

// ---------- Section Component ----------
// This component renders a single section of the report.
// It includes the section title, detail items, and optionally a notes section.
// It uses CSS multi-column properties to handle overflow.
// The "breakInside: avoid" property on the container holding the section header and first detail prevents splitting across columns/pages.
interface SectionProps {
  title: string;
  items: Array<{ label: string; value: string }>;
  notes?: string;
}

/**
 * Renders a section.
 *
 * - The section title and the first detail are wrapped in a container with "breakInside: avoid"
 *   so they are not separated between columns or pages.
 * - The remaining details are rendered normally.
 * - For the last detail item, if no notes are present, its lower divider is removed.
 * - If notes exist, a "Notes:" header is rendered above the notes text with extra top spacing.
 */
const Section: FC<SectionProps> = ({ title, items, notes }) => {
  // Helper function to render a detail item.
  // The isLast parameter is used to determine if this item is the last in the section.
  // If it is and no notes are present, the bottom border (divider) is removed.
  const renderItem = (
    item: { label: string; value: string },
    isLast: boolean
  ) => {
    // Clone the base item style.
    const itemStyle = { ...styles.item };
    // Remove the bottom border if this is the last detail and there are no notes.
    if (isLast && !notes) {
      itemStyle.borderBottom = "none";
    }
    return (
      <div style={itemStyle}>
        <span style={styles.label}>{item.label}</span>
        <span style={styles.value}>{item.value}</span>
      </div>
    );
  };

  return (
    <section style={styles.section}>
      {/* The header and the first detail are wrapped in a container with breakInside: "avoid" 
          to ensure they are not split across columns or pages. */}
      <div style={{ breakInside: "avoid" }}>
        <div style={styles.sectionHeader}>{title}</div>
        {items.length > 0 &&
          // If there is only one item, it is considered the last by default.
          renderItem(items[0], items.length === 1)}
      </div>
      {/* Render any remaining detail items.
          We slice the array to get items after the first one.
          For each item, we check if it is the last in this sliced array.
          If so, and there are no notes, its divider will be removed. */}
      {items.slice(1).map((item, index) => {
        const isLast = index === items.slice(1).length - 1;
        return <div key={index}>{renderItem(item, isLast)}</div>;
      })}
      {/* Render the notes section if notes are provided.
          Extra top margin ("0.88em") is added so that there is consistent spacing above the "Notes:" header,
          matching the spacing below detail items. */}
      {notes && (
        <div style={{ marginTop: "0.88em" }}>
          <div style={styles.notesHeader}>Notes:</div>
          <div style={styles.notes}>{notes}</div>
        </div>
      )}
    </section>
  );
};

// ---------- Other Predefined Sections ----------
// InformationSection and VehicleDetailsSection render their respective sections using data from sampleData.
const InformationSection: FC = () => {
  const items = Object.entries(sampleData.information).map(
    ([label, value]) => ({
      label,
      value: String(value),
    })
  );
  return <Section title="Information" items={items} />;
};

const VehicleDetailsSection: FC = () => {
  const items = Object.entries(sampleData.vehicleDetails).map(
    ([label, value]) => ({
      label,
      value: String(value),
    })
  );
  return <Section title="Vehicle Details" items={items} />;
};

// ---------- Main Report Component ----------
// PreTripReport renders the complete report.
// It uses a multi-column layout (defined in styles.contentColumns) to allow the content to flow into two columns.
// All sections (both predefined and additional) are rendered in order.
const PreTripReport: FC = () => {
  return (
    <div style={styles.page}>
      {/* contentColumns applies the multi-column layout */}
      <div style={styles.contentColumns}>
        <InformationSection />
        <VehicleDetailsSection />
        {allSections.map((section, index) => (
          <Section
            key={index}
            title={section.title}
            items={section.items}
            notes={section.notes}
          />
        ))}
      </div>
    </div>
  );
};

export default PreTripReport;
