"use client";

import { useActionState } from "react";

export default function MealsFormSubmit() {
    const { pending } = useActionState();

    return <button disabled={pending} type="submit">
        {pending ? 'Submitting...' : 'Share Meal'}
    </button>
}