import React from 'react';

const isNode = typeof process !== 'undefined' && process.versions && process.versions.node;

function evaluate(documents) {
  if (!Array.isArray(documents)) {
    return { decision: "REJECTED", reason: "Input must be an array of documents" };
  }
  
  const invoice = documents.find(d => d && d.type === "invoice");
  const po = documents.find(d => d && d.type === "purchase_order");

  if (!invoice) return { decision: "REJECTED", reason: "Invoice document is missing" };
  if (!po) return { decision: "REJECTED", reason: "Purchase order is missing" };
  
  if (invoice.amount === po.amount) {
    return { decision: "APPROVED", reason: "Invoice and PO amounts match successully" };
  }

  return { 
    decision: "REJECTED", 
    reason: `Amount mismatch: Invoice ($${invoice.amount}) does not match PO ($${po.amount})` 
  };
}

const DocumentEvaluator = ({ documents = [] }) => {
  const result = evaluate(documents);
  const invoice = documents.find(d => d && d.type === "invoice") || { amount: '?' };
  const po = documents.find(d => d && d.type === "purchase_order") || { amount: '?' };
  const isApproved = result.decision === "APPROVED";

  const styles = {
    wrapper: {
      padding: '60px 20px',
      background: '#0a0a0a',
      minHeight: '100px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    card: {
      padding: '48px',
      background: 'rgba(23, 23, 23, 0.8)',
      backdropFilter: 'blur(16px)',
      borderRadius: '32px',
      color: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      maxWidth: '540px',
      width: '100%',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 40px 80px -20px rgba(0, 0, 0, 0.8)',
      textAlign: 'center'
    },
    statusLabel: {
      fontSize: '12px',
      textTransform: 'uppercase',
      letterSpacing: '3px',
      marginBottom: '24px',
      display: 'block',
      color: isApproved ? '#4ade80' : '#f87171',
      fontWeight: '700'
    },
    title: {
      fontSize: '32px',
      fontWeight: '800',
      marginBottom: '16px',
      letterSpacing: '-0.02em'
    },
    description: {
      fontSize: '16px',
      opacity: 0.6,
      marginBottom: '48px',
      lineHeight: '1.6'
    },
    comparisonGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 40px 1fr',
      alignItems: 'center',
      gap: '20px',
      background: 'rgba(255, 255, 255, 0.03)',
      padding: '32px',
      borderRadius: '24px',
      border: '1px solid rgba(255, 255, 255, 0.05)'
    },
    docItem: { textAlign: 'center' },
    docLabel: { fontSize: '11px', textTransform: 'uppercase', opacity: 0.4, marginBottom: '8px' },
    docValue: { fontSize: '24px', fontWeight: '700', letterSpacing: '-0.01em' },
    icon: { fontSize: '24px', opacity: 0.2 }
  };

  return React.createElement('div', { style: styles.wrapper },
    React.createElement('div', { style: styles.card },
      React.createElement('span', { style: styles.statusLabel }, result.decision),
      React.createElement('h1', { style: styles.title }, isApproved ? "Workflow Validated" : "Verification Failed"),
      React.createElement('p', { style: styles.description }, result.reason),
      React.createElement('div', { style: styles.comparisonGrid },
        React.createElement('div', { style: styles.docItem },
          React.createElement('div', { style: styles.docLabel }, "Invoice"),
          React.createElement('div', { style: styles.docValue }, `$${invoice.amount || '0'}`)
        ),
        React.createElement('div', { style: styles.icon }, "→"),
        React.createElement('div', { style: styles.docItem },
          React.createElement('div', { style: styles.docLabel }, "Purchase Order"),
          React.createElement('div', { style: styles.docValue }, `$${po.amount || '0'}`)
        )
      )
    )
  );
};

if (isNode) {
  import('url').then(({ fileURLToPath }) => {
    const __filename = fileURLToPath(import.meta.url);
    const isMain = process.argv[1] && process.argv[1] === __filename;

    if (isMain) {
      const mockDocs = [
        { type: "invoice", amount: 1500 },
        { type: "purchase_order", amount: 1500 }
      ];
      const result = evaluate(mockDocs);
      console.log("-----------------------------------------");
      console.log("✅ Q4: DocumentEvaluator Component Loaded");
      console.log("-----------------------------------------");
      console.log("Decision :", result.decision);
      console.log("Reason   :", result.reason);
      console.log("\n[TIP] Open dashboard to see Q4 UI: - file:///Users/arpitapandey/Desktop/test/UI_DASHBOARD.html?view=q4");
      console.log("-----------------------------------------");
    }
  });
}

export default DocumentEvaluator;
export { evaluate };
