// React 19: ref is a normal prop now, so no forwardRef() needed.
export default function FormInput({ label, error, ref, ...props }) {
  return (
    <label>
      {label}
      <input ref={ref} {...props} />
      {error && <span className="field-error">{error}</span>}
    </label>
  )
}
