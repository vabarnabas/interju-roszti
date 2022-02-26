export interface MenuTileProps {
  title: string
  description: string
  link: string
}

export interface PlusButtonProps {
  onClickFunction: () => void
}

export interface Applicant {
  id: string
  name: string
  arrival: string
  formurl: string
}

export interface Review {
  id: string
  name: string
  confidence: number
  communication: number
  phraseology: number
  leadership: number
  creativity: number
  problemsolving: number
  note: string
  verdict: string
}
