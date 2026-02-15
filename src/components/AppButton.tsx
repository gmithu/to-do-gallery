import React from 'react'

type Variant = 'icon' | 'fab' | 'primary' | 'ghost'

type Position = 'card' | 'modal' | 'view'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode
  className?: string
  variant?: Variant
  pos?: Position
}

const VARIANT_CLASSES: Record<Variant, string> = {
  icon: 'w-8 h-8 flex items-center justify-center rounded-full bg-white/80 text-slate-400 hover:text-red-500 hover:bg-red-100 text-xl font-bold shadow',
  fab: 'w-16 h-16 rounded-full flex items-center justify-center bg-slate-600 hover:bg-slate-700 text-white text-3xl font-bold shadow-sm',
  primary: 'bg-slate-700 hover:bg-slate-900 text-white font-semibold py-3 rounded-lg shadow-md text-lg',
  ghost: 'bg-transparent text-slate-700 hover:text-slate-900',
}

const POSITION_CLASSES: Record<Position, string> = {
  card: 'absolute top-2 right-2 z-10',
  modal: 'absolute top-4 right-4',
  view: 'absolute top-4 right-2',
}

export default function AppButton({ children, className = '', variant = 'ghost', pos, ...rest }: Props) {
  const base = 'transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-400'
  const variantClass = VARIANT_CLASSES[variant]
  const posClass = pos ? POSITION_CLASSES[pos] : ''
  const classes = [base, variantClass, posClass, className].filter(Boolean).join(' ')

  return (
    <button {...rest} className={classes}>
      {children}
    </button>
  )
}
