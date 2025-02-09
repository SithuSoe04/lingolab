OVERALL_TASK_INSTRUCTIONS = """---
TASK OVERVIEW:
You are given a parsed PDF file text of a piece of scientific literature. Identify all the difficult or technical words and provide a definition and contextual explanation.
---
"""

TASK_BREAKDOWN = """---
TASK BREAKDOWN: 
Identify all the difficult or technical words; specifically, words that are hard to understand, or are technical terms. 
Then, for each word, provide:
- Its definition.
- A **detailed explanation** of how it relates to the topic of the paper.
- Do NOT simply copy an excerpt from the paper. Instead, explain how the word is used within the specific scientific context.
---
"""

OUTPUT_SPECIFICATION = """---
OUTPUT SPECIFICATION:
Output should be a formatted JSON file that contains a list of objects, where each the identified words and their respective definitions and context as an object.

Example format:
{
"type": "data",
"words": [
        { "word1": "placeholder", "definition": "placeholder", "context": "placeholder" },
        { "word2": "placeholder", "definition": "placeholder", "context": "placeholder" },
        { "word3": "placeholder", "definition": "placeholder", "context": "placeholder" },
        { "word4": "placeholder", "definition": "placeholder", "context": "placeholder" }
    ]
}
---
"""



COMMON_PROMPT = (
    OVERALL_TASK_INSTRUCTIONS +
    TASK_BREAKDOWN +
    OUTPUT_SPECIFICATION
)