/**
 * Renders a JSON-LD block.
 *
 * `<` is escaped because a stray `</script>` inside any string would close the
 * tag early and put the rest of the graph into the document as markup.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
