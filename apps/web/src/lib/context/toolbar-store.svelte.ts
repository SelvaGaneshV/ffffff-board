
type Shape = 'rectangle' | 'diamond' | 'ellipse'

type Toolbar = {
    shape: Shape | undefined

}



export const toolBarStore = $state<Toolbar>({
    shape: undefined,

})


