
type Shape = 'rectangle' | 'diamond' | 'ellipse' | ""

type Toolbar = {
    shape: Shape
}



export const toolBarStore = $state<Toolbar>({
    shape: ""
})


