import { formatPrice } from '../formatPrice'

export default function ProductCard({ product, onSelect }) {
  return (
    <div className="card">
      <img src={product.image} alt={product.name} />
      <div className="card-body">
        <span className="category">{product.category}</span>
        <h3>{product.name}</h3>
        <p className="description">{product.description}</p>
        <p className="price">{formatPrice(product.price)}</p>
        <button onClick={() => onSelect(product)}>View details</button>
      </div>
    </div>
  )
}
