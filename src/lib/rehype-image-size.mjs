import { visit } from 'unist-util-visit';

export function rehypeImageSize() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'img') {
        const props = node.properties || {};
        
        // Add default dimensions if missing
        if (!props.width) {
          props.width = '800';
        }
        if (!props.height) {
          props.height = '450';
        }
        
        // Ensure alt exists (even if empty for decorative images)
        if (props.alt === undefined) {
          props.alt = '';
        }
        
        node.properties = props;
      }
    });
  };
}
