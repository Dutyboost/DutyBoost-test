import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const PAGE = { width: 210, height: 297, margin: 12 };

// Captures the rendered pass examples exactly as they appear on screen and lays
// them out over A4 pages, slicing the capture when it is taller than one page so
// the cards keep their size and stay readable.
export async function exportDutyCreditExamplesPdf(node, filename = "dutycredit-pass-examples.pdf") {
  if (!node) return;

  const canvas = await html2canvas(node, {
    backgroundColor: "#ffffff",
    scale: 2,
    useCORS: true,
    logging: false,
  });

  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4", compress: true });
  const contentWidth = PAGE.width - PAGE.margin * 2;
  const contentHeight = PAGE.height - PAGE.margin * 2;
  const mmPerPx = contentWidth / canvas.width;
  const pageHeightPx = Math.floor(contentHeight / mmPerPx);

  let offset = 0;
  let page = 0;

  while (offset < canvas.height) {
    const sliceHeight = Math.min(pageHeightPx, canvas.height - offset);
    const slice = document.createElement("canvas");
    slice.width = canvas.width;
    slice.height = sliceHeight;
    slice
      .getContext("2d")
      .drawImage(canvas, 0, offset, canvas.width, sliceHeight, 0, 0, canvas.width, sliceHeight);

    if (page > 0) pdf.addPage();
    pdf.addImage(
      slice.toDataURL("image/jpeg", 0.92),
      "JPEG",
      PAGE.margin,
      PAGE.margin,
      contentWidth,
      sliceHeight * mmPerPx
    );

    offset += sliceHeight;
    page += 1;
  }

  pdf.save(filename);
}