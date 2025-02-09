OVERALL_TASK_INSTRUCTIONS = """---
TASK OVERVIEW:
You are given a parsed PDF file text of a piece of scientific literature. Identify all the difficult words and provide a definition and contextual explanation.
---
"""

TASK_BREAKDOWN = """---
TASK BREAKDOWN: 
Identify all the difficult words and phrases; specifically, phrases that are uncommon, hard to understand, not self-explanatory, or technical terms. 
Then, for each word, provide its definition as well as explain within the context of the paper.
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