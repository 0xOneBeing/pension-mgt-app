import { Card, Table, Button, message } from "antd";
import { useState } from "react";
import { jsPDF } from "jspdf";
import StatementForm from "../../../components/StatementForm/StatementForm";
import ContributionChart from "../../../components/ContributionChart/ContributionChart";
import DashboardLayout from "../../../components/DashboardLayout/DashboardLayout";

const Statements = () => {
  const [statements, setStatements] = useState<any[]>([
    { id: 1, date: "2025-02-10", amount: "₦50,000", type: "Mandatory" },
    { id: 2, date: "2025-01-05", amount: "₦30,000", type: "Voluntary" },
  ]);

  const [filteredStatements, setFilteredStatements] =
    useState<any[]>(statements);

  const handleGenerate = ({ startDate, endDate }: any) => {
    const filtered = statements.filter(
      (s) => s.date >= startDate && s.date <= endDate
    );
    setFilteredStatements(filtered);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Contribution Statement", 20, 20);

    filteredStatements.forEach((s, index) => {
      doc.text(`${s.date}: ${s.amount} (${s.type})`, 20, 30 + index * 10);
    });

    doc.save("Contribution_Statement.pdf");
    message.success("PDF downloaded!");
  };

  const handleShareEmail = () => {
    message.success("Statement sent via email!");
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
          <Table
            dataSource={filteredStatements}
            columns={columns}
            rowKey="id"
          />
          <div className="mt-4 flex gap-3">
            <Button type="primary" onClick={handleDownloadPDF}>
              Download PDF
            </Button>
            <Button onClick={handleShareEmail}>Share via Email</Button>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Statements;
