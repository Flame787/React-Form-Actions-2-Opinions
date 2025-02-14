// reusable component: Submit, can be used in any Form which uses formActions, to change button-text conditionally

import { useFormStatus } from "react-dom";
// new hook

export default function Submit() {
  const { pending } = useFormStatus();
  // this hook returns various informations about current status of the form

  return (
    <p className="actions">
      <button type="submit" disabled={pending}>
        {pending ? "Submitting..." : "Submit"}   
        {/* conditionally changing the text inside of the submit-button */}
      </button>
    </p>
    /* transferred from the component: NewOpinion.jsx: */
  );
}
