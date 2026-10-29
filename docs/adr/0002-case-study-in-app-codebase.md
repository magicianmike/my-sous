# The Case Study lives in the app's codebase

The Case Study is a route on the same site, built from the same codebase as the app, not a separate portfolio site. That lets it render live app components in specific states (for example, a Formula with one Slot unfilled) next to the decision it explains, instead of showing screenshots. It also obliges the components to render in isolation from given props or state, which is itself evidence for the architecture story.
