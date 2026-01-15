import './CollectionNav.css'

function CollectionNav() {
  const handleCollectionClick = (collection) => {
    if (collection === 'Valentine\'s Day Collection') {
      console.log('Showing Valentine\'s Day Collection')
    } else {
      console.log(`${collection} - Coming soon!`)
    }
  }

  return (
    <section className="collection-nav">
      <button
        className="collection-btn coming-soon"
        onClick={() => handleCollectionClick('Coming soon')}
      >
        Coming soon!
      </button>
      <button
        className="collection-btn active"
        onClick={() => handleCollectionClick('Valentine\'s Day Collection')}
      >
        Valentine Day Collection
      </button>
      <button
        className="collection-btn coming-soon"
        onClick={() => handleCollectionClick('Coming soon')}
      >
        Coming soon!
      </button>
    </section>
  )
}

export default CollectionNav
