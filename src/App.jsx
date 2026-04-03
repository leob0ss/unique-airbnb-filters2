import { useState } from 'react'
import './App.css'

const CATEGORIES = [
  { emoji: '🌲', name: 'Treehouses', query: 'treehouse' },
  { emoji: '🔺', name: 'A-Frames', query: 'a frames' },
  { emoji: '🪵', name: 'Cabins', query: 'cabin' },
  { emoji: '🏰', name: 'Castles', query: 'castle' },
  { emoji: '🏖️', name: 'Beachfront', query: 'beachfront' },
  { emoji: '🏝️', name: 'Islands', query: 'island' },
  { emoji: '⛵', name: 'Boats', query: 'boat' },
  { emoji: '🚐', name: 'Campers', query: 'camper rv' },
  { emoji: '⛺', name: 'Tents', query: 'tent' },
  { emoji: '🌾', name: 'Barns', query: 'barn' },
  { emoji: '🐄', name: 'Farms', query: 'farm' },
  { emoji: '🏠', name: 'Tiny homes', query: 'tiny house' },
  { emoji: '🌋', name: 'Volcanic', query: 'volcanic' },
  { emoji: '⛷️', name: 'Ski-in/out', query: 'ski-in ski-out' },
  { emoji: '🏜️', name: 'Desert', query: 'desert' },
  { emoji: '🛖', name: 'Huts', query: 'hut' },
  { emoji: '🌊', name: 'Lakefront', query: 'lakefront' },
  { emoji: '🌅', name: 'Waterfront', query: 'waterfront' },
  { emoji: '🌍', name: 'Earth homes', query: 'earth home' },
  { emoji: '🪨', name: 'Caves', query: 'cave' },
  { emoji: '🌙', name: 'Domes', query: 'dome' },
  { emoji: '💎', name: 'Luxe', query: 'luxe' },
  { emoji: '🏊', name: 'Amazing pools', query: 'amazing pool' },
  { emoji: '🏛️', name: 'Historic homes', query: 'historic home' },
  { emoji: '🗼', name: 'Towers', query: 'tower' },
  { emoji: '🍷', name: 'Vineyards', query: 'vineyard' },
  { emoji: '🌿', name: 'Countryside', query: 'countryside' },
  { emoji: '🎋', name: 'Yurts', query: 'yurt' },
  { emoji: '🌄', name: 'Amazing views', query: 'amazing view' },
  { emoji: '📦', name: 'Containers', query: 'container home' },
  { emoji: '🏔️', name: 'Arctic', query: 'arctic' },
  { emoji: '🌴', name: 'Tropical', query: 'tropical' },
  { emoji: '🔋', name: 'Off-the-grid', query: 'off the grid' },
  { emoji: '🌬️', name: 'Windmills', query: 'windmill' },
  { emoji: '🏯', name: 'Ryokans', query: 'ryokan' },
  { emoji: '🏘️', name: 'Trulli', query: 'trullo' },
  { emoji: '👨‍🍳', name: "Chef's kitchens", query: "chef's kitchen" },
  { emoji: '🏔️', name: 'Top of the world', query: 'top of the world' },
  { emoji: '🏛️', name: 'Cycladic homes', query: 'cycladic home' },
  { emoji: '🏡', name: 'Hanoks', query: 'hanok' },
  { emoji: '🏠', name: 'Minsus', query: 'minsu' },
  { emoji: '🎸', name: 'Casas particulares', query: 'casa particular' },
  { emoji: '🚢', name: 'Houseboats', query: 'houseboat' },
  { emoji: '♿', name: 'Adapted', query: 'adapted' },
  { emoji: '⛳', name: 'Golfing', query: 'golf' },
  { emoji: '🏄', name: 'Surfing', query: 'surfing' },
  { emoji: '🌲', name: 'National parks', query: 'national park' },
  { emoji: '🛖', name: "Shepherd's huts", query: "shepherd's hut" },
  { emoji: '🛏️', name: 'Bed & breakfasts', query: 'bed and breakfast' },
  { emoji: '🌊', name: 'Riverbeds', query: 'riverbed' },
  { emoji: '🏖️', name: 'Beachside', query: 'beach' },
  { emoji: '🏡', name: 'Dammusi', query: 'dammuso' },
  { emoji: '🧱', name: 'New', query: 'new' },
  { emoji: '🏞️', name: 'Lakeshore', query: 'lakeshore' },
  { emoji: '🌻', name: 'Meadows', query: 'meadow' },
  { emoji: '🌃', name: 'City homes', query: 'city home' },
  { emoji: '🎿', name: 'Skiing', query: 'skiing' },
]

