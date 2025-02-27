import OpenAI from "openai";

const openai = new OpenAI({
    organization: "org-XGadsTPh0H5a4co8xYU6VQm2",
    project: "proj_EE8ljHCfgUFs9PFQBHLMIACL",
    apiKey: "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"
});

async function main() {
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

main();