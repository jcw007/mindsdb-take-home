### Take-home Assignment

Below describes what was done for each of the required features.

- **Type Safety:** TypeScript is used in code.
- **Recursive Rendering:** `TreeNode` component recursively renders its children using the same component.
- **Visual Hirearchy:** Each level is indented to achieve this.
- **Interactive:** Animated expanding of child node list is implemented. Animated collapsing, however, doesn't work at this time. Need more time to investigate.
- **Customizable:** Implemented a node text color configurator component for customizing the text color based on node type. More complexity can be implemented to customize other aspects of the `TreeNode` component.
- **Accessible:** Supports keyboard navigation using up and down arrow key. Added ARIA attributes to each node.
- **Performance Optimized:** Supports async loading of child nodes through the use of a mock API call. This helps avoid loading the entire tree data right away. However, persisting loaded child nodes in deeper levels still need more work.

### Steps to run this application

1. Clone this repo and navigate to repo's folder
2. Run `npm i` to install dependencies
3. Run `npm run dev` to run the application
