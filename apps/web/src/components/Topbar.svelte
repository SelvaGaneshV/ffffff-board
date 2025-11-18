<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import { toolBarStore } from "$lib/context/toolbar-store.svelte";
  import UseToolbarShorcut from "./ToolbarShorcut.svelte";
  import { cn } from "$lib/utils";
  import {
    CircleIcon,
    DiamondIcon,
    RectangleHorizontalIcon,
  } from "@lucide/svelte";
  import { Panel } from "@xyflow/svelte";
  import ToolbarShorcut from "./ToolbarShorcut.svelte";

  const shape = $derived(toolBarStore.shape);

  const handleToolSelection = (tool: any) => {
    toolBarStore.shape = tool;
  };
</script>

<ToolbarShorcut />
<Panel
  position="top-center"
  class="w-2xs border rounded-sm px-2 backdrop-blur-sm bg-transparent h-10 flex justify-evenly items-center"
>
  <Button
    onclick={() => handleToolSelection("rectangle")}
    size="icon-sm"
    class={cn(shape === "rectangle" && "bg-accent text-accent-foreground")}
    variant="ghost"
  >
    <RectangleHorizontalIcon />
  </Button>
  <Button
    onclick={() => handleToolSelection("diamond")}
    class={cn(shape === "diamond" && "bg-accent text-accent-foreground")}
    size="icon-sm"
    variant="ghost"
  >
    <DiamondIcon />
  </Button>
  <Button
    onclick={() => handleToolSelection("ellipse")}
    class={cn(shape === "ellipse" && "bg-accent text-accent-foreground")}
    size="icon-sm"
    variant="ghost"
  >
    <CircleIcon />
  </Button>
</Panel>
