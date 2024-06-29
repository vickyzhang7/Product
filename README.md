# React-Firebase Project

## Project Overview
This is a project built using React and Firebase. It consists of a front-end part built with React and a back-end part using JSON Server to provide data API.

## Installation and Running

### Front-End (React Application)

1. Install dependencies:

   ```sh
   npm install
   ```

2. Start the front-end development server:

   ```sh
   npm start
   ```

### Back-End (JSON Server)

1. Install dependencies:

   ```sh
   npm install
   ```

2. Start the JSON Server:

   ```sh
   json-server --watch db.json --port 5000
   ```

### Resolving Port Conflicts

If you encounter an error indicating that port `5000` is already in use, follow these steps:

1. Find the process ID (PID) that is using port `5000`:

   ```sh
   lsof -i :5000
   ```

2. Terminate the process using the port:

   ```sh
   kill -9 <PID>
   ```

3. Restart the JSON Server:

   ```sh
   json-server --watch db.json --port 5001
   ```

## Summary

1. Go to data folder
    ```sh
   cd data
   ```

2. Start the back-end server:

   ```sh
   json-server --watch db.json --port 5001
   ```

3. Start the front-end development server:

   ```sh
   npm start
   ```

## Code Improvements

### 1. React Router Update
**Old Version (useHistory)**:
```javascript
import { useHistory } from 'react-router-dom';
const history = useHistory();
history.push(`/search?q=${term}`);
```

**New Version (useNavigate)**:
```javascript
import { useNavigate } from 'react-router-dom';
const navigate = useNavigate();
navigate(`/search?q=${search}`);
```
- **Use `useNavigate`**: Simplifies navigation in React Router v6, making code more concise and modern.

### 2. useFetch Hook Optimization
**Old Version**:
```javascript
const fetchData = async () => {
  const res = await fetch(url);
};
```

**New Version**:
```javascript
const controller = new AbortController();
const signal = controller.signal;
const res = await fetch(url, { signal });
```
- **Use `AbortController`**: Manages async operations effectively, preventing memory leaks and unhandled errors.

### 3. Switching from `Switch` to `Routes`
**Old Version**:
```javascript
<Switch>
  <Route exact path="/">
    <Home />
  </Route>
</Switch>
```

**New Version**:
```javascript
<Routes>
  <Route path="/" element={<Home />} />
</Routes>
```
- **Use `Routes`**: Enhances code readability and performance in React Router v6.

### 4. Fetching Data on Component Mount
**Old Version**:
```javascript
useEffect(() => {
  fetchData();
}, []);
```

**New Version**:
```javascript
useEffect(() => {
  const unsubscribe = projectFirestore.collection('recipes').onSnapshot((snapshot) => {
    // Update state with new data
  });
  return () => unsubscribe();
}, []);
```
- **Use `onSnapshot`**: Fetches initial data and listens for changes, streamlining the data handling process.


Here’s the updated README format with code improvements:

### 5. Update Function with Modal

**Old Version**:
```javascript
const handleEdit = (recipe) => {
  // Update recipe logic without modal
};
```

**New Version (with Modal)**:
```javascript
const handleEdit = (recipe) => {
  setEditing(recipe.id);
  setUpdatedRecipe({ 
    title: recipe.title, 
    cookingTime: recipe.cookingTime.replace(' minutes', ''), 
    method: recipe.method,
    ingredients: recipe.ingredients 
  });
};

{editing && (
  <div className={`modal ${mode}`}>
    <div className="modal-content">
      <label>
        <span>Recipe Title:</span>
        <input 
          type="text" 
          value={updatedRecipe.title} 
          onChange={(e) => setUpdatedRecipe({ ...updatedRecipe, title: e.target.value })} 
        />
      </label>
      {/* Additional form fields for ingredients, method, cooking time */}
      <button onClick={() => handleUpdate(editing)} className="btn">Save</button>
      <button onClick={() => setEditing(null)} className="btn">Cancel</button>
    </div>
  </div>
)}
```

- **Modal Addition**: Added a modal that allows users to edit recipes in an overlay form.
- **Dynamic Modal Styling**: The modal styling adapts based on the `mode`, supporting both light and dark themes.
- **Form Content**: The form content is similar to the creation form, allowing users to modify all fields.