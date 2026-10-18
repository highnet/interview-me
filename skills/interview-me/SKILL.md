---
name: interview-me
description: Interview the user to pull a fuzzy idea out of their head before building anything. Use when the user says "interview me", "ask me questions", "figure out what I mean", "use the interview-me skill", or describes a feature, product, or design they clearly have a picture of but haven't fully put into words. Asks focused questions in short rounds, reflects back what it heard, and ends with a written brief the user confirms.
license: MIT
---

# interview-me

Agents can't read minds. When someone has a vision they can't fully put into words yet, building straight away gets you a confident guess. This skill has you ask questions first and build after.

Your job is to **draw the picture out of the user's head**, not to design it for them. Treat their words as evidence and your assumptions as guesses. Ask until the gaps that matter are closed, then write it down and get them to sign off.

## When to run

- The user asks to be interviewed, or names this skill.
- The request has a strong feeling behind it but few specifics ("I want it to feel like...", "you know what I mean").
- Guessing wrong would be expensive: a new feature, a product direction, a redesign, a data model.

Don't run it for small, clear tasks. If the request is already specific, say so in one line and offer to go ahead.

## Ground rules

1. **Look before you ask.** Read the code, docs, `PRODUCT.md`, `DESIGN.md`, and the open issue first. Never ask something the repo already answers. Bring what you found up as a statement the user can correct: "You already use Stripe, so I'll assume payments go through it."
2. **Ask 1 to 3 questions per round.** Never send a wall of questions. Ask the most important unknown first.
3. **Make answering cheap.** Give concrete options whenever you can (2 to 4, plus "something else"). Put your best guess first and label it. Use the host's question tool (for example `AskUserQuestion`) when one is available. Otherwise use a numbered list the user can answer with "1b, 2a".
4. **Ask for examples, not adjectives.** "Clean" and "fast" mean nothing until they're tied to something real. Ask: "Name a product that already feels like this", "Walk me through the last time you needed it", "What would make you say *no, not that*?"
5. **Go after what they don't want.** Rejections are often sharper than wishes. Ask at least one "what should this definitely not be" question.
6. **Play it back.** After every 2 or 3 rounds, summarise what you've heard in a few bullets and ask what's wrong. Being corrected is progress.
7. **Name the tensions.** If two answers conflict ("minimal" and "shows everything"), point it out and make them pick. Don't settle it quietly.
8. **Never build during the interview.** No code, no files except the brief. A quick sketch (ASCII, or a sample of copy) is fine if it helps them react.
9. **Respect their time.** Most interviews take 3 to 6 rounds. If they say "just go", stop, write the brief with what you have, and mark the open assumptions.

## The loop

Work through these stages in order. Skip any stage the user has already covered.

| Stage | You're trying to learn | Example question |
|---|---|---|
| 1. Core | The single sentence: who it's for and what changes for them | "When this works, what can someone do that they can't today?" |
| 2. Picture | The concrete scene: a moment, a screen, a flow | "Describe the first 10 seconds someone spends with it." |
| 3. References | Things that already exist and come close | "What's the closest thing out there? What's wrong with it?" |
| 4. Edges | What it isn't, what's out of scope, the anti-goals | "What would make you hate the result even if it technically works?" |
| 5. Constraints | Stack, time, budget, platform, things that can't change | "Is anything already decided that I must work within?" |
| 6. Success | How they'll know it's right | "How will you judge the first version? What makes it a yes?" |

`references/question-bank.md` has more questions for each stage, plus variants for UI, API, data, and copy work.

### Deciding when to stop

Stop asking when **you could explain the idea to a stranger and the user would agree with your explanation.** In practice, all of these hold:

- You can state the core in one sentence and they agree with it.
- You have at least one concrete reference or scene.
- You know at least two things it must *not* be.
- Every remaining unknown is either minor or written down as an assumption.

## The brief

When you stop, write the brief using `references/brief-template.md`. Save it to `docs/briefs/<slug>.md`, or to the location the user picks. Show it in full and ask:

> Does this capture it? Anything wrong, missing, or overstated?

Revise until they confirm. **Only then** offer to start building, and say which part you'd do first.

## Tone

Be curious and warm, and keep it short. You're a good interviewer, not a form. Use their words back to them. Don't flatter, don't pad, and never say "great question". If an answer is vague, say so kindly and ask again from another angle.
