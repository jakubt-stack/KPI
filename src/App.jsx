import React from 'react'

const data = {
  asOf: '2026-11-24',
  safety: [
    { label: "TRIR", value: "6.1", note: "1 recordable" },
    { label: "Recordables", value: "1", note: "5 Nov finger injury" },
    { label: "Near misses", value: "3", note: "Not in TRIR" },
    { label: "HiPo", value: "0", note: "YTD" },
  ],
  quality: [
    { label: "Open complaints", value: "8", note: "none closed, none new" },
    { label: "Oldest open", value: "115 d", sub: "AVG TTC 18.9 d" },
    { label: "Scrap past week", value: "0.49%", note: "103 of 21,152 · YTD 1,878 · last log 13 Nov" },
    { label: "Avg daily audits", value: "12.3", note: "358 total · 2 failed" },
  ],
  delivery: [
    { label: "Full ERP weeks", value: "5.6", note: "168,729 zippers on order" },
    { label: "Molded backlog", value: "0.0 wk", note: "200 units" },
    { label: "Coil backlog", value: "0.8 wk", note: "9,220 units" },
    { label: "Metal backlog", value: "0.0 wk", note: "0 units" },
  ],
  output: [
    { label: "Overall ZPOH", value: "71.7", note: "10-day" },
    { label: "Molded ZPOH", value: "66.8", note: "Target 90" },
    { label: "Metal/Coil ZPOH", value: "80.6", note: "Target 125" },
    { label: "10-day actual", value: "4,941", note: "All / day · 81% of 6,075 · target 7,725" },
  ],
  laminate: [
    { label: "Backlog weeks", value: "6.5", note: "116,824 yd late" },
    { label: "10-day output", value: "3,750", note: "10-day avg" },
    { label: "Yards scheduled", value: "212,765", note: "Total 225,289" },
    { label: "Day capacity", value: "3,600", note: "Yards" },
  ],
  raw: [
    { label: "Open orders", value: "43" },
    { label: "Avg fulfillment", value: "27.0 d", note: "Order to ship · carried from 11/12 (not re-read)" },
    { label: "Past due orders", value: "11" },
    { label: "Past due %", value: "41%", note: "11 of 27" },
  ],
  cycleZip: [
    { label: "Order → start", value: "78.4 d" },
    { label: "Start → complete", value: "15.3 d" },
    { label: "Start → ship", value: "21.3 d" },
    { label: "Complete → ship", value: "9.9 d", note: "On-time ship 64.0%" },
  ],
  cycleLam: [
    { label: "Order → ship", value: "73.2 d" },
    { label: "Due → ship", value: "-24.6 d", note: "Early vs due" },
    { label: "Yards at risk", value: "46,866", note: "Over lead time" },
    { label: "On-time ship %", value: "72.2%", note: "13 of 18 by due date" },
  ],
  movers: {
    better: "Laminate past due 139,740 to 116,824 yd; at risk 69,974 to 46,866; scheduled 258,789 to 212,765. Zipper past due 9,520 to 9,420. On-time ship 64.0% unchanged.",
    worse: "Zippers on order 156,661 to 168,729 on 153 orders (5.6 wk). Crossdock open 37 to 43, past due 11 of 27. Oldest complaint 115 d. Production to 11/23: ZPOH 71.7, 10-day 4,941/day.",
    notes: "BC refreshed 5:49 AM: 168,729 = BC 75,554 + NS 93,175. New duplicates: none. Possible: none. Totals week 11/23 not yet in sheet. Laminate BC 0 + NS 225,289 yd. Crossdock BC 13 + NS 30.",
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