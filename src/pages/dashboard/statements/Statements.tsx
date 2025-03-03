import { Card, Table, Button } from "antd";
import { useState } from "react";
import { jsPDF } from "jspdf";
import StatementForm from "../../../components/StatementForm/StatementForm";
import ContributionChart from "../../../components/ContributionChart/ContributionChart";
import DashboardLayout from "../../../components/DashboardLayout/DashboardLayout";
import { ShowToast } from "../../../components/ShowToast/ShowToast.tsx";
import logo from "../../../../public/images/nlpc_pension_logo.jpg";

// Define the types for the data
interface Statement {
  id: number;
  date: string;
  amount: string; // Or number if it's numeric
  type: string;
}

interface DateRange {
  startDate: string;
  endDate: string;
}

const Statements = () => {
  //   const [statements, setStatements] = useState<Statement[]>([
  const [statements] = useState<Statement[]>([
    { id: 3, date: "2023-01-12", amount: "1000", type: "Mandatory" },
    { id: 4, date: "2023-02-15", amount: "1200", type: "Voluntary" },
    { id: 5, date: "2023-03-03", amount: "1500", type: "Mandatory" },
    { id: 6, date: "2023-04-18", amount: "1300", type: "Voluntary" },
    { id: 7, date: "2023-05-09", amount: "1600", type: "Mandatory" },
    { id: 8, date: "2023-06-23", amount: "1800", type: "Voluntary" },
    { id: 9, date: "2023-07-27", amount: "2000", type: "Mandatory" },
    { id: 10, date: "2023-08-19", amount: "2200", type: "Voluntary" },
    { id: 11, date: "2023-09-10", amount: "2500", type: "Mandatory" },
    { id: 12, date: "2023-10-14", amount: "2300", type: "Voluntary" },
    { id: 13, date: "2023-11-07", amount: "2700", type: "Mandatory" },
    { id: 14, date: "2023-12-29", amount: "3000", type: "Voluntary" },
    { id: 3, date: "2024-01-12", amount: "1000", type: "Mandatory" },
    { id: 4, date: "2024-02-15", amount: "1200", type: "Voluntary" },
    { id: 5, date: "2024-03-03", amount: "1500", type: "Mandatory" },
    { id: 6, date: "2024-04-18", amount: "1300", type: "Voluntary" },
    { id: 7, date: "2024-05-09", amount: "1600", type: "Mandatory" },
    { id: 8, date: "2024-06-23", amount: "1800", type: "Voluntary" },
    { id: 9, date: "2024-07-27", amount: "2000", type: "Mandatory" },
    { id: 10, date: "2024-08-19", amount: "2200", type: "Voluntary" },
    { id: 11, date: "2024-09-10", amount: "2500", type: "Mandatory" },
    { id: 12, date: "2024-10-14", amount: "2300", type: "Voluntary" },
    { id: 13, date: "2024-11-07", amount: "2700", type: "Mandatory" },
    { id: 14, date: "2024-12-29", amount: "3000", type: "Voluntary" },
    { id: 1, date: "2025-02-10", amount: "5000", type: "Mandatory" },
    { id: 2, date: "2025-01-05", amount: "3000", type: "Voluntary" },
  ]);

  const [filteredStatements, setFilteredStatements] =
    useState<Statement[]>(statements);

  const handleGenerate = ({ startDate, endDate }: DateRange) => {
    const filtered = statements.filter(
      (s) => s.date >= startDate && s.date <= endDate
    );
    setFilteredStatements(filtered);
  };

  // const handleDownloadPDF = () => {
  //   const doc = new jsPDF();
  //   doc.text("Contribution Statement", 20, 20);

  //   filteredStatements.forEach((s, index) => {
  //     doc.text(`${s.date}: ${s.amount} (${s.type})`, 20, 30 + index * 10);
  //   });

  //   doc.save("Contribution_Statement.pdf");
  //   ShowToast("success", "PDF downloaded!");
  // };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    let currentY = margin + 20; // Start after the header

    // Add Header with Logo
    if (logo) {
      doc.addImage(logo, "PNG", margin, margin, 20, 20); // Logo at top-left
    }
    doc.setFontSize(18);
    doc.text("Contribution Statement", margin + 25, margin + 15);

    doc.setFontSize(12);
    currentY += 10; //Add space under header
    // Add Date/Time for when it was generated
    const now = new Date().toLocaleString();
    doc.text(`Generated on: ${now}`, margin, currentY);
    currentY += 5;

    // Add filtered range if there are statements.
    if (filteredStatements.length > 0) {
      const firstStatementDate = filteredStatements[0].date;
      const lastStatementDate =
        filteredStatements[filteredStatements.length - 1].date;
      doc.text(
        `Statement from: ${firstStatementDate} to ${lastStatementDate}`,
        margin,
        currentY
      );
      currentY += 15;
    } else {
      doc.text(`No statement in selected range`, margin, currentY);
      currentY += 15;
    }

    // Add table header
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Date", margin, currentY);
    doc.text("Amount", pageWidth / 2 - margin, currentY);
    doc.text("Type", pageWidth - 50 - margin, currentY);
    currentY += 5;
    doc.setLineWidth(0.5);
    doc.line(margin, currentY, pageWidth - margin, currentY);
    currentY += 5;

    // Reset font
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    // Add statements details
    filteredStatements.forEach((s) => {
      if (currentY > doc.internal.pageSize.getHeight() - margin * 2) {
        doc.addPage();
        currentY = margin;
      }

      doc.text(s.date, margin, currentY);
      doc.text(s.amount, pageWidth / 2 - margin, currentY);
      doc.text(s.type, pageWidth - 50 - margin, currentY);
      currentY += 10;
    });

    doc.save(`Contribution_Statement_${now}_.pdf`);
    ShowToast("success", "PDF downloaded!");
  };

  const handleShareEmail = () => {
    ShowToast("success", "Statement sent via email!");
  };

  const columns = [
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Amount", dataIndex: "amount", key: "amount" },
    { title: "Type", dataIndex: "type", key: "type" },
  ];

  return (
    <DashboardLayout>
      <div className="p-4">
        <Card title="Generate Contribution Statement" className="mb-6">
          <StatementForm onGenerate={handleGenerate} />
        </Card>

        <Card title="Contribution Growth">
          <ContributionChart data={filteredStatements} />
        </Card>

        <Card title="Statements">
          <div className="my-4 flex justify-end gap-3">
            <Button type="primary" onClick={handleDownloadPDF}>
              Download PDF
            </Button>
            <Button onClick={handleShareEmail}>Share via Email</Button>
          </div>
          <Table
            dataSource={filteredStatements}
            columns={columns}
            rowKey="id"
          />
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Statements;
