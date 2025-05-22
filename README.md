### Tiles Solution Simulation 

- Simulates the solution process of the 8/9 Tiles game using a Local Search Approach
- Users can choose between 2 heuristics to use:
   - Hamming Distance or the number of incorrectly placed tiles
   - Manhattan Distance 
- It uses a variation of the Hill-Climbing algorithm, employing a greedy strategy as it decides its next move based on the lowest heuristic cost
- To prevent loopbacks, it also prioritizes moving to unvisited boards and uses randomization in cases of ties
  - Note: As a result of this randomization mechanism, more complex boards can generate multiple different solutions !
  - This feature highlights weaknesses of this approach: plateaus, cycles, and incompleteness

### Demo

https://github.com/user-attachments/assets/748a7a6b-ea29-40e9-92af-1b3a33e12177


### Stack 
- JavaScript
- HTML, CSS
