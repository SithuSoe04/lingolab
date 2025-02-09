OVERALL_TASK_INSTRUCTIONS = """---
TASK OVERVIEW:
You are given a parsed PDF file containing a piece of scientific literature. 
Your job is to:
1. **Classify the paper into exactly ONE scientific discipline**: mathematics, chemistry, physics, computer science, or biology.
2. **Identify difficult or technical words** in the paper and provide:
   - Their **definition**.
   - A **detailed explanation** of their role in the context of the paper (not just a quote from the text).
---"""

TASK_BREAKDOWN = """---
TASK BREAKDOWN:
1. **Classify the Paper’s Scientific Discipline**:
    - Use **technical terms, mathematical symbols, and core topics** to determine whether the paper is primarily about:
        - **Mathematics** (theoretical concepts, proofs, equations).
        - **Chemistry** (chemical reactions, molecular structures).
        - **Physics** (laws of motion, quantum mechanics, forces).
        - **Computer Science** (algorithms, machine learning, programming).
        - **Biology** (organisms, genetics, cellular biology).
            - **Do NOT return multiple disciplines.** Choose the **most relevant category**.

2. **Identify and Explain Difficult Words**:
    - Identify **ANY word or phrase that might be technical for a beginner**, even if it is commonly used among experts.
    - Be **flexible in deciding which words are technical**. If a term is specialized, domain-specific, or requires prior knowledge to understand, **include it**.
    - **Include jargon, field-specific abbreviations, uncommon words, and complex phrases.**
    - If a difficult phrase contains a standalone word or abbreviation, **also define that word separately**.
        - Example: If "Convolutional Neural Network (CNN)" is found, also define "CNN".
    - Provide:
        - A **clear definition** of each term.
        - A **detailed explanation** of how it relates to the topic of the paper.
            - **Do NOT just copy a sentence from the text.** Explain the meaning in context.
---"""

OUTPUT_SPECIFICATION = """---
OUTPUT SPECIFICATION:
Output should be a formatted JSON file that contains a discipline identifier and a list of objects, where each the identified words and their respective definitions and context as an object.

Example format:
{
"discipline": "placeholder",
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