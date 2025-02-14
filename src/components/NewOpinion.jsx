import { useActionState } from "react";

export function NewOpinion() {
  function shareOpinionAction(prevState, formData) {
    // add prevState as 1st argument, even if not using it currently
    const title = formData.get("title");
    const userName = formData.get("userName");
    const body = formData.get("body");

    // validation:
    let errors = [];

    if (title.trim().length < 5) {
      errors.push("Title of the message must be at least 5 characters long.");
    }
    if (body.trim().length < 10 || body.trim().length > 300) {
      errors.push("Opinions must be between 10 and 300 characters long.");
    }
    if (!userName.trim()) {
      errors.push("Please provide your name.");
    }

    if (errors.length > 0) {
      return {
        errors, // errors(key): errors, enteredValues: {...}
        enteredValues: {
          title,
          body,
          userName,
        },
      };
    }

    // submit to backend

    // clear the form - return new form-state object, reset errors to null:
    return { errors: null };
  }

  // new hook:
  const [formState, formAction] = useActionState(shareOpinionAction, {
    errors: null,
  });

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>   
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              defaultValue={formState.enteredValues?.userName} 
              // for keeping entered values, in case of some other error(s) - when submit is not yet possible
            />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={formState.enteredValues?.title}
            />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea
            id="body"
            name="body"
            rows={5}
            defaultValue={formState.enteredValues?.body}
          ></textarea>
        </p>

        {/* conditionally: check if formState.errors is truethy, and if yes, display the <ul>: */}
        {formState.errors && (
          <ul className="errors">
            {formState.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}

        <p className="actions">
          <button type="submit">Submit</button>
        </p>
      </form>
    </div>
  );
}
