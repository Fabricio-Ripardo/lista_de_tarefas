type IconPlaceholderProps = {
  lucide?: string
  tabler?: string
  hugeicons?: string
  phosphor?: string
  remixicon?: string
}

export function IconPlaceholder({
  lucide,
  tabler,
  hugeicons,
  phosphor,
  remixicon,
}: IconPlaceholderProps) {
  return (
    <span>
      {lucide || tabler || hugeicons || phosphor || remixicon || "Icon"}
    </span>
  )
}