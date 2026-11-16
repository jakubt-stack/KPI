import React from 'react'

const data = {
  asOf: '2026-11-16',
  safety: [
    { label: "TRIR", value: "6.1", note: "1 recordable" },
    { label: "Recordables", value: "1", note: "5 Nov finger injury" },
    { label: "Near misses", value: "3", note: "Not in TRIR" },
    { label: "HiPo", value: "0", note: "YTD" },
  ],
  quality: [
    { label: "Open complaints", value: "12", note: "4 closed, 1 new" },
    { label: "Oldest open", value: "107 d", note: "Filed 1 Aug" },
    { label: "Scrap past week", value: "0.49%", note: "103 of 21,152 · YTD 1,878 · last log 13 Nov" },
    { label: "Avg daily audits", value: "12.3", note: "358 total · 2 failed" },
  ],
  delivery: [
    { label: "Full ERP weeks", value: "5.2", note: "156,569 zippers on order" },
    { label: "Molded backlog", value: "0.0 wk", note: "200 units" },
    { label: "Coil backlog", value: "1.1 wk", note: "12,620 units" },
    { label: "Metal backlog", value: "0.3 wk", note: "3,720 units" },
  ],
  output: [
    { label: "Overall ZPOH", value: "64.5", note: "STALE: no production logged 13 Nov · 10-day all · capacity basis 73.9", stale: true },
    { label: "Molded ZPOH", value: "59.5", note: "10-day" },
    { label: "Metal/Coil ZPOH", value: "74.0", note: "10-day" },
    { label: "10-day actual", value: "3,959", note: "STALE: log ends 12 Nov · All / day · 65% of 6,075 · target 7,725", stale: true },
  ],
  laminate: [
    { label: "Backlog weeks", value: "8.3", note: "149,940 yd late" },
    { label: "10-day output", value: "3,750", note: "STALE: log ends 12 Nov · Yards/day · 30 Oct–12 Nov", stale: true },
    { label: "Yards scheduled", value: "165,252", note: "Total 153,148" },
    { label: "Day capacity", value: "3,600", note: "Yards" },
  ],
  raw: [
    { label: "Open orders", value: "30" },
    { label: "Avg fulfillment", value: "27.0 d", note: "Order to ship · carried from 11/12 (not re-read)" },
    { label: "Past due orders", value: "15" },
    { label: "Past due %", value: "56%", note: "15 of 27" },
  ],
  cycleZip: [
    { label: "Order → start", value: "83.7 d" },
    { label: "Start → complete", value: "14.6 d" },
    { label: "Start → ship", value: "21.0 d" },
    { label: "Complete → ship", value: "9.8 d", note: "On-time ship 61.6%" },
  ],
  cycleLam: [
    { label: "Order → ship", value: "73.2 d" },
    { label: "Due → ship", value: "-24.6 d", note: "Early vs due" },
    { label: "Yards at risk", value: "20,586", note: "Over lead time" },
    { label: "On-time ship %", value: "72.2%", note: "13 of 18 by due date" },
  ],
  movers: {
    better: "Zippers on order 186,626 to 156,569 (5.2 wk). On-time ship 61.6%. Laminate unchanged.",
    worse: "Zipper past due 16,340 to 16,540 (NS SO15003 +200). Crossdock past due 15 of 27. Production not logged since 12 Nov (STALE). Oldest complaint 107 d.",
    notes: "BC refreshed 6:37 AM: 156,569 = BC 98,509 + NS 58,060. New duplicates: none. Possible: SO15003 vs S-ORD112756, SO14958 vs S-ORD114010. Laminate BC 123,365 + NS 29,783 yd. Crossdock BC 19 + NS 11.",
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