

import { createContext } from 'svelte';

type ToolBarContext = {
    shape: "rectangle" | "elipse" | "diamond"
    drawToolEnabled: true
}

export const [getToolBarContext, setToolBarContext] = createContext<ToolBarContext>();