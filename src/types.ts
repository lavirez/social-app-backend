export type Image = { 
    id: string,
    title: string,
}

export type Post = { 
    id: string,
    title: string,
    content: string,
    image: [Image],
}

