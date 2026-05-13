import pptxgen from "pptxgenjs";
import html2canvas from "html2canvas";

export async function exportRetailerPptxWithImages() {
  const pptx = new pptxgen();
  pptx.layout = "LAYOUT_WIDE";

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
        logging: false,
      });

      // Convert canvas to PNG data URL
      const imageData = canvas.toDataURL("image/png");

      // Add new slide
      const slide = pptx.addSlide();
      
      // Add image that fills the entire slide
      slide.addImage({
        path: imageData,
        x: 0,
        y: 0,
        w: 13.333,
        h: 7.5,
      });
    } catch (error) {
      console.error(`Failed to capture slide ${i + 1}:`, error);
    }
  }

  // Write the file
  await pptx.writeFile({ fileName: "DutyBoost-AirportRetailer-Presentation.pptx" });
}