const INITIAL_COUNT = 4

const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)

function buildAirbnbUrl(category, location) {
  const loc = location.trim()
  const path = loc ? `${encodeURIComponent(loc)}/homes` : 'homes'

  const now = new Date()
  const startDate = new Date(now.getFullYear(), now.getMonth(), 1)
  const endDate = new Date(now.getFullYear(), now.getMonth() + 3, 1)
  const fmt = d => d.toISOString().split('T')[0]

  const params = new URLSearchParams()
  params.set('refinement_paths[]', '/homes')
  if (loc) params.set('query', loc)
  params.set('flexible_trip_lengths[]', 'one_week')
  params.set('monthly_start_date', fmt(startDate))
  params.set('monthly_length', '3')
  params.set('monthly_end_date', fmt(endDate))
  params.set('search_mode', 'regular_search')
  params.set('price_filter_input_type', '2')
  params.set('channel', 'EXPLORE')
  params.set('raw_text_query', category.query)
  params.set('source', 'structured_search_input_header')
  params.set('search_type', 'unknown')

  return `https://www.airbnb.com/s/${path}?${params.toString()}`
}

export default function App() {
  const [selected, setSelected] = useState('treehouse')
  const [location, setLocation] = useState('')
  const [showAll, setShowAll] = useState(false)

  const visibleCategories = showAll ? CATEGORIES : CATEGORIES.slice(0, INITIAL_COUNT)
  const selectedCategory = CATEGORIES.find(c => c.query === selected)

  function handleSearch() {
    if (!selectedCategory) return
    const url = buildAirbnbUrl(selectedCategory, location)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <main className="container">
      {isMobile && (
        <div className="mobile-banner">
          <span className="mobile-banner-icon">💻</span>
          <p className="mobile-banner-text">
            This tool only works on desktop.
          </p>
        </div>
      )}
      <header className="header">
        <h1 className="title">
          Find unique Airbnbs
        </h1>
        <p className="subtitle">
          In 2025, Airbnb removed unique property categories from their platform. It's unclear why they did, but I made this simple tool to use them again. It works by editing the URL to force Airbnb to surface those hidden categories.
        </p>
        <p className="disclaimer">Not affiliated with Airbnb.</p>
      </header>

      <hr className="divider" />

      <section className="section">
        <p className="step-label">1 — Pick a type</p>
        <div className="category-grid">
          {visibleCategories.map(cat => (
            <button
              key={cat.query}
              className={`category-card ${selected === cat.query ? 'selected' : ''}`}
              onClick={() => setSelected(cat.query)}
            >
              <span className="category-emoji">{cat.emoji}</span>
              <span className="category-name">{cat.name}</span>
            </button>
          ))}
        </div>

        <button
          className="show-all-btn"
          onClick={() => setShowAll(v => !v)}
        >
          {showAll
            ? `Hide categories ↑`
            : `Show all ${CATEGORIES.length} categories ↓`}
        </button>
      </section>

      <section className="section">
        <p className="step-label">2 — Where?</p>
        <input
          type="text"
          className="location-input"
          placeholder="e.g. Vermont, Asheville NC, Montana, anywhere…"
          value={location}
          onChange={e => setLocation(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </section>

      <button
        className="search-btn"
        onClick={handleSearch}
        disabled={!selected}
      >
        Search on Airbnb →
      </button>

    </main>
  )
}
