// single opinion on the list, each has it's own brown quadrant: opinion-title, author/name, and a statement.
// under each opinion there are 2 buttons: upvote, downvote and between them, number/state of current votes

// import { use } from "react";
// use-hook is similar to useContext-hook -> it's used to connect a component with global Context

import { use, useActionState, useOptimistic } from "react";
// useActionState-hook will be used so that we check if the button for upvote/downvote was already clicked,
// and user cannot click it again. It gives us the 'pending' info - if the form is currently being submitted.
// useOptimistic - novi hook, pomaže u optimističnom uploadanju sučelja prije nego što se podaci službeno ažuriraju na serveru

import { OpinionsContext } from "../store/opinions-context";

export function Opinion({ opinion: { id, title, body, userName, votes } }) {
  // const { opinions } = use(OpinionsContext);  ->  destructuring the 'opinions'-object:
  const { upvoteOpinion, downvoteOpinion } = use(OpinionsContext);
  // -> async functions - they yeald/produce promises and create async-actions,
  // and we must pass 'id' of the selected opinion to them, they expect 'id' as argument.

  const [optimisticVotes, setVotesOptimistically] = useOptimistic(votes, (prevVotes, mode) =>
    (mode === "up" ? prevVotes + 1 : prevVotes - 1)
  );
  // optimisticVotes - number of votes, a temporary state, only shown in UI while the form is being submitted,
  // thereafter, this state will be thrown away and the actual votes-state will be shown: 
  // (prevVotes, mode) => mode === "up" ? prevVotes + 1 : prevVotes - 1
  // setVotesOptimistically - should be called in a form action
  // 'mode' is a 2nd argument after prevVotes, if 2nd argument exists, it should be passed to setVotesOptimistically-function
  // values for 'mode': can be 'up' or 'down'

  async function upvoteAction() {
    // console.log("UPVOTE");

    setVotesOptimistically("up");
    await upvoteOpinion(id);
  }

  async function downvoteAction() {
    // console.log("DOWNVOTE");
    setVotesOptimistically("down");
    await downvoteOpinion(id);
  }

  // ... useActionState(upvoteAction, null);
  // ... useActionState(downvoteAction, null);
  // initial state is null, because we don't manage any from state then.
  // We can also write like this, without any initial status (like 'null'):
  const [upvoteFormState, upvoteFormAction, upvotePending] =
    useActionState(upvoteAction);
  const [downvoteFormState, downvoteFormAction, downvotePending] =
    useActionState(downvoteAction);

  return (
    <article>
      <header>
        <h3>{title}</h3>
        <p>Shared by {userName}</p>
      </header>
      <p>{body}</p>
      <form className="votes">
        {/* <button formAction={upvoteAction}> */}
        {/* we can also add formAction to buttons in React, and link different action-functions to it */}
        <button
          formAction={upvoteFormAction}
          disabled={upvotePending || downvotePending}
        >
          {/* after we started using the useActionState-hook: {upvoteAction} => {upvoteFormAction} */}
          {/* button disabled - if user already pressed upvote or downvote on one opinion, 
          no more pressing is possible at the same moment, but only a sec or 2sec later, when the
          form was already submitted and adjusted, and button gets enabled again */}
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

        {/* <span>{votes}</span> */}
        <span>{optimisticVotes}</span>

        {/* <button formAction={downvoteAction}> */}
        <button
          formAction={downvoteFormAction}
          disabled={downvotePending || upvotePending}
        >
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


/*   

These are the core form actions related features, that React offers.
And the key takeaway they offer is that you can define functions which you can pass as values
for the action prompt to form elements, or as you learned to buttons,
and then there the formAction prompt, and React will then make sure
that these action functions are invoked and it will give you the form data automatically.
So it will automatically collect all the input values and give you such a form data object.
It will also automatically reset the form, which can be a problem.
And that's why you also might want to use useActionState so that your form action can return a value,
any value of your choice. Can be a object, as is the case here, but doesn't have to be.
And then you can use that form state to update the UI to show some error messages, for example,
but also to pre-populate, or repopulate those input fields with the values entered by the user, for example.
And you can do anything you want in your form actions. You can store the code in local storage
if you want to do that. But you can also, of course, use context or directly send a request
from inside the form action if you want to, to send the data to a backend, because form actions can be async.
They don't have to be, as you also saw in this section, but they can be.
And if they are async and if they potentially take a bit longer, you got additional hooks like you useFormStatus,
which you can use to update the UI whilst the form is being submitted.
And you got useOptimistic to perform Optimistic updates. So to set some temporary state, some temporary value,
which will automatically be thrown away once the form submission is over, so once the action function is done.
You can use all these features thanks to this form actions feature that's built into React.
Now when it comes to handling form submissions, it's therefore, of course, is up to you
whether you want to use form actions or whether you want to handle submissions manually
with help of the on submit prompt and by preventing the default and by using all these things you learned
in the previous course section, because that's also absolutely valid. 
You don't have to use form actions, but of course, you can.

*/