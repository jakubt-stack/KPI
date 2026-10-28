import React from 'react'

const data = {
  "asOf": "2026-10-28",
  "safety": [
    {
      "label": "TRIR",
      "value": "6",
      "note": "Recordables 1"
    },
    {
      "label": "Recordables",
      "value": "1"
    },
    {
      "label": "Near misses",
      "value": "3",
      "note": "Not in TRIR"
    },
    {
      "label": "HiPo",
      "value": "0",
      "note": "YTD"
    }
  ],
  "quality": [
    {
      "label": "Open complaints",
      "value": "16"
    },
    {
      "label": "Oldest open",
      "value": "88 d",
      "note": "Filed 1 Aug"
    },
    {
      "label": "Scrap past week",
      "value": "1.37%",
      "note": "250 of 18,200 · YTD 1,301"
    },
    {
      "label": "Avg daily audits",
      "value": "9.0",
      "note": "153 total · 1 failed"
    }
  ],
  "delivery": [
    {
      "label": "Full ERP weeks",
      "value": "7.3",
      "note": "Totals I25"
    },
    {
      "label": "Molded backlog",
      "value": "0.01 wk",
      "note": "200 units"
    },
    {
      "label": "Coil backlog",
      "value": "1.8 wk",
      "note": "21,175 units"
    },
    {
      "label": "Metal backlog",
      "value": "0.4 wk",
      "note": "4,170 units"
    }
  ],
  "output": [
    {
      "label": "Overall ZPOH",
      "value": "73.9",
      "note": "10-day all"
    },
    {
      "label": "Molded ZPOH",
      "value": "59.1"
    },
    {
      "label": "Metal/Coil ZPOH",
      "value": "89.6"
    },
    {
      "label": "10-day actual",
      "value": "4,948",
      "note": "All / day"
    }
  ],
  "laminate": [
    {
      "label": "Backlog weeks",
      "value": "6.1",
      "note": "110,340 yd past due"
    },
    {
      "label": "10-day output",
      "value": "3,798",
      "note": "Yards/day"
    },
    {
      "label": "Yards scheduled",
      "value": "218,728",
      "note": "Total on order 213,697"
    },
    {
      "label": "Day capacity",
      "value": "3,600",
      "note": "Yards"
    }
  ],
  "raw": [
    {
      "label": "Open orders",
      "value": "34"
    },
    {
      "label": "Avg fulfillment",
      "value": "27.6 d",
      "note": "Order to ship"
    },
    {
      "label": "Past due orders",
      "value": "26"
    },
    {
      "label": "Past due %",
      "value": "76%",
      "note": "26 of 34"
    }
  ],
  "cycleZip": [
    {
      "label": "Order → start",
      "value": "98.4 d"
    },
    {
      "label": "Start → complete",
      "value": "11.8 d"
    },
    {
      "label": "Start → ship",
      "value": "21.6 d"
    },
    {
      "label": "Complete → ship",
      "value": "12.3 d"
    }
  ],
  "cycleLam": [
    {
      "label": "Order → ship",
      "value": "91.6 d"
    },
    {
      "label": "Late orders",
      "value": "44.3 d",
      "note": "due-ship"
    },
    {
      "label": "All orders",
      "value": "-12.1 d",
      "note": "due-ship"
    },
    {
      "label": "Yards at risk",
      "value": "95,199",
      "note": "Exceeding lead time"
    }
  ],
  "movers": {
    "better": "No improvements detected in tracked metrics.",
    "worse": "Scrap rate rose from 0.3% to 1.4% — 250 scrapped out of 18,200 made. Daily output slipped from 5,110 to 4,550. Effective capacity is 6,075, so utilization is 75%.",
    "notes": "Molded ZPOH 58.2 → 59.3; metal/coil 102.8 → 75.9. Prior-week open complaints, past-due and capacity snapshots are not stored, so those changes are not shown."
  }
}

function Tile({ label, value, note }) {
  return (
    <div className="tile">
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
        <Block title="Laminate" className="laminate" tiles={data.laminate} />
        <Block title="Raw / Crossdock" className="raw" tiles={data.raw} />
        <Block title="Cycle · Zippers" className="cycle-zip" tiles={data.cycleZip} />
        <Block title="Cycle · Laminate" className="cycle-lam" tiles={data.cycleLam} />
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