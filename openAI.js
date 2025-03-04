import OpenAI from "openai";

const openai = new OpenAI({
    organization: "org-XGadsTPh0H5a4co8xYU6VQm2",
    project: "proj_EE8ljHCfgUFs9PFQBHLMIACL",
});
//apiKey: ""
async function openaiStream() {
    const stream = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: "Say this is a test" }],
        store: true,
        stream: true,
    });
    for await (const chunk of stream) {
        process.stdout.write(chunk.choices[0]?.delta?.content || "");
    }
}

openaiStream();