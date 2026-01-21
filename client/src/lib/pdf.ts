import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export async function downloadPdf(
  node: HTMLElement,
  filename = "dashboard.pdf"
): Promise<void> {
  const canvas = await html2canvas(node, {
    useCORS: true,
    scale: 2,
    logging: false,
    backgroundColor: "#0a0a0f",
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "px",
    format: "a4",
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const imgWidth = canvas.width;
  const imgHeight = canvas.height;

  const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);
  const imgX = (pageWidth - imgWidth * ratio) / 2;
  const imgY = 10;

  pdf.addImage(
    imgData,
    "PNG",
    imgX,
    imgY,
    imgWidth * ratio,
    imgHeight * ratio
  );
  pdf.save(filename);
}
