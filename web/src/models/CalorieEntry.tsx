export type CaloryEntry = {
    label: string,
    qtyCalory: number
    category: "sport" | "repas" //c'est soit l'un soit l'autre
}

//l'export est important pour pouvoir y accéder partout