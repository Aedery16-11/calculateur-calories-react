export type CaloryEntry = {
    _id?: string; //optionnel
    label: string,
    qtyCalory: number
    category: "sport" | "repas" //c'est soit l'un soit l'autre
    dateAjout?: string // Changé en string optionnel comme demandé
    userId?: string
}

//l'export est important pour pouvoir y accéder partout