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

https://github.com/user-attachments/assets/67313e1c-663a-453a-b30c-331081c12d75

- Excel demonstration of the first example shown ([1, 0, 2], [4, 5, 3], [7, 8, 6])

![Screenshot 2025-05-22 at 22 14 56](https://github.com/user-attachments/assets/2acb9374-a7c3-4739-9994-6dddc36e8ee3)

- Below is an example of a board with multiple tie possibilities in terms of both heuristic cost and distance. Due to randomized tie-breaking, the algorithm may follow different paths across runs. This highlights a limitation of local search: no global backtracking or state-space exploration can lead to non-deterministic behavior, sensitivity to tie conditions, and the inability to guarantee best optimality.

https://github.com/user-attachments/assets/2365bb23-74cb-4103-87fc-1f124f0d2118


### Stack 
- JavaScript
- HTML, CSS
