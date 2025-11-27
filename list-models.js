const { GoogleGenerativeAI } = require("@google/generative-ai");

async function checkModels() {
    const apiKey = "AIzaSyAgYuYaV7K5dEu01o4HyVV3RCs5mV5yA38";
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.models) {
            console.log("Supported Models:");
            data.models.forEach(model => {
                if (model.supportedGenerationMethods.includes("generateContent")) {
                    console.log(model.name.replace("models/", ""));
                }
            });
        } else {
            console.log("No models found or error:", data);
        }
    } catch (error) {
        console.error("Error listing models:", error);
    }
}

checkModels();
