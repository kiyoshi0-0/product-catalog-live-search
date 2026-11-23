# CvSU Mini Store – Live Search and Filter (Lab 4)

A React product catalog with live search, category filter, price sorting, and a debounced search input.

## Guide Questions

### 1. Why do we use two separate states, searchText and debouncedSearch, instead of only one?
`searchText` updates on every keystroke so the input always shows what the user types. `debouncedSearch` only updates after the user pauses for 300ms, and it is the value used for filtering. With only one state, the list would be recalculated on every keystroke, and delaying that single state would make the input feel laggy.

### 2. What would happen if the debounce effect did not return a cleanup function?
Old timers would never be cancelled. Every keystroke would start a timer and every timer would eventually fire, so the list would still update once per keystroke, just delayed. The cleanup `clearTimeout` cancels the previous timer, so only the last pause in typing triggers an update.

### 3. What is the purpose of the dependency array? What happens if it is empty? What if it is left out?
The dependency array tells React when to re-run the effect: only when a listed value changed since the last render. If it is empty (`[]`), the effect runs only once after the first render. If it is left out completely, the effect runs after every render, which can cause unnecessary work or infinite loops if the effect updates state.

### 4. Why should we avoid sorting the original products array directly?
`.sort()` changes the array in place. Mutating the original data can cause unexpected bugs anywhere else the array is used, goes against React's rule of not mutating data, and the original order could not be restored when the user chooses "Default". Making a copy first with the spread operator keeps the original unchanged.

### 5. Is the filtered product list better stored in its own state, or calculated from existing state during rendering?
It is better to calculate it during rendering. The filtered list is fully determined by `debouncedSearch`, `category`, `sortOrder`, and the products data, so storing it in state would duplicate information and could get out of sync. Calculating it each render keeps one source of truth and needs no extra effect or update code.