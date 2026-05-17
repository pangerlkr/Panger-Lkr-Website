export interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string
  tags: string[]
  publishedAt: string
  readingTime: number
}

export const articles: Article[] = [
  {
    id: '1',
    slug: 'why-most-breaches-are-not-sophisticated',
    title: 'Why Most Breaches Are Not Sophisticated',
    excerpt:
      'The myth of the elite hacker obscures a more uncomfortable truth: organisations are compromised daily through basic oversights, not zero-days.',
    content: `The myth of the elite hacker—armed with custom exploits and nation-state resources—makes for compelling news. But the daily reality of breach investigations tells a different story.

## The Uncomfortable Truth

The majority of successful attacks exploit one of three things: misconfiguration, weak credentials, or unpatched known vulnerabilities. None of these require advanced tradecraft. They require patience and a checklist.

When an attacker finds an S3 bucket set to public, they did not bypass any security control. They found an absence of one.

When a phishing email succeeds because an employee was never trained to recognise social engineering, the attacker exploited a gap in awareness, not in your firewall.

## Misconfiguration as Attack Surface

Cloud environments are particularly vulnerable here. Default permissions, overly permissive IAM policies, and exposed management interfaces account for a disproportionate share of cloud breaches. The attacker's job is increasingly about reconnaissance, not exploitation.

Tools that scan for publicly exposed services are freely available. An attacker does not need to write a single line of exploit code to map your external attack surface.

## What This Means for Defence

If most attacks are not sophisticated, most defences should not be exotic either. The highest-return security investments are often the least glamorous:

- Enforcing MFA across all access points
- Patching known vulnerabilities within defined SLA windows
- Running configuration audits on cloud and network assets
- Training employees to recognise and report phishing

These are not cutting-edge capabilities. They are operational discipline. And the gap between knowing this and actually doing it consistently is where most organisations lose.

## The Sophistication Trap

Security teams sometimes chase advanced threats while ignoring foundational hygiene. The attacker knows this. Why develop a zero-day when default credentials work?

> "Security is not broken by sophistication. It is broken by oversight."

The lesson is not to ignore advanced threats. It is to earn the right to worry about them by first solving the basics. Until then, the most dangerous actor in your threat model is probably not a nation-state. It is a bored attacker with a search engine and a list of default passwords.`,
    coverImage: 'https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=1200',
    tags: ['Cybersecurity', 'Threat Intelligence', 'Defence'],
    publishedAt: '2026-04-12',
    readingTime: 6,
  },
  {
    id: '2',
    slug: 'phishing-still-works-because-we-let-it',
    title: 'Phishing Still Works Because We Let It',
    excerpt:
      'Despite decades of awareness campaigns, phishing remains the leading initial access vector. The problem is not the technology — it is the training.',
    content: `Phishing has been around since the early days of email. Security vendors have built entire product categories around detecting it. Billions have been spent on email gateways, sandboxes, and link scanners. And yet, according to every major incident response firm, phishing remains the number one initial access vector year after year.

## Why Training Fails

Most security awareness training is compliance-driven, not behaviour-driven. Employees complete an annual module, click through slides, pass a quiz, and return to their inboxes unchanged.

The module taught them what phishing looks like in a sanitised, obvious example. It did not train them to make the split-second judgement call when a convincing email arrives from what appears to be their CEO, timed perfectly to a real business event.

## The Human Vulnerability Model

Human attention is finite and context-dependent. An employee who processes hundreds of emails a day will eventually click something they should not. That is not a character flaw — it is a mathematical certainty.

Effective defence accounts for this. It reduces the blast radius of a successful click, rather than assuming the click will never happen.

Key controls:
- **Endpoint isolation**: If a malicious link is clicked, what can it actually reach?
- **Credential hygiene**: Is the password typed into a fake portal the same one used elsewhere?
- **Incident response**: When an employee realises they clicked something suspicious, is the path to reporting it clear and blame-free?

## Simulations Done Right

Phishing simulations work when they are tied to immediate, relevant training. Catching an employee in a simulation and simply logging the failure achieves nothing. Catching them and walking them through exactly why that email looked legitimate — and what to look for — builds genuine pattern recognition.

The goal is not to punish. The goal is to calibrate the human sensor.

## The Systemic Fix

Technical controls reduce exposure. Training reduces susceptibility. Reporting culture reduces dwell time.

None of these alone is sufficient. Organisations that rely solely on email filtering are betting everything on perfect detection. Those that invest only in training are ignoring the reality of human fallibility.

The answer is layered defence, where a successful phishing email triggers a response chain, not a catastrophic breach.`,
    coverImage: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1200',
    tags: ['Phishing', 'Social Engineering', 'Awareness'],
    publishedAt: '2026-03-28',
    readingTime: 5,
  },
  {
    id: '3',
    slug: 'building-security-culture-in-small-organisations',
    title: 'Building Security Culture in Small Organisations',
    excerpt:
      'Large enterprises have dedicated security teams. Small organisations have to build culture instead. Here is how to make security everyone\'s responsibility without burning out your team.',
    content: `Small and medium organisations face a structural disadvantage in cybersecurity: they carry most of the risk of a large enterprise but have a fraction of the resources.

The answer is not to try to replicate enterprise security programmes at smaller scale. It is to build something different — a security culture where awareness and good practice are embedded in how people work, not bolted on as an afterthought.

## What Culture Actually Means

Security culture is not posters in the break room. It is not the annual compliance training. It is the informal norms that govern how people behave when no one is watching.

In an organisation with strong security culture:
- Employees flag suspicious emails without being asked
- No one shares passwords "just this once" to help a colleague
- Vendors and new tools are evaluated for security implications as a matter of course
- Mistakes are reported, not hidden

This does not happen through policy alone. It happens when leadership models the behaviour and when the consequences of good security practice are visible.

## Starting Points for Small Teams

### Make It Easy to Do the Right Thing

If the secure option is also the inconvenient option, most people will choose convenience. Invest first in making security frictionless:
- Single sign-on reduces password fatigue and enables MFA at scale
- Password managers remove the excuse of forgotten credentials
- Clear reporting channels make it easy to flag incidents

### Talk About Real Threats

Generic awareness content about "cybercriminals" does not land. Specific, relevant examples do.

Brief your team on the actual phishing emails that target organisations like yours. Show them real headlines from companies in your sector. Make the threat concrete.

### Create a No-Blame Reporting Culture

The single most damaging security culture pattern is one where employees hide mistakes. Every hour an incident goes unreported is an hour the attacker operates freely.

Make it explicit: the person who reports a suspected breach is not in trouble. The person who stays silent is.

## The Long Game

Culture cannot be installed. It develops through consistent reinforcement over time. Small improvements in how your team thinks about security compound into a fundamentally more resilient organisation.

The investment is low. The return, measured in breaches avoided, is substantial.`,
    coverImage: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1200',
    tags: ['Security Culture', 'Entrepreneurship', 'Team'],
    publishedAt: '2026-03-05',
    readingTime: 7,
  },
  {
    id: '4',
    slug: 'reconnaissance-the-first-phase-attackers-never-skip',
    title: 'Reconnaissance: The Phase Attackers Never Skip',
    excerpt:
      'Before any exploit is launched, attackers spend significant time learning about their target. Understanding this phase is essential for building better defences.',
    content: `Every engagement — whether a penetration test or a real attack — begins with the same phase: reconnaissance. It is the most time-intensive part of an attack and the one defenders pay the least attention to.

## What Attackers Are Looking For

Reconnaissance is about attack surface mapping. An attacker wants to answer:

- What systems are exposed externally?
- What software versions are running?
- Who are the key people and what are their email patterns?
- What third-party services does the organisation use?
- Are there exposed credentials in public repositories or pastes?

All of this information is available without touching the target's network. It is gathered through open source intelligence (OSINT) — search engines, LinkedIn, GitHub, Shodan, certificate transparency logs, and more.

## The Passive vs Active Distinction

Passive reconnaissance leaves no trace. Searching for your organisation's name on GitHub, or using Shodan to map internet-facing services, generates no alerts and no logs on your side.

Active reconnaissance — port scanning, probing web applications — does leave traces, but many organisations lack the detection capability to notice.

The implication: by the time you see suspicious activity, the attacker may have been watching you for weeks.

## What You Can Do About It

You cannot prevent passive reconnaissance entirely, but you can make it less useful:

**Reduce your external footprint.** Every exposed service that does not need to be public is unnecessary attack surface. Audit what is internet-facing and close what should not be.

**Monitor for credential exposure.** Services that alert on leaked credentials in breach databases and paste sites give you early warning of a specific and serious risk.

**Treat your LinkedIn as attack surface.** Org charts, technology mentions in employee profiles, and job postings all reveal information attackers use. This does not mean hiding your people — it means being aware of what you are advertising.

**Know what an attacker sees.** Run periodic external attack surface assessments. If you have never looked at your organisation from the outside, you do not know what you are defending.

## The Defender's Mindset Shift

Most security teams think about defence from the inside out: protect our systems from attack. The reconnaissance phase teaches a different perspective: understand what the attacker sees before they attack.

This mindset shift — from inside-out to outside-in — is fundamental to proactive security. You cannot defend what you do not know you are exposing.`,
    coverImage: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1200',
    tags: ['Offensive Security', 'OSINT', 'Penetration Testing'],
    publishedAt: '2026-02-14',
    readingTime: 6,
  },
  {
    id: '5',
    slug: 'cybersecurity-in-north-east-india-the-gap',
    title: 'Cybersecurity in North-East India: The Gap',
    excerpt:
      'Digital adoption is accelerating across North-East India. Security awareness and infrastructure are not keeping pace. This is both a risk and an opportunity.',
    content: `North-East India is experiencing rapid digital adoption. Smartphones, digital payments, and internet access have reached communities that a decade ago had limited connectivity. This is genuinely positive — access to digital infrastructure opens economic and social opportunities.

But digital adoption without security awareness creates risk. And in a region where cybersecurity expertise and institutions are sparse, the gap between exposure and protection is widening.

## The Threat Landscape

The threats facing organisations and individuals in North-East India are not exotic. They are the same ones affecting the rest of the country and the world: phishing, fraud, weak credentials, ransomware, and social engineering.

What differs is the defensive capacity. Metropolitan centres have banks of security professionals, regulatory pressure, and institutional knowledge. Smaller cities and towns have almost none of this.

A local business, a school, a government office — these entities are now digital, and therefore targetable. But they typically have no one whose job it is to think about what that means.

## The Awareness Problem

Most people in the region have been given digital tools without being given the knowledge to use them safely. This is not a criticism of the individuals — it is a structural gap in how digital adoption has happened.

The result: high-value targets (relatively speaking) with low security awareness and minimal incident response capability. From an attacker's perspective, this is an opportunity.

## What Needs to Change

**Regional cybersecurity capacity building.** This means training programmes, awareness campaigns, and vocational pathways into cybersecurity careers — built specifically for the regional context, not repurposed from generic national curricula.

**Institutional engagement.** Schools, government offices, and local businesses need practical guidance, not academic frameworks. Organisations like NEXUSCIPHERGUARD are positioned to deliver this — but the scale of need requires broader institutional support.

**Ecosystem development.** Long-term security posture improves when there is a local ecosystem of professionals, educators, and organisations with a stake in regional digital safety. Building that ecosystem is a generational project.

## The Opportunity

This is not only a problem to solve. It is an opportunity to build something. The region that develops cybersecurity expertise early will be better positioned as digital infrastructure deepens.

The gap between awareness and implementation in North-East India is real. So is the potential to close it — through education, practice, and a genuine commitment to making security accessible.`,
    coverImage: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1200',
    tags: ['Cybersecurity', 'India', 'Community'],
    publishedAt: '2026-01-20',
    readingTime: 8,
  },
  {
    id: '6',
    slug: 'the-cost-of-ignoring-security-awareness',
    title: 'The Real Cost of Ignoring Security Awareness',
    excerpt:
      'Security awareness is often treated as a cost centre. In reality, the cost of not doing it is measured in breaches, downtime, and reputation damage that dwarfs the investment.',
    content: `When security awareness programmes are cut from budgets, the justification is usually some variation of: "We haven't had an incident, so we must be fine."

This is survivorship bias applied to risk management. The absence of a recorded incident does not mean the risk is low — it may mean the incident has not happened yet, or has not been detected.

## Quantifying What Awareness Prevents

The direct costs of a breach — incident response, forensics, legal fees, notification costs — are measurable. They routinely run into hundreds of thousands for mid-sized organisations and much higher for larger ones.

The indirect costs are harder to quantify but often larger: reputational damage, customer churn, regulatory scrutiny, and the internal disruption of a major incident.

Security awareness does not prevent all breaches. But it meaningfully reduces the frequency of the most common initial access vectors — phishing and social engineering — which account for the majority of incidents.

## The Investment Comparison

A well-run security awareness programme for a 50-person organisation might cost a few thousand dollars annually, including simulation tooling, training content, and facilitation time.

The average cost of a data breach for a small to mid-sized business: significantly higher, with many businesses failing to fully recover.

The ROI calculation is not complex. What makes it difficult is that the benefit is an event that did not happen — and humans systematically underweight risks that have not yet materialised.

## Beyond Compliance

Awareness programmes driven purely by compliance — annual training to check a box — deliver compliance, not security. The minimum to pass an audit is not the minimum to be resilient.

Programmes that deliver real security behaviour change are continuous, contextual, and reinforced by leadership. They treat the human layer as what it is: a critical control, not an afterthought.

## The Decision

Every organisation makes a choice about security awareness, either explicitly through investment or implicitly through neglect. The implicit choice is not neutral — it is a decision to accept higher risk.

The question is not whether you can afford to invest in security awareness. It is whether you can afford not to.`,
    coverImage: 'https://images.pexels.com/photos/5483071/pexels-photo-5483071.jpeg?auto=compress&cs=tinysrgb&w=1200',
    tags: ['Security Awareness', 'Risk Management', 'Business'],
    publishedAt: '2025-12-10',
    readingTime: 5,
  },
]

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug)
}

export function getPublishedArticles(): Article[] {
  return [...articles].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}
