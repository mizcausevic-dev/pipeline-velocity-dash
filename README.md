# Pipeline Velocity Dash

Board-ready Kinetic Gain surface for stage conversion, segment-level speed, sourced versus influenced pipeline, and revenue-momentum risk.

- Live: [http://velocity.kineticgain.com/](http://velocity.kineticgain.com/)
- Repo: [https://github.com/mizcausevic-dev/pipeline-velocity-dash](https://github.com/mizcausevic-dev/pipeline-velocity-dash)

## Why this exists

Pipeline generation can look healthy while velocity quietly breaks:
- top-of-funnel volume rises but sales acceptance falls
- one segment moves fast while another drags forecast confidence down
- proposal-stage aging hides inside aggregate pipeline numbers
- sourced and influenced pipeline get mixed together until nobody trusts the dashboard

`pipeline-velocity-dash` keeps those dynamics visible in one operator-facing surface so Growth, RevOps, and sales leadership can see where momentum is slowing before revenue does.

## What this product does

`pipeline-velocity-dash` turns stage conversion, cycle time, segment yield, sourced pipeline, influenced pipeline, and revenue-risk signals into a commercial velocity control plane. It is designed for the moment when top-of-funnel numbers look fine but downstream conversion, handoff quality, proposal aging, or forecast confidence is already degrading.

From a SaaS go-to-market analyst lens, the surface helps teams separate real revenue momentum from volume that only creates dashboard optimism. It shows which segments are moving, where stages are leaking speed, and which operating lanes need intervention before the quarter turns into a postmortem.

From a SaaS value architect lens, the margin leak is commercial motion that looks like growth but slows cash conversion: low-fit pipeline, handoff delay, stuck proposals, weak segment yield, and overfunded channels. The product frames those leaks in terms a CEO, CRO, CFO, or board can act on without losing the operational evidence underneath.

The technical proof is intentionally inspectable: TypeScript scoring logic, segment and stage JSON outputs, static routes, API payloads, tests, smoke checks, prerendered artifacts, and screenshot evidence. Like the broader Kinetic Gain suite, the repo converts operational evidence into board-readable decisions: owner, signal, model, risk, value, route, and verification stay visible together.

## Routes

- `/`
- `/stage-funnel`
- `/segment-velocity`
- `/verification`
- `/docs`

## API

- `/api/dashboard/summary`
- `/api/stage-funnel`
- `/api/segment-velocity`
- `/api/risks`
- `/api/verification`
- `/api/sample`

## Screenshots

![Overview](./screenshots/01-overview-proof.png)
![Stage funnel](./screenshots/02-stage-funnel-proof.png)
![Segment velocity](./screenshots/03-segment-velocity-proof.png)
![Verification](./screenshots/04-verification-proof.png)

## Local Development

```powershell
cd pipeline-velocity-dash
npm install
npm run dev
```

Open:
- [http://127.0.0.1:5298/](http://127.0.0.1:5298/)
- [http://127.0.0.1:5298/stage-funnel](http://127.0.0.1:5298/stage-funnel)
- [http://127.0.0.1:5298/segment-velocity](http://127.0.0.1:5298/segment-velocity)
- [http://127.0.0.1:5298/verification](http://127.0.0.1:5298/verification)
- [http://127.0.0.1:5298/docs](http://127.0.0.1:5298/docs)

## Validation

- `npm run build`
- `npm run test`
- `npm run demo`
- `npm run smoke`
- `npm run prerender`
- `npm run render:assets`

## Docs

- [Architecture](./docs/architecture.md)
- [Origin](./docs/ORIGIN.md)
- [Changelog](./CHANGELOG.md)
