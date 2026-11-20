import React from 'react'

const data = {
  asOf: '2026-11-20',
  safety: [
    { label: "TRIR", value: "6.1", note: "1 recordable" },
    { label: "Recordables", value: "1", note: "5 Nov finger injury" },
    { label: "Near misses", value: "3", note: "Not in TRIR" },
    { label: "HiPo", value: "0", note: "YTD" },
  ],
  quality: [
    { label: "Open complaints", value: "8", note: "none closed, none new" },
    { label: "Oldest open", value: "111 d", sub: "AVG TTC 18.9 d" },
    { label: "Scrap past week", value: "0.49%", note: "103 of 21,152 · YTD 1,878 · last log 13 Nov" },
    { label: "Avg daily audits", value: "12.3", note: "358 total · 2 failed" },
  ],
  delivery: [
    { label: "Full ERP weeks", value: "5.0", note: "151,702 zippers on order" },
    { label: "Molded backlog", value: "0.0 wk", note: "200 units" },
    { label: "Coil backlog", value: "0.8 wk", note: "9,220 units" },
    { label: "Metal backlog", value: "0.3 wk", note: "3,145 units" },
  ],
  output: [
    { label: "Overall ZPOH", value: "69.0", note: "10-day" },
    { label: "Molded ZPOH", value: "64.2", note: "Target 90" },
    { label: "Metal/Coil ZPOH", value: "77.5", note: "Target 125" },
    { label: "10-day actual", value: "4,659", note: "All / day · 77% of 6,075 · target 7,725" },
  ],
  laminate: [
    { label: "Backlog weeks", value: "8.3", note: "158,342 yd late" },
    { label: "10-day output", value: "3,358", note: "10-day avg" },
    { label: "Yards scheduled", value: "176,216", note: "Total 225,289" },
    { label: "Day capacity", value: "3,600", note: "Yards" },
  ],
  raw: [
    { label: "Open orders", value: "38" },
    { label: "Avg fulfillment", value: "27.0 d", note: "Order to ship · carried from 11/12 (not re-read)" },
    { label: "Past due orders", value: "12" },
    { label: "Past due %", value: "44%", note: "12 of 27" },
  ],
  cycleZip: [
    { label: "Order → start", value: "80.3 d" },
    { label: "Start → complete", value: "15.2 d" },
    { label: "Start → ship", value: "21.4 d" },
    { label: "Complete → ship", value: "10.1 d", note: "On-time ship 63.4%" },
  ],
  cycleLam: [
    { label: "Order → ship", value: "73.2 d" },
    { label: "Due → ship", value: "-24.6 d", note: "Early vs due" },
    { label: "Yards at risk", value: "20,586", note: "Over lead time" },
    { label: "On-time ship %", value: "72.2%", note: "13 of 18 by due date" },
  ],
  movers: {
    better: "Zippers on order 151,762 to 151,702 on 151 orders (5.0 wk). Past due 13,465 to 12,565. Crossdock open 39 to 38.",
    worse: "Zipper cycle: start to complete 15.2 d, on-time 63.9% to 63.4%. Laminate past due 149,940 to 158,342 yd. Oldest complaint 111 d. Production to 11/19: ZPOH 69.0, 10-day 4,659/day.",
    notes: "BC refreshed 5:43 AM: 151,702 = BC 90,367 + NS 61,335. New duplicates: none. Possible: United Industrial Textile PO suffixes, SO14951 vs S-ORD113775. Laminate BC 49,388 + NS 175,901 yd. Crossdock BC 15 + NS 23.",
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