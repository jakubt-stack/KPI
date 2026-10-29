import React from 'react'

const data = {
  "asOf": "2026-10-29",
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
      "value": "89 d",
      "note": "Filed 1 Aug"
    },
    {
      "label": "Scrap past week",
      "value": "1.76%",
      "note": "319 of 18,091 · YTD 1,479"
    },
    {
      "label": "Avg daily audits",
      "value": "9.1",
      "note": "163 total · 1 failed"
    }
  ],
  "delivery": [
    {
      "label": "Full ERP weeks",
      "value": "7.3",
      "note": "222,755 zippers on order"
    },
    {
      "label": "Molded backlog",
      "value": "0.01 wk",
      "note": "200 units"
    },
    {
      "label": "Coil backlog",
      "value": "1.4 wk",
      "note": "15,945 units"
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
      "value": "89.8",
      "note": "Target 125"
    },
    {
      "label": "10-day actual",
      "value": "4,822",
      "note": "All / day · Target 6,075 · 79%"
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
      "value": "214,348",
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
      "value": "26.0 d",
      "note": "Order to ship"
    },
    {
      "label": "Past due orders",
      "value": "21"
    },
    {
      "label": "Past due %",
      "value": "62%",
      "note": "21 of 34"
    }
  ],
  "cycleZip": [
    {
      "label": "Order → start",
      "value": "93.8 d"
    },
    {
      "label": "Start → complete",
      "value": "12.0 d"
    },
    {
      "label": "Start → ship",
      "value": "22.1 d"
    },
    {
      "label": "Complete → ship",
      "value": "12.9 d"
    }
  ],
  "cycleLam": [
    {
      "label": "Order → ship",
      "value": "92.9 d"
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
    "worse": "Scrap rate rose from 0.7% to 1.8% — 319 scrapped out of 18,091 made. Zipper output, last 7 days: 4,523/day vs 4,745 prior week (10-day avg 4,822). Last-7-day utilization 74% of 6,075 capacity.",
    "notes": "Molded ZPOH 59.0 → 58.8; metal/coil 92.2 → 78.4. Prior-week open complaints, past-due and capacity snapshots are not stored, so those changes are not shown."
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
        <Block title="Cycle · Zippers" className="cycle-zip" tiles={data.cycleZip} />
        <Block title="Laminate" className="laminate" tiles={data.laminate} />
        <Block title="Cycle · Laminate" className="cycle-lam" tiles={data.cycleLam} />
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