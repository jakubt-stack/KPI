import React from 'react'

const data = {
  asOf: '2026-11-18',
  safety: [
    { label: "TRIR", value: "6.1", note: "1 recordable" },
    { label: "Recordables", value: "1", note: "5 Nov finger injury" },
    { label: "Near misses", value: "3", note: "Not in TRIR" },
    { label: "HiPo", value: "0", note: "YTD" },
  ],
  quality: [
    { label: "Open complaints", value: "8", note: "1 closed, none new" },
    { label: "Oldest open", value: "109 d", sub: "AVG TTC 18.9 d" },
    { label: "Scrap past week", value: "0.49%", note: "103 of 21,152 · YTD 1,878 · last log 13 Nov" },
    { label: "Avg daily audits", value: "12.3", note: "358 total · 2 failed" },
  ],
  delivery: [
    { label: "Full ERP weeks", value: "5.0", note: "150,575 zippers on order" },
    { label: "Molded backlog", value: "0.0 wk", note: "200 units" },
    { label: "Coil backlog", value: "0.9 wk", note: "10,120 units" },
    { label: "Metal backlog", value: "0.3 wk", note: "3,145 units" },
  ],
  output: [
    { label: "Overall ZPOH", value: "66.4", note: "10-day" },
    { label: "Molded ZPOH", value: "62.3", note: "Target 90" },
    { label: "Metal/Coil ZPOH", value: "74.6", note: "Target 125" },
    { label: "10-day actual", value: "4,338", note: "All / day · 71% of 6,075 · target 7,725" },
  ],
  laminate: [
    { label: "Backlog weeks", value: "8.3", note: "149,940 yd late" },
    { label: "10-day output", value: "3,783", note: "10-day avg" },
    { label: "Yards scheduled", value: "165,252", note: "Total 153,148" },
    { label: "Day capacity", value: "3,600", note: "Yards" },
  ],
  raw: [
    { label: "Open orders", value: "32" },
    { label: "Avg fulfillment", value: "27.0 d", note: "Order to ship · carried from 11/12 (not re-read)" },
    { label: "Past due orders", value: "15" },
    { label: "Past due %", value: "58%", note: "15 of 26" },
  ],
  cycleZip: [
    { label: "Order → start", value: "81.8 d" },
    { label: "Start → complete", value: "14.9 d" },
    { label: "Start → ship", value: "21.1 d" },
    { label: "Complete → ship", value: "10.0 d", note: "On-time ship 64.1%" },
  ],
  cycleLam: [
    { label: "Order → ship", value: "73.2 d" },
    { label: "Due → ship", value: "-24.6 d", note: "Early vs due" },
    { label: "Yards at risk", value: "20,586", note: "Over lead time" },
    { label: "On-time ship %", value: "72.2%", note: "13 of 18 by due date" },
  ],
  movers: {
    better: "Zippers on order 151,624 to 150,575 (5.0 wk). Past due 16,540 to 13,465. On-time ship 62.8% to 64.1%. Open complaints 9 to 8. ZPOH 65.2 to 66.4.",
    worse: "Crossdock open 29 to 32, past due 15 of 26. Start to complete 14.9 d. Oldest complaint 109 d. Laminate unchanged. Production to 11/17: ZPOH 66.4, 10-day 4,338/day.",
    notes: "BC refreshed 5:47 AM: 150,575 = BC 91,865 + NS 58,710. New duplicates: United Industrial Textile Products SO15003. Possible: SO14958 vs S-ORD114010, SO14951 vs S-ORD113775. Laminate BC 123,365 + NS 29,783 yd. Crossdock BC 18 + NS 14.",
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