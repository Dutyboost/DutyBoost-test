import pptxgen from "pptxgenjs";
import html2canvas from "html2canvas";

export async function exportRetailerPptxWithImages() {
  const pptx = new pptxgen();
  pptx.layout = "LAYOUT_WIDE";
  pptx.defineLayout({ name: "LAYOUT_WIDE", width: 13.333, height: 7.5 });

  // Get all slide sections from the page
  const slideElements = document.querySelectorAll("section");
  
  if (slideElements.length === 0) {
    alert("No slides found on the page");
    return;
  }

  // Capture each slide as an image and add to PPTX
  for (let i = 0; i < slideElements.length; i++) {
    const slideElement = slideElements[i];
    
    try {
      // Capture the slide section as a canvas
      const canvas = await html2canvas(slideElement, {
        scale: 2,
        allowTaint: true,
        useCORS: true,
        backgroundColor: null,
      });

      // Convert canvas to data URL
      const imageData = canvas.toDataURL("image/png");

      // Add slide with image
      const slide = pptx.addSlide();
      slide.background = { path: imageData };
      
      // Add image to fill the entire slide
      slide.addImage({
        data: imageData,
        x: 0,
        y: 0,
        w: "100%",
        h: "100%",
      });
    } catch (error) {
      console.error(`Failed to capture slide ${i + 1}:`, error);
      // Add a blank slide with error message if capture fails
      const slide = pptx.addSlide();
      slide.background = { color: "1E293B" };
      slide.addText(`Slide ${i + 1} - Capture Failed`, {
        x: 1,
        y: 3,
        w: 11.3,
        h: 1,
        fontSize: 24,
        color: "FFFFFF",
        align: "center",
      });
    }
  }

  // Write the file
  await pptx.writeFile({ fileName: "DutyBoost-AirportRetailer-Presentation.pptx" });
}