const { GoogleGenerativeAI } = require("@google/generative-ai");

async function findWorkingModel() {
    const genAI = new GoogleGenerativeAI("AIzaSyAgYuYaV7K5dEu01o4HyVV3RCs5mV5yA38");

    const modelsToTry = [
        "gemini-1.5-flash",
        "gemini-1.5-flash-001",
        "gemini-1.5-flash-002",
        "gemini-1.5-pro",
        "gemini-1.5-pro-001",
        "gemini-1.5-pro-002",
        "gemini-pro",
        "gemini-1.0-pro"
    ];

    console.log("Testing models...");

    for (const modelName of modelsToTry) {
        try {
            process.stdout.write(`Testing ${modelName}... `);
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Hello");
            console.log("✅ SUCCESS!");
            console.log(`Working model found: ${modelName}`);
            return; // Stop after finding the first working one
        } catch (error) {
            console.log("❌ FAILED");
            // console.error(error.message);
        }
    }

    console.log("No working models found in the list.");
}

findWorkingModel();
