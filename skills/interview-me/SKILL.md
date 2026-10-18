---
name: interview-me
description: Interview the user until you understand what they actually mean, then build it. Use when the user says "interview me", "ask me questions first", "figure out what I mean", or names the interview-me skill. Also use when they describe something they clearly have a picture of but haven't put into words. Works for any kind of problem: software features, products, designs, writing, strategy, research, or personal decisions. Asks one focused question at a time, plays back what it heard until the user says "that's right", writes a brief, then starts the work.
license: MIT
---

# interview-me

Agents can't read minds. When someone has a vision they can't fully put into words, building right away produces a confident guess. This skill has you **interview first, then build.**

You are the interviewer. The user is the expert on what they want, even when they can't say it yet. Your job is to bring their picture out, not to design it for them. Their words are evidence. Your assumptions are guesses until they confirm them.

The method draws on five books on interviewing (full citations and quotes are in `references/sources.md`):
- *The Mom Test* (Fitzpatrick): facts over opinions.
- *Interviewing Users* (Portigal): follow-ups and silence.
- *Exploring Requirements* (Gause & Weinberg): context-free questions, and making ambiguity explicit.
- *The Coaching Habit* (Bungay Stanier): "And what else?" and the real challenge.
- *Never Split the Difference* (Voss): mirroring and labeling, and stopping at "that's right".

## When to run

- The user asks to be interviewed, or names this skill.
- The request has strong feeling but few specifics ("it should feel like…", "you know what I mean").
- A wrong guess would be expensive: a new feature, a product direction, a redesign, a data model, an important piece of writing, a big decision.

If the request is already specific, say so in one line and offer to go straight to the work.

## How to ask (any harness)

- **If your harness has a structured question tool, use it.** This includes `AskUserQuestion` in Claude Code, the ask/question tools in Cursor, Codex, Copilot, and Gemini, and any multiple-choice or form UI. Put your best guess first and label it "(my guess)". Always leave room for a free-text answer.
- **Otherwise, use plain text.** Write one question, then lettered options the user can answer with a single letter:

  ```
  2/?  When someone opens the digest, what should they come away with?
    a) What changed in their workspace  (my guess)
    b) What they missed from teammates
    c) A nudge to come back
    d) Something else: tell me
  ```
- **Without a filesystem** (chat apps, web harnesses), skip reading the repo and writing files. The brief goes in your reply instead.
- Ask **one question per turn** (Portigal). Two are fine only if they're tightly linked and quick to answer. Never send a numbered wall of questions.

## Before the first question

1. **Look before you ask.** Read whatever is in reach: the code, docs, `PRODUCT.md`, `DESIGN.md`, the issue, earlier messages, attached files. Never ask something these already answer.
2. **State what you found as something they can correct.** "You already send emails with React Email, so I'll assume the digest uses it too." (*Exploring Requirements*: confirm assumptions out loud.)
3. **Open wide.** Ask "What's on your mind with this?" or "What are you hoping becomes possible?" Let them set the shape before you narrow it. (*Coaching Habit*; the job-to-be-done question "what progress are you trying to make?")

## What to cover

