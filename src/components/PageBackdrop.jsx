import React from "react";

/**
 * Shared page background — white base with the brand's blue / orange
 * gradient and two soft glows, as used on the partners landing page.
 */
export default function PageBackdrop() {
  return (
    <>
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 bg-white" />
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-br from-primary/10 via-white to-accent/10" />
      <div aria-hidden="true" className="pointer-events-none fixed top-[-12%] right-[-8%] w-[38rem] h-[38rem] bg-primary/15 rounded-full blur-3xl -z-10" />
      <div aria-hidden="true" className="pointer-events-none fixed bottom-[-14%] left-[-10%] w-[42rem] h-[42rem] bg-accent/15 rounded-full blur-3xl -z-10" />
    </>
  );
}