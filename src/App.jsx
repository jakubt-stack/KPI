import React from 'react'

const data = {
  "asOf": "2026-11-02",
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
      "value": "1"
    }
  ],
  "quality": [
    {
      "label": "Open complaints",
      "value": "16"
    },
    {
      "label": "Oldest open",
      "value": "93 d",
      "note": "Filed 1 Aug"
    },
    {
      "label": "Scrap past week",
      "value": "1.53%",
      "note": "244 of 15,964 · YTD 1,479"
    },
    {
      "label": "Avg daily audits",
      "value": "9.2",
      "note": "174 total · 1 failed"
    }
  ],
  "delivery": [
    {
      "label": "Full ERP weeks",
      "value": "6.6",
      "note": "199,334 zippers on order"
    },
    {
      "label": "Molded backlog",
      "value": "0.01 wk",
      "note": "200 units"
    },
    {
      "label": "Coil backlog",
      "value": "1.6 wk",
      "note": "19,045 units"
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
      "value": "59.0",
      "note": "Target 95"
    },
    {
      "label": "Metal/Coil ZPOH",
      "value": "84.5",
      "note": "Target 125"
    },
    {
      "label": "10-day actual",
      "value": "4,463",
      "note": "All / day · Target 6,075 · 73%"
    }
  ],
  "laminate": [
    {
      "label": "Backlog weeks",
      "value": "10.0",
      "note": "179,150 yd past due"
    },
    {
      "label": "10-day output",
      "value": "3,798",
      "note": "Yards/day"
    },
    {
      "label": "Yards scheduled",
      "value": "216,964",
      "note": "Total on order 189,459"
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
      "value": "42"
    },
    {
      "label": "Avg fulfillment",
      "value": "26.5 d",
      "note": "Order to ship"
    },
    {
      "label": "Past due orders",
      "value": "18"
    },
    {
      "label": "Past due %",
      "value": "43%",
      "note": "18 of 42"
    }
  ],
  "cycleZip": [
    {
      "label": "Order → start",
      "value": "92.3 d",
      "note": "Goal 5 days"
    },
    {
      "label": "Start → complete",
      "value": "12.0 d",
      "note": "Goal 15 days"
    },
    {
      "label": "Start → ship",
      "value": "22.1 d",
      "note": "Goal 20 days"
    },
    {
      "label": "Complete → ship",
      "value": "12.6 d",
      "note": "Goal 5 days"
    }
  ],
  "cycleLam": [
    {
      "label": "Order → ship",
      "value": "92.9 d",
      "note": "Goal 112 days"
    },
    {
      "label": "Late orders",
      "value": "44.3 d",
      "note": "due-ship"
    },
    {
      "label": "All orders",
      "value": "-11.4 d",
      "note": "due-ship"
    },
    {
      "label": "Yards at risk",
      "value": "90,819",
      "note": "Exceeding lead time"
    }
  ],
  "movers": {
    "better": "No improvements detected in tracked metrics.",
    "worse": "Scrap rate rose from 0.8% to 1.5% — 244 scrapped out of 15,964 made. Zipper output, last 7 days: 3,991/day vs 4,627 prior week (10-day avg 4,463). Last-7-day utilization 66% of 6,075 capacity.",
    "notes": "Molded ZPOH 59.5 → 58.8; metal/coil 81.9 → 81.2. Prior-week open complaints, past-due and capacity snapshots are not stored, so those changes are not shown."
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