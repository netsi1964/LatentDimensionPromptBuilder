# 🧠 Latent Dimension Prompt Builder (LDPB)

A powerful tool for extracting and transferring semantic styles across different types of content using Large Language Models (LLMs).

## 🌟 What is it?

The Latent Dimension Prompt Builder helps you understand how AI models "see" and process information. Just like your brain instantly creates mental profiles when you see a person (height, hair color, eye color, etc.), LLMs process inputs across abstract **latent dimensions** to understand the essence of what they're perceiving.

This tool extracts these semantic fingerprints and lets you apply them creatively to other content.

## 🎯 Key Features

- **🧠 Semantic Analysis**: Extract the 20 most important latent dimensions from any text or image
- **🎨 Style Transfer**: Apply extracted semantic styles to generate new content
- **📊 JSON Output**: Structured data with dimension categories, explanations, and value spectrums
- **🖥️ Interactive Interface**: User-friendly web interface with real-time processing
- **🎭 Creative Applications**: Generate images, text, or other content with transferred semantic properties
- **🔧 Dimension Adjustment**: Interactive sliders to fine-tune importance ratings (1-100) for each dimension
- **📋 Multiple Prompt Formats**: Generate prompts in different formats:
  - **LLM Prompt**: Optimized for Large Language Models
  - **Text Prompt**: Simple text-based prompts
  - **Text/JSON Prompt**: Combined text and structured JSON output
  - **Grid Text/JSON Prompt**: 3x3 grid variations for image generation
  - **Text Variations**: 11 different text variations based on selected dimensions
- **🔗 URL Sharing**: Generate shareable URLs with current dimension configuration
- **📋 One-Click Copy**: Copy any prompt format to clipboard with toast notifications
- **💾 JSON Import/Export**: Load and save dimension configurations as JSON files
- **🔄 Real-time Updates**: Automatic URL updates and prompt regeneration as you adjust settings
- **📱 Responsive Design**: Works seamlessly on desktop and mobile devices
- **🎯 Dimension Selection**: Radio button selection for grid and variation prompts
- **⚡ Toast Notifications**: User-friendly feedback for all actions
- **🔍 Context Support**: Works with text, paragraphs, and image references

## 🚀 How it Works

1. **Input Context**: Provide text, paragraphs, or images as input
2. **Dimension Extraction**: The tool asks the LLM to describe how it perceives the context
3. **Structured Output**: Returns a JSON object containing:
   - 20 most important latent dimensions
   - Category values for each dimension (e.g., "Calm", "Modern", "Muted")
   - Explanations of each dimension
   - 10 additional values showing the dimension's spectrum
   - Examples of how dimensions appear in the input
4. **Style Application**: Use the extracted semantic fingerprint to style other content

## 📖 Example Use Cases

- **Image Generation**: Generate a rose styled with the same expressive dimensions as a person
- **Content Creation**: Transfer the "aura" of one piece of content to another
- **Style Analysis**: Understand what makes content feel "modern", "calm", or "energetic"
- **Creative Inspiration**: Discover new ways to express ideas through semantic transfer

## 🖼️ Examples

Check out these examples to see the tool in action:

![Example 1](examples/images/example1.png)
*Applying extracted cartoon related dimensions from a cartoon image and generating variations of 'Cartoon Realismm" dimension applied to a food image.*

![Example 2](examples/images/example2.png)
*Playing around with dimensions from a piece of art I liked and then applying it to a selfie*

### Example 3 - variation on "sarkasm" from John Cleese style of humor
This example I made the LDPB analyse a joke from John Cleese. Asked it to "Focus on the style of humor" (+ the prompt from LDPB).
I then used the "Text Variations" prompt and applied it to a random piece of news, getting John Clese style with varied sarkasm results:

**Sarcasm Intensity variations**

| Sarcasm Intensity | Value                                                                    |
| ----------------- | ------------------------------------------------------------------------ |
| Sincere           | Gudrun Stürmer helps control pigeon populations using humane methods.    |
| Light             | Gudrun and the pigeons: just another day in urban wildlife care.         |
| Playful           | Gudrun’s undercover mission? Distracting pigeons with decoy eggs.        |
| Dry               | Nothing says modern progress like tricking birds with plastic.           |
| Wry               | Because nothing keeps nature in check like counterfeit eggs.             |
| Moderate Sarcasm  | Yes, the grand battle of city life: Gudrun vs. pigeons with fake eggs.   |
| Cutting           | Finally, a real solution to pigeons: lies, deception, and tiny props.    |
| Bitter            | We can’t fix housing, but at least Gudrun’s got the birds fooled.        |
| Scornful          | Human ingenuity peaked at plastic eggs for pigeons. Bravo, civilization. |
| Cruel             | Birds lay real eggs, we lay traps. Who’s the evolved species again?      |
| Venomous          | Ah yes, deceive nature to fix what we destroyed. Genius-level stuff.     |

