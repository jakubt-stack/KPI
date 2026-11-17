import React from 'react'

const data = {
  asOf: '2026-11-17',
  safety: [
    { label: "TRIR", value: "6.1", note: "1 recordable" },
    { label: "Recordables", value: "1", note: "5 Nov finger injury" },
    { label: "Near misses", value: "3", note: "Not in TRIR" },
    { label: "HiPo", value: "0", note: "YTD" },
  ],
  quality: [
    { label: "Open complaints", value: "9", note: "3 closed, none new" },
    { label: "Oldest open", value: "108 d", sub: "AVG TTC 18.9 d" },
    { label: "Scrap past week", value: "0.49%", note: "103 of 21,152 · YTD 1,878 · last log 13 Nov" },
    { label: "Avg daily audits", value: "12.3", note: "358 total · 2 failed" },
  ],
  delivery: [
    { label: "Full ERP weeks", value: "5.0", note: "151,624 zippers on order" },
    { label: "Molded backlog", value: "0.0 wk", note: "200 units" },
    { label: "Coil backlog", value: "1.1 wk", note: "12,620 units" },
    { label: "Metal backlog", value: "0.3 wk", note: "3,720 units" },
  ],
  output: [
    { label: "Overall ZPOH", value: "65.2", note: "10-day" },
    { label: "Molded ZPOH", value: "60.9", note: "Target 90" },
    { label: "Metal/Coil ZPOH", value: "73.7", note: "Target 125" },
    { label: "10-day actual", value: "4,209", note: "All / day · 69% of 6,075 · target 7,725" },
  ],
  laminate: [
    { label: "Backlog weeks", value: "8.3", note: "149,940 yd late" },
    { label: "10-day output", value: "3,794", note: "10-day avg" },
    { label: "Yards scheduled", value: "165,252", note: "Total 153,148" },
    { label: "Day capacity", value: "3,600", note: "Yards" },
  ],
  raw: [
    { label: "Open orders", value: "29" },
    { label: "Avg fulfillment", value: "27.0 d", note: "Order to ship · carried from 11/12 (not re-read)" },
    { label: "Past due orders", value: "15" },
    { label: "Past due %", value: "56%", note: "15 of 27" },
  ],
  cycleZip: [
    { label: "Order → start", value: "82.8 d" },
    { label: "Start → complete", value: "14.8 d" },
    { label: "Start → ship", value: "21.2 d" },
    { label: "Complete → ship", value: "10.1 d", note: "On-time ship 62.8%" },
  ],
  cycleLam: [
    { label: "Order → ship", value: "73.2 d" },
    { label: "Due → ship", value: "-24.6 d", note: "Early vs due" },
    { label: "Yards at risk", value: "20,586", note: "Over lead time" },
    { label: "On-time ship %", value: "72.2%", note: "13 of 18 by due date" },
  ],
  movers: {
    better: "Zippers on order 156,569 to 151,624 (5.2 to 5.0 wk). On-time ship 61.6% to 62.8%. Open complaints 12 to 9. Laminate unchanged.",
    worse: "Cycle: start to ship 21.2 d, complete to ship 10.1 d (was 21.0 / 9.8). Zipper past due unchanged 16,540. Crossdock past due 15 of 27. Oldest complaint 108 d. Production to 11/16: ZPOH 65.2, 10-day 4,209/day.",
    notes: "BC refreshed 5:43 AM: 151,624 = BC 93,564 + NS 58,060. New duplicates: none. Possible: SO15003 vs S-ORD112756, SO14958 vs S-ORD114010. Laminate BC 123,365 + NS 29,783 yd. Crossdock BC 19 + NS 10.",
  },
}

function Tile({ label, value, note, stale, sub, subStale }) {
  return (
    <div className={stale ? 'tile stale' : 'tile'}>
      <span className="label">{label}</span>
      <span className="value">{value}</span>
      {(note || sub) && <span className="note">{note}{note && sub ? ' · ' : ''}{sub && <span style={subStale ? { color: '#f59e0b', fontWeight: 600 } : undefined}>{sub}</span>}</span>}
    </div>
  )
}

function Block({ title, className, tiles }) {
  return (
    <section className={`block ${className}`}>
      <h2>{title}</h2>
      <div className="tiles">
        {tiles.map((t, i) => <Tile key={i} {...t} />)}
      </div>
    </section>
  )
}

export default function App() {
  return (
    <>
      <header>
        <img src="/logo.jpg" alt="Lenzip" className="logo" />
        <span className="as-of">{data.asOf}</span>
      </header>
      <main>
        <Block title="Safety" className="safety" tiles={data.safety} />
        <Block title="Quality" className="quality" tiles={data.quality} />
        <Block title="Zipper Delivery" className="delivery" tiles={data.delivery} />
        <Block title="Zipper Output" className="output" tiles={data.output} />
        {/* Bottom row order (locked 2026-11-11, Jakub): Laminate, Cycle · Laminate, Cycle · Zippers, Raw / Crossdock */}
        <Block title="Laminate" className="laminate" tiles={data.laminate} />
        <Block title="Cycle · Laminate" className="cycle-lam" tiles={data.cycleLam} />
        <Block title="Cycle · Zippers" className="cycle-zip" tiles={data.cycleZip} />
        <Block title="Raw / Crossdock" className="raw" tiles={data.raw} />
        <section className="block movers">
          <h2>What Moved</h2>
          <div className="movers-grid">
            <div className="mover better"><h3>Better</h3><p>{data.movers.better}</p></div>
            <div className="mover worse"><h3>Worse</h3><p>{data.movers.worse}</p></div>
            <div className="mover notes"><h3>Notes</h3><p>{data.movers.notes}</p></div>
          </div>
        </section>
      </main>
    </>
  )
}