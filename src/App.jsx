import React from 'react'

const data = {
  "asOf": "2026-11-06",
  "safety": [
    {
      "label": "TRIR",
      "value": "0",
      "note": "Recordables 0"
    },
    {
      "label": "Recordables",
      "value": "0"
    },
    {
      "label": "Near misses",
      "value": "3",
      "note": "Not in TRIR"
    },
    {
      "label": "Accidents",
      "value": "2"
    }
  ],
  "quality": [
    {
      "label": "Open complaints",
      "value": "14"
    },
    {
      "label": "Oldest open",
      "value": "97 d",
      "note": "Filed 1 Aug"
    },
    {
      "label": "Scrap past week",
      "value": "1.46%",
      "note": "218 of 14,905 · YTD 1,761"
    },
    {
      "label": "Avg daily audits",
      "value": "10.7",
      "note": "247 total · 2 failed"
    }
  ],
  "delivery": [
    {
      "label": "Full ERP weeks",
      "value": "6.8",
      "note": "205,819 zippers on order"
    },
    {
      "label": "Molded backlog",
      "value": "0.01 wk",
      "note": "200 units"
    },
    {
      "label": "Coil backlog",
      "value": "1.6 wk",
      "note": "18,820 units"
    },
    {
      "label": "Metal backlog",
      "value": "0.3 wk",
      "note": "3,520 units"
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
      "value": "58.3",
      "note": "Target 95"
    },
    {
      "label": "Metal/Coil ZPOH",
      "value": "77.7",
      "note": "Target 125"
    },
    {
      "label": "10-day actual",
      "value": "3,938",
      "note": "All / day · Target 6,075 · 65%"
    }
  ],
  "laminate": [
    {
      "label": "Backlog weeks",
      "value": "9.1",
      "note": "163,402 yd past due"
    },
    {
      "label": "10-day output",
      "value": "3,798",
      "note": "Yards/day"
    },
    {
      "label": "Yards scheduled",
      "value": "205,731",
      "note": "Total on order 182,618"
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
      "value": "33"
    },
    {
      "label": "Avg fulfillment",
      "value": "23.4 d",
      "note": "Order to ship"
    },
    {
      "label": "Past due orders",
      "value": "22"
    },
    {
      "label": "Past due %",
      "value": "67%",
      "note": "22 of 33"
    }
  ],
  "cycleZip": [
    {
      "label": "Order → start",
      "value": "89.6 d",
      "note": "Goal 5 days"
    },
    {
      "label": "Start → complete",
      "value": "12.0 d",
      "note": "Goal 15 days"
    },
    {
      "label": "Start → ship",
      "value": "22.4 d",
      "note": "Goal 20 days"
    },
    {
      "label": "Complete → ship",
      "value": "11.9 d",
      "note": "Goal 5 days"
    }
  ],
  "cycleLam": [
    {
      "label": "Order → ship",
      "value": "84.7 d",
      "note": "Goal 112 days"
    },
    {
      "label": "Late orders",
      "value": "68.4 d",
      "note": "due-ship"
    },
    {
      "label": "All orders",
      "value": "1.4 d",
      "note": "due-ship"
    },
    {
      "label": "Yards at risk",
      "value": "76,494",
      "note": "Exceeding lead time"
    }
  ],
  "movers": {
    "better": "Scrap rate fell from 1.7% to 1.5% — 218 scrapped out of 14,905 made.",
    "worse": "Zipper output, last 7 days: 3,726/day vs 3,901 prior week (10-day avg 3,938). Last-7-day utilization 61% of 6,075 capacity.",
    "notes": "Molded ZPOH 57.9 → 57.2; metal/coil 74.8 → 83.2. Prior-week open complaints, past-due and capacity snapshots are not stored, so those changes are not shown."
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