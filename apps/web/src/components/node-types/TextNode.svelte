<script lang="ts">
  import { Textarea } from "$lib/components/ui/textarea";
  import { useSvelteFlow, type NodeProps } from "@xyflow/svelte";
  let { data, id }: NodeProps = $props();
  const { updateNodeData } = useSvelteFlow();
</script>

<div class="bg-transparent">
  <Textarea
    value={(data?.text as string) || ""}
    onchange={(e) => {
      const text = e.currentTarget.value;
      updateNodeData(id, { text });
    }}
  />
</div>
