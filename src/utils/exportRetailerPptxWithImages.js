import pptxgen from "pptxgenjs";
import html2canvas from "html2canvas";

export async function exportRetailerPptxWithImages() {
  try {
    const pptx = new pptxgen();

    // Get all slide sections from the page
    const slideElements = document.querySelectorAll("section");
    
    if (slideElements.length === 0) {
      alert("No slides found on the page");
      return;
    }

    console.log(`Found ${slideElements.length} slides to capture`);

    // Capture each slide as an image and add to PPTX
    for (let i = 0; i < slideElements.length; i++) {
      const slideElement = slideElements[i];
      
      try {
        // Capture the slide section as a canvas
        const canvas = await html2canvas(slideElement, {
          scale: 1.5,
          allowTaint: true,
          useCORS: true,
          logging: false,
          backgroundColor: "#ffffff",
        });

        // Add new slide
        const slide = pptx.addSlide();
        slide.background = { color: "FFFFFF" };
        
        // Add image that fills the entire slide
        slide.addImage({
          data: canvas.toDataURL("image/png"),
          x: 0,
          y: 0,
          w: 13.333,
          h: 7.5,
        });

        console.log(`Captured slide ${i + 1}`);
      } catch (error) {
        console.error(`Failed to capture slide ${i + 1}:`, error);
        // Still add a blank slide so numbering doesn't break
        const slide = pptx.addSlide();
        slide.background = { color: "000000" };
      }
    }

    // Write the file
    console.log("Writing PPTX file...");
    await pptx.writeFile({ fileName: "DutyBoost-AirportRetailer-Presentation.pptx" });
    console.log("Download complete");
  } catch (error) {
    console.error("Export failed:", error);
    alert("Export failed: " + error.message);
  }
}