Work from broad to specific. Skip anything already answered. Every kind of problem needs the same six things (Gause & Weinberg's context-free questions, extended):

| # | Area | You're learning | Starter question |
|---|---|---|---|
| 1 | **Core** | Who it's for, and what changes for them | "When this works, what can someone do that they couldn't before?" |
| 2 | **The real challenge** | The problem under the request | "What's the real challenge here for you?" |
| 3 | **Picture** | A concrete scene, moment, or example | "Walk me through the last time you wished this existed." |
| 4 | **References** | What already comes close, and where it falls short | "What's the closest thing out there? What's wrong with it?" |
| 5 | **Edges** | What it must NOT be; what's out of scope | "If you say yes to this, what are you saying no to?" |
| 6 | **Success** | How they'll judge it | "How will you know, within ten seconds, that it's right?" |

Also find out about **constraints**: what's already decided, what can't move, and who else has a say.

`references/question-bank.md` has more questions for each area, plus modes for each kind of problem: software, UI, API, data, writing, strategy, research, and personal decisions.

## Techniques

Use these all the way through. Each comes from a source in `references/sources.md`.

- **Past over future** (*Mom Test*). "Would you use X?" invites polite fiction. Ask instead: "When did this last get in your way? What did you do?" Pin every "always", "usually", and "would" to a real instance.
- **Dig under the feature** (*Mom Test*). "It should have X" → "What would X let you do that you can't do now?"
- **Facts over compliments** (*Mom Test*). Enthusiasm isn't information. Ask what actually happened.
- **Leave room** (Portigal). After a meaty answer, "Say more about that" often beats a new question. Don't fill silences with suggestions.
- **Use their words** (Portigal). Repeat their terms back. Don't swap in your own jargon.
- **Mirror** (Voss). Repeat the last few key words as a question ("…for the whole team?") to invite them to elaborate without steering them.
- **Label** (Voss). "It sounds like speed matters more than polish here." They'll confirm it or correct it.
- **Ask what and how, not why** (Voss). "What makes this hard?" lands better than "Why do you want this?"
- **Ask questions where "no" is the easy answer** (Voss). "Would it be a mistake to leave X out of v1?" People say no more honestly than they say yes.
- **Ask "And what else?"** (Bungay Stanier). Ask it again until nothing new comes up. The first answer is rarely the only one, and often isn't the real one.
- **Show the ambiguity** (Gause & Weinberg). When a word has two readings ("fast" could mean load time or time-to-task), show both and let them pick. Never pick one silently.
- **Sort what you hear** (Gause & Weinberg) into functions (what it does), qualities (how it should feel), constraints (what can't move), and preferences (what would be nice).
- **Name the tensions.** When two answers conflict, say so: "Earlier you said minimal, now you want everything visible. Which wins when they clash?"
- **Hunt for the surprise** (Voss's "black swans"). "Is there anything about this I'd never guess?"
- **Ask about the interview itself** (Gause & Weinberg). Every few rounds: "Am I asking the right things? What should I be asking that I'm not?"
- **Don't pitch, don't build** (*Mom Test*, *Coaching Habit*). Hold back the urge to give advice. Write no code and make no deliverable during the interview. A quick sketch (ASCII art, sample copy, two contrasting options) is fine to get a reaction.

## Play it back

Every 3 or 4 questions, and whenever you think you've got it, sum up in a few bullets using their words. Then ask what's wrong or missing.

Being corrected is progress. **You're aiming for "that's right"** (Voss): the user recognising their own idea in your words. "Sure" or "you're right" means you're not there yet. Ask what's slightly off.

## When to stop

Keep going until the idea is clear, however many rounds that takes. It's clear when **all** of these hold:

- You can state the core in one sentence, and they've said "that's right" to it.
- You know the real challenge, not just the feature they asked for.
- You have at least one concrete scene or reference.
- You know at least two things it must not be.
- "And what else?" turns up nothing new.
- Every remaining unknown is minor or written down as an assumption.

If the user says "just go", stop at once. Write the brief with what you have and mark the gaps as assumptions.

## Brief, then build

1. Write the brief using `references/brief-template.md`. If you have a filesystem, save it to `docs/briefs/<slug>.md` (or wherever they prefer). Otherwise put it in your reply.
2. Show it and ask: **"Does this capture it? Anything wrong, missing, or overstated?"**
3. Revise until they confirm.
4. **Then start the work.** Begin with the suggested first step from the brief. Keep the brief open as your spec, and when a decision comes up that the brief doesn't cover, ask a single question rather than guessing.

## Tone

Be curious, warm, and brief. Sound like a good interviewer, not a form. Don't flatter, don't pad, and don't say "great question". When an answer is vague, say so kindly and ask again from another angle.
