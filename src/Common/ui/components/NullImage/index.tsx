interface NullImageProps {
    label?: string
    className?: string
  }
  
  export const NullImage = ({ label = 'No image', className = '' }: NullImageProps) => (
    <div
      className={`flex items-center justify-center bg-neutral-200 text-xs text-neutral-500 ${className}`}
      aria-label={label}
    >
      {label}
    </div>
  )