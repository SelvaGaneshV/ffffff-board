<script module>
</script>

<script lang="ts">
  import { toolBarStore } from "$lib/context/toolbar-store.svelte";
  import { useNodes, useSvelteFlow, type XYPosition } from "@xyflow/svelte";

  const shape = $derived(toolBarStore?.shape);
  const { screenToFlowPosition, getViewport } = useSvelteFlow();
  const nodes = useNodes();

  let start: XYPosition | null = $state(null);
  let end: XYPosition | null = $state(null);

  const colors = [
    "#D14D41",
    "#DA702C",
    "#D0A215",
    "#879A39",
    "#3AA99F",
    "#4385BE",
    "#8B7EC8",
    "#CE5D97",
  ];

  function getPosition(start: XYPosition, end: XYPosition) {
    return {
      x: Math.min(start.x, end.x),
      y: Math.min(start.y, end.y),
    };
  }

  function getDimensions(start: XYPosition, end: XYPosition, zoom: number = 1) {
    return {
      width: Math.abs(end.x - start.x) / zoom,
      height: Math.abs(end.y - start.y) / zoom,
    };
  }

  function getRandomColor(): string {
    return colors[Math.floor(Math.random() * colors.length)];
  }

  function handlePointerDown(e: PointerEvent) {
    const target = e.target as HTMLElement;
    target.setPointerCapture(e.pointerId);
    start = { x: e.pageX, y: e.pageY };
  }

  function handlePointerMove(e: PointerEvent) {
    if (e.buttons !== 1) return;
    end = { x: e.pageX, y: e.pageY };
  }

  function handlePointerUp() {
    if (!start || !end) return;

    const position = screenToFlowPosition(getPosition(start, end));
    const dimension = getDimensions(start, end, getViewport().zoom);

    // Create a generic "shape" node — renderer should check data.shape to decide how to render.
    nodes.update((nodes) => [
      ...nodes,
      {
        id: crypto.randomUUID(),
        type: shape, // change to whatever node type your app expects (or keep shape-specific types)
        position,
        width: dimension.width,
        height: dimension.height,
        data: {
          color: getRandomColor(),
          shape, // 'rectangle' | 'diamond' | 'ellipse'
        },
      },
    ]);

    start = null;
    end = null;
    toolBarStore.shape = "";
  }

  // derived preview rectangle (screen pixels)
  let rect = $derived(
    start && end
      ? {
          position: getPosition(start, end),
          dimension: getDimensions(start, end),
        }
      : null,
  );
</script>

<div
  class="tool-overlay nopan nodrag"
  role="button"
  tabindex="0"
  onpointerdown={handlePointerDown}
  onpointermove={handlePointerMove}
  onpointerup={handlePointerUp}
>
  {#if rect}
    {#if shape === "diamond"}
      <!-- diamond: outer wrapper = bounding box, inner rotated square sized to the smaller side -->

      <div
        class="diamond-preview"
        style="
      width: {rect.dimension.width}px;
      height: {rect.dimension.height}px;
      transform: translate({rect.position.x}px, {rect.position.y}px);
    "
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <polygon
            points="50,0 100,50 50,100 0,50"
            fill="none"
            stroke="rgba(0, 89, 220, 0.8)"
            stroke-width="2"
            stroke-dasharray="6 4"
          />
        </svg>
      </div>
    {:else}
      <!-- rectangle or ellipse use direct styling -->
      <div
        class="shape-preview {shape}"
        style="
          width: {rect.dimension.width}px;
          height: {rect.dimension.height}px;
          transform: translate({rect.position.x}px, {rect.position.y}px);
        "
      ></div>
    {/if}
  {/if}
</div>

<style>
  .tool-overlay {
    pointer-events: auto;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 4;
    height: 100%;
    width: 100%;
    transform-origin: top left;
    cursor: crosshair;
    touch-action: none;
  }

  /* common preview container */
  .shape-preview {
    position: absolute;
    z-index: 10;
    pointer-events: none;
    box-sizing: border-box;
    display: block;
  }

  /* rectangle preview (default) */
  .shape-preview.rectangle {
    border: 2px dashed rgba(0, 89, 220, 0.8);
    background: rgba(0, 0, 0, 0); /* transparent */
  }

  /* ellipse preview */
  .shape-preview.ellipse {
    border: 2px dashed rgba(0, 89, 220, 0.8);
    border-radius: 50%;
    background: rgba(0, 0, 0, 0);
  }

  /* diamond: outer container is the dragged rectangular bounding box; inner is rotated */
  .shape-preview.diamond {
    /* no border on outer, the inner rotated square will show the border */
    background: transparent;
    position: absolute;
    overflow: visible; /* allow rotate to show */
  }
  .diamond-preview {
    position: absolute;
    z-index: 10;
    pointer-events: none;
  }
</style>
