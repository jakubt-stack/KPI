import React from 'react'

const data = {
  asOf: '2026-11-13',
  safety: [
    { label: "TRIR", value: "6.1", note: "1 recordable" },
    { label: "Recordables", value: "1", note: "5 Nov finger injury" },
    { label: "Near misses", value: "3", note: "Not in TRIR" },
    { label: "HiPo", value: "0", note: "YTD" },
  ],
  quality: [
    { label: "Open complaints", value: "12", note: "4 closed, 1 new" },
    { label: "Oldest open", value: "104 d", note: "Filed 1 Aug" },
    { label: "Scrap past week", value: "1.03%", note: "206 of 19,971 · YTD 1,825 · last log 10 Nov" },
    { label: "Avg daily audits", value: "12.5", note: "2 failed" },
  ],
  delivery: [
    { label: "Full ERP weeks", value: "6.1", note: "186,626 zippers on order" },
    { label: "Molded backlog", value: "0.0 wk", note: "0 units" },
    { label: "Coil backlog", value: "1.1 wk", note: "12,620 units" },
    { label: "Metal backlog", value: "0.3 wk", note: "3,720 units" },
  ],
  output: [
    { label: "Overall ZPOH", value: "64.5", note: "10-day" },
    { label: "Molded ZPOH", value: "59.5", note: "10-day" },
    { label: "Metal/Coil ZPOH", value: "74.0", note: "10-day" },
    { label: "10-day actual", value: "3,959", note: "All / day · 65% of 6,075 · target 7,725" },
  ],
  laminate: [
    { label: "Backlog weeks", value: "8.3", note: "149,940 yd late" },
    { label: "10-day output", value: "3,750", note: "10-day avg" },
    { label: "Yards scheduled", value: "165,252", note: "Total 153,148" },
    { label: "Day capacity", value: "3,600", note: "Yards" },
  ],
  raw: [
    { label: "Open orders", value: "32" },
    { label: "Avg fulfillment", value: "27.0 d", note: "Order to ship · carried from 11/12 (not re-read)" },
    { label: "Past due orders", value: "15" },
    { label: "Past due %", value: "52%", note: "15 of 29" },
  ],
  cycleZip: [
    { label: "Order → start", value: "84.0 d" },
    { label: "Start → complete", value: "14.6 d" },
    { label: "Start → ship", value: "21.2 d" },
    { label: "Complete → ship", value: "10.0 d", note: "On-time ship 60.5%" },
  ],
  cycleLam: [
    { label: "Order → ship", value: "73.2 d" },
    { label: "Due → ship", value: "-24.6 d", note: "Early vs due" },
    { label: "Yards at risk", value: "20,586", note: "Over lead time" },
    { label: "On-time ship %", value: "72.2%", note: "13 of 18 by due date" },
  ],
  movers: {
    better: "Laminate 10-day output live again 3,750 yd/day; yards at risk 76,494 to 20,586. Zipper past due unchanged 16,340.",
    worse: "Laminate past due 129,354 to 149,940 yd. ZPOH 67.6 to 64.5. Oldest complaint 104 d.",
    notes: "BC refreshed 6:12 AM: 186,626 zippers on order (6.1 wk). New duplicate: none. No ship date: SO14940 KZRV, SO14989 Casual Line, SO14945 Blue Delta, SO14939 Mount Rogers. Laminate BC 123,365 + NS 29,783 yd. Crossdock BC 20 + NS 12.",
  },
}

function Tile({ label, value, note, stale }) {
  return (
    <div className={stale ? 'tile stale' : 'tile'}>
      <span className="label">{label}</span>
      <span className="value">{value}</span>
      {note && <span className="note">{note}</span>}
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