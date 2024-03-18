export interface ISlot {
    date: string // iso
    value: {
        from: string // iso
        to: string // iso
    }[]
}
