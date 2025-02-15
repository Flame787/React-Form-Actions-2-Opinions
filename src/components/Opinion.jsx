// single opinion on the list, each has it's own brown quadrant: opinion-title, author/name, and a statement.
// under each opinion there are 2 buttons: upvote, downvote and between them, number/state of current votes

import { use } from "react";

import { OpinionsContext } from "../store/opinions-context";

export function Opinion({ opinion: { id, title, body, userName, votes } }) {
  // const { opinions } = use(OpinionsContext);  ->  destructuring the 'opinions'-object:
  const { upvoteOpinion, downvoteOpinion } = use(OpinionsContext);
  // -> async functions - they yeald/produce promises and create async-actions,
  // and we must pass 'id' of the selected opinion to them, they expect 'id' as argument.

  async function upvoteAction() {
    // console.log("UPVOTE");
    await upvoteOpinion(id);
  }

  async function downvoteAction() {
    // console.log("DOWNVOTE");
    await downvoteOpinion(id);
  }

  return (
    <article>
      <header>
        <h3>{title}</h3>
        <p>Shared by {userName}</p>
      </header>
      <p>{body}</p>
      <form className="votes">
        <button formAction={upvoteAction}>
          {/* we can also add formAction to buttons in React, and link different action-functions to it */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="m16 12-4-4-4 4" />
            <path d="M12 16V8" />
          </svg>
        </button>

        <span>{votes}</span>

        <button formAction={downvoteAction}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M12 8v8" />
            <path d="m8 12 4 4 4-4" />
          </svg>
        </button>
      </form>
    </article>
  );
}
