import { fileURLToPath } from 'url';

function evaluateWorkflow(documents) {
    const invoice = documents.find(doc => doc.type === "invoice");
    const po = documents.find(doc => doc.type === "purchase_order");
    const receipt = documents.find(doc => doc.type === "receipt");

    if (!invoice) {
        return { decision: "REJECTED", reason: "Invoice is missing" };
    }

    if (!po) {
        return { decision: "REJECTED", reason: "Purchase order is missing" };
    }

    if (!receipt) {
        return { decision: "REJECTED", reason: "Receipt is missing" };
    }

    if (invoice.amount !== po.amount) {
        return {
            decision: "REJECTED",
            reason: `Amount mismatch: Invoice (${invoice.amount}) vs PO (${po.amount})`
        };
    }

    if (invoice.vendor !== po.vendor) {
        return {
            decision: "REJECTED",
            reason: `Vendor mismatch: Invoice (${invoice.vendor}) vs PO (${po.vendor})`
        };
    }

    return {
        decision: "APPROVED",
        reason: "All checks passed"
    };
}

const isMain = process.argv[1] && process.argv[1] === fileURLToPath(import.meta.url);

if (isMain) {
    const documents = [
        { type: "invoice", amount: 5000, vendor: "ABC Ltd" },
        { type: "purchase_order", amount: 5000, vendor: "ABC Ltd" },
        { type: "receipt", received: true }
    ];

    const result = evaluateWorkflow(documents);
    console.log("-----------------------------------------");
    console.log("✅ Q1: Processed Directly");
    console.log("-----------------------------------------");
    console.log("Result:", result);
    console.log("-----------------------------------------");
}

export default evaluateWorkflow;