**Based on this context (Quote from [BBC](https://www.bbc.com/news/topics/cx2pk70323et)):**

> Gudrun Stürmer in a hat and blue top, holding a pigeon
> 
> Using fake eggs to control pigeon populations
> 
> As many towns and cities are having to deal with exploding bird and animal populations, People Fixing the World takes a look at ways to control numbers in an effective and humane way.



You can **focus** on *parts* of the content you want to get dimensions on. Like the example above where I gave the LLM a John Cleese joke and asked it to focus on the style of humor, simply by prefixing the Prompt for LLM with: `Focus on the style of the humor` You can try this one out your self: [John Cleese style of humor dimensions](https://netsi1964.github.io/LatentDimensionPromptBuilder?data=JTdCJTIybGF0ZW50X2RpbWVuc2lvbnMlMjIlM0ElNUIlN0IlMjJuYW1lJTIyJTNBJTIyQ3luaWNpc20lMjBMZXZlbCUyMiUyQyUyMmV4cGxhbmF0aW9uJTIyJTNBJTIySW5kaWNhdGVzJTIwaG93JTIwc2tlcHRpY2FsJTIwb3IlMjBkaXN0cnVzdGZ1bCUyMHRoZSUyMGh1bW9yJTIwaXMlMjB0b3dhcmQlMjBpbnN0aXR1dGlvbnMlMjBvciUyMHByb2Zlc3Npb25zJTIyJTJDJTIydmFsdWUlMjIlM0ElMjJNaWxkbHklMjBDeW5pY2FsJTIyJTJDJTIyaW1wb3J0YW5jZSUyMiUzQTkxJTJDJTIyZXhhbXBsZV92YWx1ZSUyMiUzQSUyMiU1QyUyMnBlb3BsZSUyMGNvdWxkbid0JTIwZmlndXJlJTIwb3V0JTIwd2hpY2glMjBzaWRlJTIwb2YlMjB0aGUlMjBzdGFtcCUyMHRvJTIwc3BpdCUyMG9uJTVDJTIyJTIyJTJDJTIydmFsdWVzJTIyJTNBJTVCJTIyTmFpdmUlMjIlMkMlMjJJZGVhbGlzdGljJTIyJTJDJTIyVHJ1c3RpbmclMjIlMkMlMjJTaW5jZXJlJTIyJTJDJTIyRHJ5JTIyJTJDJTIyTWlsZGx5JTIwQ3luaWNhbCUyMiUyQyUyMkN5bmljYWwlMjIlMkMlMjJKYWRlZCUyMiUyQyUyMk1vY2tpbmclMjIlMkMlMjJBY2VyYmljJTIyJTJDJTIyQml0dGVyJTIyJTVEJTdEJTJDJTdCJTIybmFtZSUyMiUzQSUyMlB1bmNobGluZSUyMEFtYmlndWl0eSUyMiUyQyUyMmV4cGxhbmF0aW9uJTIyJTNBJTIySG93JTIwbXVjaCUyMHRoZSUyMGpva2UlMjByZWxpZXMlMjBvbiUyMGluZGlyZWN0bmVzcyUyMG9yJTIwbWlzZGlyZWN0aW9uJTIyJTJDJTIydmFsdWUlMjIlM0ElMjJNb2RlcmF0ZWx5JTIwVHdpc3RlZCUyMiUyQyUyMmltcG9ydGFuY2UlMjIlM0E4NCUyQyUyMmV4YW1wbGVfdmFsdWUlMjIlM0ElMjIlNUMlMjJ3aGljaCUyMHNpZGUlMjBvZiUyMHRoZSUyMHN0YW1wJTIwdG8lMjBzcGl0JTIwb24lNUMlMjIlMjIlMkMlMjJ2YWx1ZXMlMjIlM0ElNUIlMjJMaXRlcmFsJTIyJTJDJTIyRGlyZWN0JTIyJTJDJTIyT2J2aW91cyUyMiUyQyUyMlNpbXBsZSUyMiUyQyUyMlN1YnRsZSUyMiUyQyUyMk1vZGVyYXRlbHklMjBUd2lzdGVkJTIyJTJDJTIyU3VycHJpc2luZyUyMiUyQyUyMkxheWVyZWQlMjIlMkMlMjJDcnlwdGljJTIyJTJDJTIyT2JzY3VyZSUyMiUyQyUyMkFic3VyZCUyMiU1RCU3RCUyQyU3QiUyMm5hbWUlMjIlM0ElMjJBdXRob3JpdHklMjBTYXRpcmUlMjIlMkMlMjJleHBsYW5hdGlvbiUyMiUzQSUyMkRlZ3JlZSUyMG9mJTIwbW9ja2VyeSUyMG9yJTIwY3JpdGlxdWUlMjBhaW1lZCUyMGF0JTIwZmlndXJlcyUyMG9mJTIwYXV0aG9yaXR5JTIwb3IlMjByZXNwZWN0JTIyJTJDJTIydmFsdWUlMjIlM0ElMjJTYXJjYXN0aWMlMjIlMkMlMjJpbXBvcnRhbmNlJTIyJTNBODglMkMlMjJleGFtcGxlX3ZhbHVlJTIyJTNBJTIyJTVDJTIyY29tbWVtb3JhdGl2ZSUyMHN0YW1wcyUyMGNvbW1lbW9yYXRpbmclMjBsYXd5ZXJzJTVDJTIyJTIyJTJDJTIydmFsdWVzJTIyJTNBJTVCJTIyUmVzcGVjdGZ1bCUyMiUyQyUyMkVhcm5lc3QlMjIlMkMlMjJHZW50bGUlMjIlMkMlMjJQbGF5ZnVsJTIyJTJDJTIySXJvbmljJTIyJTJDJTIyU2FyY2FzdGljJTIyJTJDJTIyQ3V0dGluZyUyMiUyQyUyMkRpc3Jlc3BlY3RmdWwlMjIlMkMlMjJSaWRpY3VsaW5nJTIyJTJDJTIyU2NhdGhpbmclMjIlMkMlMjJEZWZhbWF0b3J5JTIyJTVEJTdEJTJDJTdCJTIybmFtZSUyMiUzQSUyMkZvcm1hbGl0eSUyMG9mJTIwTGFuZ3VhZ2UlMjIlMkMlMjJleHBsYW5hdGlvbiUyMiUzQSUyMlRoZSUyMGxldmVsJTIwb2YlMjBzdHJ1Y3R1cmVkJTJDJTIwZm9ybWFsJTJDJTIwb3IlMjBwb2xpc2hlZCUyMGxhbmd1YWdlJTIwdXNlZCUyMiUyQyUyMnZhbHVlJTIyJTNBJTIyQ29udmVyc2F0aW9uYWwlMjIlMkMlMjJpbXBvcnRhbmNlJTIyJTNBNjIlMkMlMjJleGFtcGxlX3ZhbHVlJTIyJTNBJTIyJTVDJTIydGhleSUyMGhhZCUyMHRvJTIwd2l0aGRyYXclMjB0aGVtJTVDJTIyJTIyJTJDJTIydmFsdWVzJTIyJTNBJTVCJTIyQWNhZGVtaWMlMjIlMkMlMjJTdGlsdGVkJTIyJTJDJTIyRm9ybWFsJTIyJTJDJTIyUG9saXNoZWQlMjIlMkMlMjJQcm9mZXNzaW9uYWwlMjIlMkMlMjJDb252ZXJzYXRpb25hbCUyMiUyQyUyMkNvbGxvcXVpYWwlMjIlMkMlMjJDYXN1YWwlMjIlMkMlMjJTbGFuZ3klMjIlMkMlMjJVbmZpbHRlcmVkJTIyJTJDJTIyQ3J1ZGUlMjIlNUQlN0QlMkMlN0IlMjJuYW1lJTIyJTNBJTIySGlzdG9yaWNhbCUyMElyb255JTIyJTJDJTIyZXhwbGFuYXRpb24lMjIlM0ElMjJIb3clMjBtdWNoJTIwdGhlJTIwaHVtb3IlMjBkcmF3cyUyMG9uJTIwb3IlMjB0d2lzdHMlMjBlc3RhYmxpc2hlZCUyMHRyYWRpdGlvbnMlMjBvciUyMHJlc3BlY3RlZCUyMHN5bWJvbHMlMjIlMkMlMjJ2YWx1ZSUyMiUzQSUyMlRyYWRpdGlvbi1VbmRlcm1pbmluZyUyMiUyQyUyMmltcG9ydGFuY2UlMjIlM0E3NCUyQyUyMmV4YW1wbGVfdmFsdWUlMjIlM0ElMjIlNUMlMjJUaGUlMjBVLlMuJTIwUG9zdGFsJTIwU2VydmljZS4uLmNvbW1lbW9yYXRpdmUlMjBzdGFtcHMlNUMlMjIlMjIlMkMlMjJ2YWx1ZXMlMjIlM0ElNUIlMjJSZXZlcmVudCUyMiUyQyUyMlJlc3BlY3RmdWwlMjIlMkMlMjJDYXV0aW91cyUyMiUyQyUyMkJhbGFuY2VkJTIyJTJDJTIyTmV1dHJhbCUyMiUyQyUyMlRyYWRpdGlvbi1VbmRlcm1pbmluZyUyMiUyQyUyMkNyaXRpY2FsJTIyJTJDJTIySXJvbmljJTIyJTJDJTIyRGFya2x5JTIwSXJvbmljJTIyJTJDJTIyTW9jay1IaXN0b3JpYyUyMiUyQyUyMlN1YnZlcnNpdmUlMjIlNUQlN0QlMkMlN0IlMjJuYW1lJTIyJTNBJTIyRGVsaXZlcnklMjBTaGFycG5lc3MlMjIlMkMlMjJleHBsYW5hdGlvbiUyMiUzQSUyMlRoZSUyMGFicnVwdG5lc3MlMjBvciUyMHNtb290aG5lc3MlMjBvZiUyMHRoZSUyMHB1bmNobGluZSUyMGRlbGl2ZXJ5JTIyJTJDJTIydmFsdWUlMjIlM0ElMjJTbmFwcHklMjIlMkMlMjJpbXBvcnRhbmNlJTIyJTNBNzElMkMlMjJleGFtcGxlX3ZhbHVlJTIyJTNBJTIyJTVDJTIyc3BpdCUyMG9uJTVDJTIyJTIyJTJDJTIydmFsdWVzJTIyJTNBJTVCJTIyUmFtYmxpbmclMjIlMkMlMjJEcmF3bi1vdXQlMjIlMkMlMjJHcmFkdWFsJTIyJTJDJTIyRmxvd2luZyUyMiUyQyUyMlNtb290aCUyMiUyQyUyMlNuYXBweSUyMiUyQyUyMkFicnVwdCUyMiUyQyUyMkphcnJpbmclMjIlMkMlMjJCbHVudCUyMiUyQyUyMlN1ZGRlbiUyMiUyQyUyMlN0YWNjYXRvJTIyJTVEJTdEJTJDJTdCJTIybmFtZSUyMiUzQSUyMkFic3VyZGl0eSUyMExldmVsJTIyJTJDJTIyZXhwbGFuYXRpb24lMjIlM0ElMjJUaGUlMjBkZWdyZWUlMjBvZiUyMGlycmF0aW9uYWxpdHklMjBvciUyMHN1cnJlYWxpc20lMjBpbiUyMHRoZSUyMGNvbnRlbnQlMjIlMkMlMjJ2YWx1ZSUyMiUzQSUyMk1pbGRseSUyMEFic3VyZCUyMiUyQyUyMmltcG9ydGFuY2UlMjIlM0E3MCUyQyUyMmV4YW1wbGVfdmFsdWUlMjIlM0ElMjIlNUMlMjJsYXd5ZXJzJTIwb24lMjBzdGFtcHMlNUMlMjIlMjIlMkMlMjJ2YWx1ZXMlMjIlM0ElNUIlMjJSZWFsaXN0aWMlMjIlMkMlMjJHcm91bmRlZCUyMiUyQyUyMkJlbGlldmFibGUlMjIlMkMlMjJDb21tb25wbGFjZSUyMiUyQyUyMkRyeSUyMEh1bW9yJTIyJTJDJTIyTWlsZGx5JTIwQWJzdXJkJTIyJTJDJTIyU2lsbHklMjIlMkMlMjJHb29meSUyMiUyQyUyMlJpZGljdWxvdXMlMjIlMkMlMjJMdWRpY3JvdXMlMjIlMkMlMjJPdXRsYW5kaXNoJTIyJTVEJTdEJTJDJTdCJTIybmFtZSUyMiUzQSUyMkN1bHR1cmFsJTIwU3BlY2lmaWNpdHklMjIlMkMlMjJleHBsYW5hdGlvbiUyMiUzQSUyMkhvdyUyMG11Y2glMjB0aGUlMjBqb2tlJTIwcmVsaWVzJTIwb24lMjBhJTIwc3BlY2lmaWMlMjBjdWx0dXJhbCUyMGNvbnRleHQlMjIlMkMlMjJ2YWx1ZSUyMiUzQSUyMkFtZXJpY2FuLUZvY3VzZWQlMjIlMkMlMjJpbXBvcnRhbmNlJTIyJTNBNTglMkMlMjJleGFtcGxlX3ZhbHVlJTIyJTNBJTIyJTVDJTIyVGhlJTIwVS5TLiUyMFBvc3RhbCUyMFNlcnZpY2UlNUMlMjIlMjIlMkMlMjJ2YWx1ZXMlMjIlM0ElNUIlMjJVbml2ZXJzYWwlMjIlMkMlMjJHbG9iYWwlMjIlMkMlMjJHZW5lcmljJTIwV2VzdGVybiUyMiUyQyUyMk1vZGVybiUyMiUyQyUyMlN1YnRsZSUyMEFtZXJpY2FuJTIyJTJDJTIyQW1lcmljYW4tRm9jdXNlZCUyMiUyQyUyMkRlZXAlMjBBbWVyaWNhbmElMjIlMkMlMjJIeXBlcmxvY2FsJTIyJTJDJTIyUmVnaW9uYWwlMjBEaWFsZWN0JTIyJTJDJTIyT2JzY3VyZSUyMFJlZmVyZW5jZSUyMiUyQyUyMkluLUpva2UlMjIlNUQlN0QlMkMlN0IlMjJuYW1lJTIyJTNBJTIyTW9yYWwlMjBFZGdpbmVzcyUyMiUyQyUyMmV4cGxhbmF0aW9uJTIyJTNBJTIyRGVncmVlJTIwdG8lMjB3aGljaCUyMHRoZSUyMGpva2UlMjBjaGFsbGVuZ2VzJTIwZXRoaWNhbCUyMG5vcm1zJTIwb3IlMjBvZmZlbmRzJTIwc2Vuc2liaWxpdGllcyUyMiUyQyUyMnZhbHVlJTIyJTNBJTIyQm9yZGVybGluZSUyMFRhY3RsZXNzJTIyJTJDJTIyaW1wb3J0YW5jZSUyMiUzQTY5JTJDJTIyZXhhbXBsZV92YWx1ZSUyMiUzQSUyMiU1QyUyMnNwaXQlMjBvbiU1QyUyMiUyMGFuZCUyMGl0cyUyMGltcGxpZWQlMjBkaXNkYWluJTIyJTJDJTIydmFsdWVzJTIyJTNBJTVCJTIyV2hvbGVzb21lJTIyJTJDJTIyUG9saXRlJTIyJTJDJTIyU2FmZSUyMiUyQyUyMkFjY2VwdGFibGUlMjIlMkMlMjJDcmlzcCUyMiUyQyUyMkJvcmRlcmxpbmUlMjBUYWN0bGVzcyUyMiUyQyUyMlByb3ZvY2F0aXZlJTIyJTJDJTIyUnVkZSUyMiUyQyUyMkNyYXNzJTIyJTJDJTIyT2ZmZW5zaXZlJTIyJTJDJTIyU2hvY2tpbmclMjIlNUQlN0QlMkMlN0IlMjJuYW1lJTIyJTNBJTIyUHJvZmVzc2lvbmFsJTIwU3RlcmVvdHlwZSUyMFVzZSUyMiUyQyUyMmV4cGxhbmF0aW9uJTIyJTNBJTIySG93JTIwbXVjaCUyMHRoZSUyMGpva2UlMjBkZXBlbmRzJTIwb24lMjBjbGljaCVDMyVBOXMlMjBvciUyMGdlbmVyYWxpemF0aW9ucyUyMGFib3V0JTIwcHJvZmVzc2lvbnMlMjIlMkMlMjJ2YWx1ZSUyMiUzQSUyMlJlbGllcyUyMG9uJTIwVHJvcGVzJTIyJTJDJTIyaW1wb3J0YW5jZSUyMiUzQTc3JTJDJTIyZXhhbXBsZV92YWx1ZSUyMiUzQSUyMiU1QyUyMmxhd3llcnMlNUMlMjIlMjBhcyUyMHVudHJ1c3R3b3J0aHklMjIlMkMlMjJ2YWx1ZXMlMjIlM0ElNUIlMjJPcmlnaW5hbCUyMiUyQyUyMlBlcnNvbmFsaXplZCUyMiUyQyUyMkZyZXNoJTIyJTJDJTIyVW5pcXVlJTIyJTJDJTIyTnVhbmNlZCUyMiUyQyUyMlJlbGllcyUyMG9uJTIwVHJvcGVzJTIyJTJDJTIyUmVjb2duaXphYmxlJTIyJTJDJTIyT3ZlcnVzZWQlMjIlMkMlMjJDYXJpY2F0dXJlZCUyMiUyQyUyMkNhcnRvb25pc2glMjIlMkMlMjJFeGFnZ2VyYXRlZCUyMiU1RCU3RCUyQyU3QiUyMm5hbWUlMjIlM0ElMjJQYWNpbmclMjIlMkMlMjJleHBsYW5hdGlvbiUyMiUzQSUyMlRoZSUyMHRpbWluZyUyMGFuZCUyMHJoeXRobSUyMGxlYWRpbmclMjB1cCUyMHRvJTIwdGhlJTIwcHVuY2hsaW5lJTIyJTJDJTIydmFsdWUlMjIlM0ElMjJNb2RlcmF0ZSUyMEJ1aWxkLXVwJTIyJTJDJTIyaW1wb3J0YW5jZSUyMiUzQTU1JTJDJTIyZXhhbXBsZV92YWx1ZSUyMiUzQSUyMiU1QyUyMi4uLmhhZCUyMHRvJTIwd2l0aGRyYXclMjB0aGVtJTIwd2l0aGluJTIwYSUyMGNvdXBsZSUyMG9mJTIwd2Vla3MuLi4lNUMlMjIlMjIlMkMlMjJ2YWx1ZXMlMjIlM0ElNUIlMjJEcmF3bi1vdXQlMjIlMkMlMjJTbG93JTIwQnVybiUyMiUyQyUyMkdlbnRsZSUyMFJpc2UlMjIlMkMlMjJNZWFzdXJlZCUyMiUyQyUyMk5hdHVyYWwlMjIlMkMlMjJNb2RlcmF0ZSUyMEJ1aWxkLXVwJTIyJTJDJTIyU2hhcnAlMjBSaXNlJTIyJTJDJTIyRmFzdCUyMFNldHVwJTIyJTJDJTIyQWJydXB0JTIyJTJDJTIyU25hcCUyMEN1dCUyMiUyQyUyMk9uZS1saW5lciUyMiU1RCU3RCUyQyU3QiUyMm5hbWUlMjIlM0ElMjJDbGV2ZXJuZXNzJTIwUXVvdGllbnQlMjIlMkMlMjJleHBsYW5hdGlvbiUyMiUzQSUyMlRoZSUyMGRlZ3JlZSUyMG9mJTIwaW50ZWxsZWN0dWFsJTIwcGxheSUyMGluJTIwdGhlJTIwam9rZSUyMiUyQyUyMnZhbHVlJTIyJTNBJTIyV2l0dGlseSUyMENvbnN0cnVjdGVkJTIyJTJDJTIyaW1wb3J0YW5jZSUyMiUzQTg1JTJDJTIyZXhhbXBsZV92YWx1ZSUyMiUzQSUyMiU1QyUyMmNvdWxkbiVFMiU4MCU5OXQlMjBmaWd1cmUlMjBvdXQlMjB3aGljaCUyMHNpZGUuLi4lNUMlMjIlMjBhcyUyMGElMjBtaXNkaXJlY3Rpb24lMjIlMkMlMjJ2YWx1ZXMlMjIlM0ElNUIlMjJEdWxsJTIyJTJDJTIyTGl0ZXJhbCUyMiUyQyUyMlBsYWluJTIyJTJDJTIyU2ltcGxlJTIyJTJDJTIyU2xpZ2h0bHklMjBDbGV2ZXIlMjIlMkMlMjJXaXR0aWx5JTIwQ29uc3RydWN0ZWQlMjIlMkMlMjJDbGV2ZXIlMjIlMkMlMjJTbWFydCUyMiUyQyUyMlNoYXJwJTIyJTJDJTIySW5nZW5pb3VzJTIyJTJDJTIyQnJpbGxpYW50JTIyJTVEJTdEJTJDJTdCJTIybmFtZSUyMiUzQSUyMk5vc3RhbGdpYyUyMFRvbmUlMjIlMkMlMjJleHBsYW5hdGlvbiUyMiUzQSUyMkxldmVsJTIwb2YlMjBvbGQtZmFzaGlvbmVkJTIwb3IlMjByZXRybyUyMGZlZWxpbmclMjBpbiUyMHRoZSUyMGpva2UlMjIlMkMlMjJ2YWx1ZSUyMiUzQSUyMk1pbGRseSUyMFJldHJvJTIyJTJDJTIyaW1wb3J0YW5jZSUyMiUzQTQ0JTJDJTIyZXhhbXBsZV92YWx1ZSUyMiUzQSUyMiU1QyUyMlBvc3RhbCUyMHNlcnZpY2UlMjBzdGFtcHMlNUMlMjIlMjIlMkMlMjJ2YWx1ZXMlMjIlM0ElNUIlMjJNb2Rlcm4lMjIlMkMlMjJDb250ZW1wb3JhcnklMjIlMkMlMjJUaW1lbGVzcyUyMiUyQyUyMlN1YnRsZSUyMFJldHJvJTIyJTJDJTIySW1wbGllZCUyMFBhc3QlMjIlMkMlMjJNaWxkbHklMjBSZXRybyUyMiUyQyUyMlF1YWludCUyMiUyQyUyMk9sZC1UaW1leSUyMiUyQyUyMk91dGRhdGVkJTIyJTJDJTIyVmludGFnZSUyMiUyQyUyMkFudGlxdWF0ZWQlMjIlNUQlN0QlMkMlN0IlMjJuYW1lJTIyJTNBJTIyVmlzdWFsJTIwSW1hZ2luYXRpb24lMjBUcmlnZ2VyJTIyJTJDJTIyZXhwbGFuYXRpb24lMjIlM0ElMjJIb3clMjBlYXNpbHklMjB0aGUlMjBqb2tlJTIwY29uanVyZXMlMjBhJTIwbWVudGFsJTIwaW1hZ2UlMjIlMkMlMjJ2YWx1ZSUyMiUzQSUyMlZpdmlkbHklMjBTdWdnZXN0aXZlJTIyJTJDJTIyaW1wb3J0YW5jZSUyMiUzQTY2JTJDJTIyZXhhbXBsZV92YWx1ZSUyMiUzQSUyMiU1QyUyMndoaWNoJTIwc2lkZSUyMG9mJTIwdGhlJTIwc3RhbXAlMjB0byUyMHNwaXQlMjBvbiU1QyUyMiUyMiUyQyUyMnZhbHVlcyUyMiUzQSU1QiUyMkFic3RyYWN0JTIyJTJDJTIySGFyZCUyMHRvJTIwUGljdHVyZSUyMiUyQyUyMlN1YnRsZSUyMiUyQyUyMk1pbGQlMjIlMkMlMjJSZWNvZ25pemFibGUlMjIlMkMlMjJWaXZpZGx5JTIwU3VnZ2VzdGl2ZSUyMiUyQyUyMkRldGFpbGVkJTIyJTJDJTIyQ2luZW1hdGljJTIyJTJDJTIyR3JhcGhpYyUyMiUyQyUyMkV4dHJlbWUlMjIlMkMlMjJHcm90ZXNxdWUlMjIlNUQlN0QlMkMlN0IlMjJuYW1lJTIyJTNBJTIyVGVtcG9yYWwlMjBTcGVjaWZpY2l0eSUyMiUyQyUyMmV4cGxhbmF0aW9uJTIyJTNBJTIySG93JTIwYW5jaG9yZWQlMjB0aGUlMjBodW1vciUyMGlzJTIwdG8lMjBhJTIwc3BlY2lmaWMlMjB0aW1lJTIwcGVyaW9kJTIyJTJDJTIydmFsdWUlMjIlM0ElMjJMYXRlJTIwMjB0aCUyMENlbnR1cnklMjIlMkMlMjJpbXBvcnRhbmNlJTIyJTNBNDklMkMlMjJleGFtcGxlX3ZhbHVlJTIyJTNBJTIyJTVDJTIycG9zdGFsJTIwc2VydmljZSUyMHN0YW1wcyU1QyUyMiUyMiUyQyUyMnZhbHVlcyUyMiUzQSU1QiUyMlRpbWVsZXNzJTIyJTJDJTIyRnV0dXJlLU9yaWVudGVkJTIyJTJDJTIyUHJlc2VudC1EYXklMjIlMkMlMjIyMDEwcyUyMiUyQyUyMjIwMDBzJTIyJTJDJTIyTGF0ZSUyMDIwdGglMjBDZW50dXJ5JTIyJTJDJTIyTWlkLUNlbnR1cnklMjIlMkMlMjJXV0lJJTIwRXJhJTIyJTJDJTIyRGVwcmVzc2lvbiUyMEVyYSUyMiUyQyUyMlZpY3RvcmlhbiUyMiUyQyUyMkhpc3RvcmljJTIyJTVEJTdEJTJDJTdCJTIybmFtZSUyMiUzQSUyMklyb255JTIwRGVuc2l0eSUyMiUyQyUyMmV4cGxhbmF0aW9uJTIyJTNBJTIySG93JTIwbXVjaCUyMG9mJTIwdGhlJTIwam9rZSUyMHJlbGllcyUyMG9uJTIwaXJvbnklMjIlMkMlMjJ2YWx1ZSUyMiUzQSUyMkhpZ2glMjBJcm9ueSUyMiUyQyUyMmltcG9ydGFuY2UlMjIlM0E4NiUyQyUyMmV4YW1wbGVfdmFsdWUlMjIlM0ElMjIlNUMlMjJjb21tZW1vcmF0aXZlJTIwc3RhbXBzJTIwY29tbWVtb3JhdGluZyUyMGxhd3llcnMlNUMlMjIlMjIlMkMlMjJ2YWx1ZXMlMjIlM0ElNUIlMjJOb25lJTIyJTJDJTIyTG93JTIyJTJDJTIyTGlnaHQlMjBUb3VjaCUyMiUyQyUyMkltcGxpZWQlMjIlMkMlMjJTdWJ0bGUlMjIlMkMlMjJIaWdoJTIwSXJvbnklMjIlMkMlMjJFeHBsaWNpdCUyMiUyQyUyMlNhcmRvbmljJTIyJTJDJTIyQml0aW5nJTIyJTJDJTIyTGF5ZXJlZCUyMiUyQyUyMlJlY3Vyc2l2ZSUyMiU1RCU3RCUyQyU3QiUyMm5hbWUlMjIlM0ElMjJVc2UlMjBvZiUyMFdvcmRwbGF5JTIyJTJDJTIyZXhwbGFuYXRpb24lMjIlM0ElMjJFeHRlbnQlMjBvZiUyMHB1bnMlMkMlMjBkb3VibGUlMjBtZWFuaW5ncyUyQyUyMG9yJTIwcGhvbmV0aWMlMjB0cmlja3MlMjIlMkMlMjJ2YWx1ZSUyMiUzQSUyMk1pbGQlMjBXb3JkcGxheSUyMiUyQyUyMmltcG9ydGFuY2UlMjIlM0E1OSUyQyUyMmV4YW1wbGVfdmFsdWUlMjIlM0ElMjIlNUMlMjJzcGl0JTIwb24lNUMlMjIlMjBhcyUyMGJvdGglMjBsaXRlcmFsJTIwYW5kJTIwc3ltYm9saWMlMjIlMkMlMjJ2YWx1ZXMlMjIlM0ElNUIlMjJOb25lJTIyJTJDJTIyRmxhdCUyMiUyQyUyMlBsYWluJTIyJTJDJTIyU3RyYWlnaHQlMjIlMkMlMjJEcnklMjIlMkMlMjJNaWxkJTIwV29yZHBsYXklMjIlMkMlMjJEb3VibGUlMjBNZWFuaW5nJTIyJTJDJTIyUHVuLUJhc2VkJTIyJTJDJTIyUGhvbmV0aWMlMjBUcmljayUyMiUyQyUyMkxheWVyZWQlMjBQdW4lMjIlMkMlMjJNZXRhLVdvcmRwbGF5JTIyJTVEJTdEJTJDJTdCJTIybmFtZSUyMiUzQSUyMlNvY2lhbCUyMENvbW1lbnRhcnklMjBEZXB0aCUyMiUyQyUyMmV4cGxhbmF0aW9uJTIyJTNBJTIyTGV2ZWwlMjBvZiUyMGVtYmVkZGVkJTIwc29jaWFsJTIwY3JpdGlxdWUlMjBvciUyMGNvbW1lbnRhcnklMjIlMkMlMjJ2YWx1ZSUyMiUzQSUyMkxpZ2h0JTIwQ29tbWVudGFyeSUyMiUyQyUyMmltcG9ydGFuY2UlMjIlM0E2OCUyQyUyMmV4YW1wbGVfdmFsdWUlMjIlM0ElMjIlNUMlMjJjcmVhdGVkJTIwYSUyMHNlcmllcy4uLiUyMGhhZCUyMHRvJTIwd2l0aGRyYXclMjB0aGVtJTVDJTIyJTIyJTJDJTIydmFsdWVzJTIyJTNBJTVCJTIyTm9uZSUyMiUyQyUyMlN1cmZhY2UtTGV2ZWwlMjIlMkMlMjJUaGluJTIyJTJDJTIyU3VidGxlJTIyJTJDJTIySW1wbGllZCUyMiUyQyUyMkxpZ2h0JTIwQ29tbWVudGFyeSUyMiUyQyUyMk1vZGVyYXRlJTIyJTJDJTIyRGlyZWN0JTIyJTJDJTIySGVhdnktSGFuZGVkJTIyJTJDJTIyQmx1bnQlMjIlMkMlMjJQcmVhY2h5JTIyJTVEJTdEJTJDJTdCJTIybmFtZSUyMiUzQSUyMlN5bGxhYmljJTIwUmh5dGhtJTIyJTJDJTIyZXhwbGFuYXRpb24lMjIlM0ElMjJIb3clMjBtdWNoJTIwdGhlJTIwam9rZSUyMGZsb3dzJTIwcmh5dGhtaWNhbGx5JTIwaW4lMjBpdHMlMjBzeWxsYWJsZXMlMjIlMkMlMjJ2YWx1ZSUyMiUzQSUyMkxpZ2h0JTIwUmh5dGhtJTIyJTJDJTIyaW1wb3J0YW5jZSUyMiUzQTM5JTJDJTIyZXhhbXBsZV92YWx1ZSUyMiUzQSUyMiU1QyUyMmNyZWF0ZWQlMjBhJTIwc2VyaWVzJTIwb2YlMjBjb21tZW1vcmF0aXZlJTIwc3RhbXBzLi4uJTVDJTIyJTIyJTJDJTIydmFsdWVzJTIyJTNBJTVCJTIyQ2hvcHB5JTIyJTJDJTIyQ2x1bmt5JTIyJTJDJTIySXJyZWd1bGFyJTIyJTJDJTIyVW5ldmVuJTIyJTJDJTIyU3RyYWlnaHRmb3J3YXJkJTIyJTJDJTIyTGlnaHQlMjBSaHl0aG0lMjIlMkMlMjJGbG93aW5nJTIyJTJDJTIyQm91bmN5JTIyJTJDJTIyTHlyaWNhbCUyMiUyQyUyMlBvZXRpYyUyMiUyQyUyMk11c2ljYWwlMjIlNUQlN0QlMkMlN0IlMjJuYW1lJTIyJTNBJTIyU2FyY2FzbSUyMEludGVuc2l0eSUyMiUyQyUyMmV4cGxhbmF0aW9uJTIyJTNBJTIyVGhlJTIwaGFyc2huZXNzJTIwb3IlMjBiaXRlJTIwb2YlMjB0aGUlMjBzYXJjYXN0aWMlMjB0b25lJTIyJTJDJTIydmFsdWUlMjIlM0ElMjJNb2RlcmF0ZSUyMFNhcmNhc20lMjIlMkMlMjJpbXBvcnRhbmNlJTIyJTNBNzMlMkMlMjJleGFtcGxlX3ZhbHVlJTIyJTNBJTIyJTVDJTIycGVvcGxlJTIwY291bGRuJUUyJTgwJTk5dCUyMGZpZ3VyZSUyMG91dC4uLiU1QyUyMiUyMiUyQyUyMnZhbHVlcyUyMiUzQSU1QiUyMlNpbmNlcmUlMjIlMkMlMjJMaWdodCUyMiUyQyUyMlBsYXlmdWwlMjIlMkMlMjJEcnklMjIlMkMlMjJXcnklMjIlMkMlMjJNb2RlcmF0ZSUyMFNhcmNhc20lMjIlMkMlMjJDdXR0aW5nJTIyJTJDJTIyQml0dGVyJTIyJTJDJTIyU2Nvcm5mdWwlMjIlMkMlMjJDcnVlbCUyMiUyQyUyMlZlbm9tb3VzJTIyJTVEJTdEJTVEJTdE)

## 🛠️ Usage

1. Open the [Latent Dimension Prompt Builder](https://netsi1964.github.io/LatentDimensionPromptBuilder/)
2. Enter your context (text, paragraph, or upload an image)
3. Click "Extract Dimensions" to analyze the semantic properties
4. Review the structured JSON output with all latent dimensions
5. Use the extracted semantic fingerprint for creative applications

## 🔗 Resources

- **Live Demo**: [https://netsi1964.github.io/LatentDimensionPromptBuilder/](https://netsi1964.github.io/LatentDimensionPromptBuilder/)
- **LinkedIn Post**: [Read about the Latent Dimension Prompt Builder](https://www.linkedin.com/feed/update/urn:li:ugcPost:7348996154723860481/?source=LatentPromptBuilder)
- **GitHub Repository**: [https://github.com/netsi1964/LatentDimensionPromptBuilder](https://github.com/netsi1964/LatentDimensionPromptBuilder)

## 👨‍💻 Creator

This tool was created by **netsi1964** as an exploration of how Large Language Models process and understand semantic information. The project demonstrates how AI models can extract and transfer the "essence" or "style" of content across different mediums.

## 💡 The Philosophy

> "Because to an LLM, everything is just data."

This tool embodies the idea that AI models can understand and transfer semantic properties across different types of content. Just as your brain can recognize patterns and styles, LLMs can extract and apply these patterns in creative ways.

To me, it is a profound finding that **detecting, altering, and reapplying the LLM labels for any object is possible**. This discovery quantifies content, style, and semantic essence in ways that can be shared, modified, and transferred. It's like having a universal language for describing the "soul" of any piece of content—whether it's text, images, or other media.

This understanding emerged from countless hours of learning from the AI community. I'm deeply grateful to the content creators who share their knowledge and insights:

- **[Machine Learning Street Talk](https://www.youtube.com/@MachineLearningStreetTalk)** - For deep dives into AI research and practical applications
- **[The AI in Business Podcast](https://podcasts.apple.com/us/podcast/the-ai-in-business-podcast/id670771965/)** - For insights into real-world AI implementations
- **[The Stephen Wolfram Podcast](https://podcasts.apple.com/dk/podcast/the-stephen-wolfram-podcast/id1296350707)** - For fundamental perspectives on computation and AI
- And many more YouTube channels and podcasts that continue to educate and inspire

**Thank you to all content sharing people out there!** Your work makes discoveries like this possible.

## 📄 License

This project is open source and available under the [LICENSE](LICENSE) file.

---

**Ready to explore the semantic dimensions of your content?** [Try the Latent Dimension Prompt Builder now!](https://netsi1964.github.io/LatentDimensionPromptBuilder/)
