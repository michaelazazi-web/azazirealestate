// Single source of truth for the /probate page copy.
// Used by the React page AND by scripts/prerender.mjs (for FAQ structured data),
// so the visible text and the schema.org markup always match.

export const PROBATE_META = {
  path: "/probate",
  title: "Probate Real Estate Agent in Charlotte, NC | Michael Azazi, CPE",
  description:
    "Selling an inherited or estate home in Charlotte? Michael Azazi, a Certified Probate Expert (CPE) and REALTOR® with eXp Realty licensed in NC & SC, guides personal representatives and heirs through the probate sale process.",
};

export const NC_STEPS = [
  {
    h: "The personal representative qualifies with the Clerk of Superior Court",
    p: "In North Carolina, estates are opened with the Clerk of Superior Court in the county where the person lived (for Charlotte, that is Mecklenburg County). The executor named in the will, or an administrator if there is no will, receives Letters Testamentary or Letters of Administration. Those letters are what give someone authority to act for the estate.",
  },
  {
    h: "Notice to creditors is published",
    p: "The personal representative publishes a notice to creditors once a week for four consecutive weeks. Creditors must present claims by a date at least three months after the first publication. This timeline often shapes when a sale can close and how the proceeds are handled.",
  },
  {
    h: "Confirm who has authority to sell the house",
    p: "If the will grants a power of sale, the personal representative can generally sell the property. If it does not, the personal representative may need to petition the Clerk for permission, and court-ordered sales include 10-day upset bid periods and confirmation before closing. When heirs sell directly, North Carolina has timing rules that can require the personal representative to join in the deed. Your estate attorney confirms which path applies.",
  },
  {
    h: "Prepare, price, and market the property",
    p: "Inherited homes are often dated, partly furnished, or in need of repair. We decide together whether to sell as-is or make targeted improvements, based on what the numbers and the family's timeline support.",
  },
  {
    h: "Close and coordinate proceeds with the estate",
    p: "The closing attorney and the estate attorney coordinate how sale proceeds are paid out and accounted for. I keep everyone, including family members out of state, updated through every step.",
  },
];

export const SC_SUMMARY =
  "South Carolina estates are handled by the Probate Court in the county where the person lived, such as York or Lancaster County near Charlotte. The personal representative publishes a notice to creditors once a week for three consecutive weeks, and creditors generally have eight months from the first publication to file claims. Because I am licensed in both states, one agent can handle a Charlotte estate that also owns property across the line.";

export const SERVICES = [
  "Walking the property with you and giving an honest read on condition and value, as-is and with improvements",
  "Coordinating access, clean-out, and repair vendors when the family is local or out of state",
  "Working alongside your estate attorney so the sale fits the court's timeline and requirements",
  "Pricing strategy built on local comparable sales, not wishful thinking",
  "Weekly written updates so every heir sees the same information at the same time",
  "Real estate representation in both North Carolina and South Carolina",
];

export const CHOOSING = [
  {
    h: "Probate-specific training",
    p: "Ask whether the agent holds a probate designation such as the Certified Probate Expert (CPE) and how many estate sales they have guided through court requirements.",
  },
  {
    h: "Understands the court process",
    p: "A good probate agent knows the difference between a sale under a will's power of sale and a court-ordered sale with upset bids, and plans the timeline around it.",
  },
  {
    h: "Works with your attorney, not around them",
    p: "Real estate agents should not give legal advice. Look for someone who keeps your estate attorney in the loop and knows when a question belongs with them.",
  },
  {
    h: "Licensed where the property is",
    p: "Charlotte families often hold property on both sides of the state line. An agent licensed in North Carolina and South Carolina can represent the estate in both.",
  },
  {
    h: "Clear, regular communication",
    p: "Estates often involve several heirs with different opinions. Ask how often you will get updates and whether everyone receives them.",
  },
  {
    h: "Honest pricing on as-is homes",
    p: "Ask for the comparable sales behind any price. An agent who tells you what you want to hear can cost the estate months.",
  },
];

export const PROBATE_FAQ = [
  {
    q: "Do I need court approval to sell a house in probate in North Carolina?",
    a: "It depends. If the will gives the personal representative a power of sale, court approval is usually not required. If it does not, the personal representative may need to petition the Clerk of Superior Court, and court-ordered sales include upset bid periods and confirmation. Your estate attorney can confirm which applies.",
  },
  {
    q: "Can an inherited house be sold before probate is finished?",
    a: "Often, yes. Many estate homes are sold while the estate is still open, once the personal representative has authority to sell. Timing around the creditor notice period matters, so coordinate with your estate attorney.",
  },
  {
    q: "Who signs the listing agreement for an estate property?",
    a: "Generally, someone with legal authority to sell, usually the personal representative. In some cases the heirs sign as well. Your attorney can confirm who needs to sign in your situation.",
  },
  {
    q: "Can you help if the property is in South Carolina?",
    a: "Yes. Michael Azazi is licensed in both North Carolina and South Carolina and works with estates on both sides of the Charlotte Metro area.",
  },
  {
    q: "Do I have to fix up an inherited house before selling it?",
    a: "No. Many estate homes sell as-is. Michael compares the likely as-is price with the price after targeted repairs so the family can choose with real numbers.",
  },
  {
    q: "Do you give legal advice?",
    a: "No. Michael is a real estate agent, not an attorney. He works alongside your estate attorney, who advises on legal questions about the estate.",
  },
  {
    q: "What does a consultation cost?",
    a: "Nothing. A probate property consultation is free and carries no obligation. Call or text (704) 494-1953 or book online at azazirealestate.com/schedule.",
  },
];

export const DISCLAIMER =
  "This page is general information about real estate and probate, not legal advice. Probate law and court procedures change and depend on the facts of each estate. Consult a licensed North Carolina or South Carolina attorney about your situation.";
