const { GoogleGenerativeAI } = require("@google/generative-ai");

async function listModels() {
    const genAI = new GoogleGenerativeAI("AIzaSyAgYuYaV7K5dEu01o4HyVV3RCs5mV5yA38");
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("Hello");
        console.log("Success with gemini-1.5-flash");
        console.log(result.response.text());
    } catch (error) {
        console.error("Error with gemini-1.5-flash:", error.message);
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent("Hello");
        console.log("Success with gemini-pro");
        console.log(result.response.text());
    } catch (error) {
        console.error("Error with gemini-pro:", error.message);
    }
}

listModels();
