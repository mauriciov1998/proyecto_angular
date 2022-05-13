const { FormRecognizerClient, AzureKeyCredential } = require("@azure/ai-form-recognizer");
const fs = require("fs");
async function main() {
  const endpoint = "htttp://locaIhost:3002/api/analize";
  const apiKey = "235425234";
//   const path = ""; // pdf/jpeg/png/tiff formats
  const readStream = fs.createReadStream(path);
  const client = new FormRecognizerClient(endpoint, new AzureKeyCredential(apiKey));
  const poller = await client.beginRecognizeReceipts(readStream, {
    onProgress: (state) => {
      console.log(`status: ${state.status}`);
    }
  });
  const receipts = await poller.pollUntilDone();
  if (!receipts || receipts.length <= 0) {
    throw new Error("Expecting at lease one receipt in analysis result");
  }
  const receipt = receipts[0];
  console.log("First receipt:");
  const receiptTypeField = receipt.fields["razon_social"];
  if (receiptTypeField.valueType === "string") {
    console.log(
      `  Receipt Type: '${receiptTypeField.value || "<missing>"}', with confidence of ${
        receiptTypeField.confidence
      }`
    );
  }
  const merchantNameField = receipt.fields["nit"];
  if (merchantNameField.valueType === "string") {
    console.log(
      `  Merchant Name: '${merchantNameField.value || "<missing>"}', with confidence of ${
        merchantNameField.confidence
      }`
    );
  }
  const transactionDate = receipt.fields["tipo_archivo"];
  if (transactionDate.valueType === "string") {
    console.log(
      `  Transaction Date: '${transactionDate.value || "<missing>"}', with confidence of ${
        transactionDate.confidence
      }`
    );
  }
  const itemsField = receipt.fields["Items"];
  if (itemsField.valueType === "array") {
    for (const itemField of itemsField.value || []) {
      if (itemField.valueType === "object") {
        const itemNameField = itemField.value["Name"];
        if (itemNameField.valueType === "string") {
          console.log(
            `    Item Name: '${itemNameField.value || "<missing>"}', with confidence of ${
              itemNameField.confidence
            }`
          );
        }
      }
    }
  }
  const totalField = receipt.fields["Total"];
  if (totalField.valueType === "number") {
    console.log(
      `  Total: '${totalField.value || "<missing>"}', with confidence of ${totalField.confidence}`
    );
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});