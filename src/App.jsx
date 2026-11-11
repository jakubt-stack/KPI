import React from 'react'

const data = {
  asOf: '2026-11-11',
  safety: [
    { label: "TRIR", value: "6.1", note: "1 recordable" },
    { label: "Recordables", value: "1", note: "5 Nov finger injury" },
    { label: "Near misses", value: "3", note: "Not in TRIR" },
    { label: "HiPo", value: "0", note: "YTD" },
  ],
  quality: [
    { label: "Open complaints", value: "12", note: "4 closed, 1 new" },
    { label: "Oldest open", value: "102 d", note: "Filed 1 Aug" },
    { label: "Scrap past week", value: "1.03%", note: "206 of 19,971" },
    { label: "Avg daily audits", value: "12.5", note: "2 failed" },
  ],
  delivery: [
    { label: "Full ERP weeks", value: "6.2", note: "188,991 zippers on order" },
    { label: "Molded backlog", value: "0.0 wk", note: "0 units" },
    { label: "Coil backlog", value: "1.1 wk", note: "12,620 units" },
    { label: "Metal backlog", value: "0.3 wk", note: "3,520 units" },
  ],
  output: [
    { label: "Overall ZPOH", value: "67.6", note: "10-day" },
    { label: "Molded ZPOH", value: "58.4", note: "10-day" },
    { label: "Metal/Coil ZPOH", value: "82.2", note: "10-day" },
    { label: "10-day actual", value: "3,919", note: "65% util · target 7,725" },
  ],
  laminate: [
    { label: "Backlog weeks", value: "7.2", note: "129,354 yd late" },
    { label: "10-day output", value: "3,798", note: "STALE since 10/23", stale: true },
    { label: "Yards scheduled", value: "165,252", note: "Total 123,365" },
    { label: "Day capacity", value: "3,600", note: "Yards" },
  ],
  raw: [
    { label: "Open orders", value: "23" },
    { label: "Avg fulfillment", value: "27.0 d", note: "Order to ship" },
    { label: "Past due orders", value: "17" },
    { label: "Past due %", value: "77%", note: "17 of 22" },
  ],
  cycleZip: [
    { label: "Order → start", value: "85.2 d" },
    { label: "Start → complete", value: "14.7 d" },
    { label: "Start → ship", value: "20.6 d" },
    { label: "Complete → ship", value: "9.5 d", note: "On-time ship 61.0%" },
  ],
  cycleLam: [
    { label: "Order → ship", value: "73.2 d" },
    { label: "Due → ship", value: "-24.6 d", note: "Early vs due" },
    { label: "Yards at risk", value: "76,494", note: "Over lead time" },
    { label: "On-time ship %", value: "72.2%", note: "13 of 18 by due date" },
  ],
  movers: {
    better: "Open complaints fell from 15 to 12. ZPOH rose from 66.0 to 67.6. Laminate past due fell to 129,354 yd.",
    worse: "Recordables went from 0 to 1 (TRIR 6.1). Zipper past due steady at 16,140.",
    notes: "BC refreshed 4:30 PM: 188,991 zippers on order (6.2 wk). New duplicate: Holiday Industries Llc SO14969. No ship date: SO14940 KZRV, SO14947 HBD Inc., SO14945 Blue Delta, SO14939 Mount Rogers.",
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