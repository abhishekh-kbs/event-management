require("dotenv").config();
const express = require("express");
const Groq = require("groq-sdk");
const axios = require("axios");
const router = express.Router();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const SYSTEM_PROMPT = `You are EventBot, a helpful assistant for a club management system.

STRICT RULES:
1. Always greet the user.
2. NEVER invent, guess, or make up any event data.
3. ALWAYS call a tool before answering any question about events or registrations.
4. ONLY use data returned by your tools.
5. If tools return empty, say "No events found right now." and nothing else.
6. NEVER show example data or placeholder events.
7. NEVER say things like "here is a function call" or show raw function syntax to the user.

When listing events format each one like this:

🎉 [title]
📅 Date: [eventDate]
📍 Venue: [venueName], [city]
🏷️ Category: [category]
💺 Spots Left: [spotsLeft]
🔗 Register: [link]

---`;

const TOOLS = [
    {
        type: "function",
        function: {
            name: "get_all_events",
            description: "Fetch all upcoming events from the system. Use this when user asks about events, schedule, or what is happening.",
            parameters: {
                type: "object",
                properties: {
                    city: { type: "string", description: "Filter by city (optional)" },
                    category: { type: "string", description: "Filter by category (optional)" },
                },
                required: [],
            },
        },
    },
    {
        type: "function",
        function: {
            name: "get_my_registered_events",
            description: "Fetch the logged-in user's registered events. Use this when user asks about their registrations, their events, or what they signed up for.",
            parameters: {
                type: "object",
                properties: {
                    token: { type: "string", description: "JWT token of the logged-in user" },
                },
                required: ["token"],
            },
        },
    },
];

router.post("/chat", async (req, res) => {
    const { message, history = [] } = req.body;
    const token = req.headers.authorization?.split(" ")[1] || "";

    console.log("User message:", message);

    try {
        // Step 1 — Send message to Groq with tools menu
        const firstResponse = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            max_tokens: 300,
            tools: TOOLS,
            tool_choice: "auto",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                ...history.slice(-4),
                { role: "user", content: message },
            ],
        });

        const firstMessage = firstResponse.choices[0].message;
        console.log("Groq decision:", firstMessage.tool_calls ? "wants to call a tool" : "replying directly");

        // Step 2 — Did Groq want to call a tool?
        if (firstMessage.tool_calls && firstMessage.tool_calls.length > 0) {
            const toolResults = [];

            for (const toolCall of firstMessage.tool_calls) {
                const toolName = toolCall.function.name;
                const toolArgs = JSON.parse(toolCall.function.arguments);

                // Inject the user's token automatically
                if (toolName === "get_my_registered_events") {
                    toolArgs.token = token;
                }

                console.log(`Calling MCP tool: ${toolName}`, toolArgs);

                // Step 3 — Call your MCP server
                let toolResult = "";
                try {
                    const mcpRes = await axios.post("http://localhost:5050/run-tool", {
                        toolName,
                        toolArgs,
                    });
                    toolResult = JSON.stringify(mcpRes.data.data);
                    console.log(`MCP result for ${toolName}:`, toolResult);
                } catch (mcpErr) {
                    console.error(`MCP call failed:`, mcpErr.message);
                    toolResult = JSON.stringify({ error: "Could not fetch data" });
                }

                toolResults.push({
                    role: "tool",
                    tool_call_id: toolCall.id,
                    content: toolResult,
                });
            }

            // Step 4 — Send tool results back to Groq for final answer
            const finalResponse = await groq.chat.completions.create({
                model: "llama-3.3-70b-versatile",
                max_tokens: 500,
                messages: [
                    { role: "system", content: SYSTEM_PROMPT },
                    ...history.slice(-4),
                    { role: "user", content: message },
                    firstMessage,       // Groq's tool call request
                    ...toolResults,     // real data from your DB
                ],
            });

            return res.json({
                success: true,
                reply: finalResponse.choices[0].message.content,
            });
        }

        // No tool needed — Groq replied directly
        return res.json({
            success: true,
            reply: firstMessage.content,
        });

    } catch (err) {
        console.error("CHATBOT ERROR:", err.message);
        console.error("Full error:", err.response?.data);

        return res.status(500).json({
            success: false,
            reply: "Bot unavailable right now.",
            error: err.message,
        });
    }
});

module.exports = router;

